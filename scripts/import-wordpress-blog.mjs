import { createHash } from 'node:crypto'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import {
  chunkBlocksIntoSections,
  decodeHtmlEntities,
  estimateReadTime,
  extractDateOnly,
  filterArchivedComments,
  formatDateLabel,
  nestArchivedComments,
  sanitizePostHtml,
  slugify,
  stripHtmlToText,
  trimText,
} from './wordpress-import-utils.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const generatedRoot = path.join(projectRoot, 'src', 'pages', 'blogs', 'generated')
const generatedImportedRoot = path.join(generatedRoot, 'imported')
const publicAssetRoot = path.join(projectRoot, 'public', 'blog-archive-assets')

const wordpressSiteId = 'jpmitra.wordpress.com'
const postsEndpoint = `https://public-api.wordpress.com/rest/v1.1/sites/${wordpressSiteId}/posts/?number=100&type=post`
const pagesEndpoint = `https://public-api.wordpress.com/rest/v1.1/sites/${wordpressSiteId}/posts/?number=100&type=page`

function toObjectKeys(value) {
  return Object.keys(value ?? {})
}

function createSlugMap(posts, aboutPage) {
  const slugMap = Object.fromEntries(posts.map((post) => [post.slug, post.slug]))
  slugMap[aboutPage.slug] = 'club-professionals'
  return slugMap
}

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed for ${url} with status ${response.status}`)
  }

  return response.json()
}

async function fetchPosts() {
  const [{ posts }, { posts: pages }] = await Promise.all([
    fetchJson(postsEndpoint),
    fetchJson(pagesEndpoint),
  ])

  const aboutPage = pages.find((page) => page.slug === 'about')

  if (!aboutPage) {
    throw new Error('Could not find the old About page on WordPress')
  }

  return {
    posts,
    aboutPage,
  }
}

function collectAssetUrlsFromContent(html) {
  const dom = new JSDOM(`<!doctype html><html><body>${html}</body></html>`)
  const urls = new Set()

  for (const image of dom.window.document.querySelectorAll('img')) {
    const src = image.getAttribute('data-orig-file') ?? image.getAttribute('src')
    if (src) {
      urls.add(src.split('?')[0])
    }
  }

  return urls
}

function buildAssetFileName(sourceUrl) {
  const url = new URL(sourceUrl)
  const baseName = path.basename(url.pathname)
  const hash = createHash('sha1').update(sourceUrl).digest('hex').slice(0, 8)
  return `${hash}-${baseName}`
}

async function mirrorAssets(entries) {
  await rm(publicAssetRoot, { recursive: true, force: true })
  await mkdir(publicAssetRoot, { recursive: true })

  const assetUrls = new Set()

  for (const entry of entries) {
    if (entry.featured_image) {
      assetUrls.add(entry.featured_image.split('?')[0])
    }

    for (const url of collectAssetUrlsFromContent(entry.content ?? '')) {
      assetUrls.add(url)
    }
  }

  const assetMap = {}

  for (const sourceUrl of assetUrls) {
    const response = await fetch(sourceUrl)

    if (!response.ok) {
      throw new Error(`Failed to download asset ${sourceUrl}`)
    }

    const bytes = Buffer.from(await response.arrayBuffer())
    const fileName = buildAssetFileName(sourceUrl)
    const outputPath = path.join(publicAssetRoot, fileName)

    await writeFile(outputPath, bytes)
    assetMap[sourceUrl] = `/blog-archive-assets/${fileName}`
  }

  return assetMap
}

function pickPrimaryParagraph(blocks, fallbackText) {
  const paragraphBlock = blocks.find((block) => block.html.startsWith('<p'))
  return paragraphBlock?.text || fallbackText
}

function pickQuote(text) {
  const sentences =
    normalizeSentences(text).filter(
      (sentence) => sentence.length >= 80 && sentence.length <= 180,
    ) || []

  if (sentences.length > 0) {
    return trimText(sentences[0], 180)
  }

  const fallback = normalizeSentences(text)[0] ?? text
  return trimText(fallback, 160)
}

function normalizeSentences(text) {
  const normalized = stripHtmlToText(text)
  return normalized.match(/[^.!?]+[.!?]+/g)?.map((sentence) => sentence.trim()) ?? [normalized]
}

function formatMinuteStat(readTime) {
  const count = Number.parseInt(readTime, 10)
  return `${count} minute${count === 1 ? '' : 's'}`
}

function buildSignals({ category, tags, publishedLabel, commentCount, isPage }) {
  const tagSummary = tags.length
    ? `Additional topics include ${tags.slice(0, 4).join(', ')}${tags.length > 4 ? ', and more.' : '.'}`
    : 'No additional tags were attached to this entry in the original archive.'

  return [
    {
      title: `Filed Under ${category}`,
      text: tagSummary,
    },
    {
      title: 'Archive Source',
      text: isPage
        ? `Originally published on the WordPress site as an About page and restored here with its last updated date of ${publishedLabel}.`
        : `Originally published on the WordPress site on ${publishedLabel} and restored here with light cleanup for the new archive.`,
    },
    {
      title: 'Conversation State',
      text:
        commentCount > 0
          ? `This entry preserves ${commentCount} archived reader comment${commentCount === 1 ? '' : 's'} from the original site.`
          : 'No archived reader comments were attached to this entry on the original site.',
    },
  ]
}

async function fetchArchivedComments(entry, slugMap) {
  const repliesUrl = `https://public-api.wordpress.com/rest/v1.1/sites/${wordpressSiteId}/posts/${entry.ID}/replies/?number=100`
  const { comments = [] } = await fetchJson(repliesUrl)
  return nestArchivedComments(filterArchivedComments(comments, slugMap))
}

function buildFeaturedImage(entry, assetMap, title) {
  if (!entry.featured_image) {
    return undefined
  }

  const sourceUrl = entry.featured_image.split('?')[0]
  const localSrc = assetMap[sourceUrl]

  if (!localSrc) {
    return undefined
  }

  return {
    src: localSrc,
    alt: `${title} featured image`,
  }
}

function buildImportedDocument(entry, options) {
  const { slugMap, assetMap, comments } = options
  const isPage = entry.type === 'page'
  const slug = isPage ? 'club-professionals' : entry.slug
  const title = isPage ? 'Club Professionals' : decodeHtmlEntities(entry.title)
  const publishedAt = extractDateOnly(isPage ? entry.modified : entry.date)
  const publishedLabel = formatDateLabel(publishedAt)
  const categories = toObjectKeys(entry.categories)
  const tags = [
    ...categories.slice(1),
    ...toObjectKeys(entry.tags),
  ].filter((tag, index, allTags) => allTags.indexOf(tag) === index)
  const category = categories[0] ?? 'Archive'
  const sanitized = sanitizePostHtml(entry.content ?? '', { slugMap, assetMap })
  const sectioned = chunkBlocksIntoSections(sanitized.blocks)
  const excerptText = stripHtmlToText(entry.excerpt || '')
  const fallbackText = pickPrimaryParagraph(sanitized.blocks, sanitized.plainText)
  const summary = trimText(excerptText || fallbackText, 160)
  const teaser = trimText(excerptText || fallbackText, 220)
  const readTime = estimateReadTime(sanitized.plainText)
  const commentCount = countComments(comments)

  return {
    slug,
    title,
    summary,
    teaser,
    publishedAt,
    publishedLabel,
    readTime,
    category,
    tags,
    quote: pickQuote(sanitized.plainText),
    stats: [
      {
        label: 'Read',
        value: formatMinuteStat(readTime),
      },
      {
        label: 'Comments',
        value:
          commentCount > 0
            ? `${commentCount} archived comment${commentCount === 1 ? '' : 's'}`
            : 'No archived comments',
      },
      {
        label: 'Source',
        value: isPage ? 'WordPress About page' : 'WordPress post archive',
      },
    ],
    signals: buildSignals({
      category,
      tags,
      publishedLabel,
      commentCount,
      isPage,
    }),
    sectionLinks: sectioned.sectionLinks,
    source: 'wordpress',
    commentCount,
    kind: 'html',
    html: sectioned.html,
    comments,
    featuredImage: buildFeaturedImage(entry, assetMap, title),
  }
}

function countComments(comments) {
  return comments.reduce((count, comment) => {
    return count + 1 + countComments(comment.replies)
  }, 0)
}

function serializeModule(name, value, typeName, importPath) {
  return `import type { ${typeName} } from '${importPath}'\n\nexport const ${name} = ${JSON.stringify(
    value,
    null,
    2,
  )} satisfies ${typeName}\n\nexport default ${name}\n`
}

function buildDocumentConstName(slug) {
  const camelCase = slugify(slug).replace(/-([a-z0-9])/g, (_, char) =>
    char.toUpperCase(),
  )
  const safeName = /^[0-9]/.test(camelCase) ? `post${camelCase}` : camelCase
  return `${safeName}Document`
}

function buildSummaryManifest(documents) {
  const summaries = documents.map((document) => {
    const { kind, html, comments, featuredImage, ...summary } = document
    return summary
  })

  return `import type { BlogPostSummary } from '../blog-types'\n\nexport const importedPostSummaries = ${JSON.stringify(
    summaries,
    null,
    2,
  )} satisfies BlogPostSummary[]\n`
}

function buildLoaderManifest(documents) {
  const loaderLines = documents.map((document) => {
    return `  '${document.slug}': () => import('./imported/${document.slug}').then((module) => module.default),`
  })

  return `import type { BlogDocumentLoaderMap } from '../blog-types'\n\nexport const importedPostLoaders = {\n${loaderLines.join(
    '\n',
  )}\n} satisfies BlogDocumentLoaderMap\n`
}

async function writeGeneratedDocuments(documents) {
  await rm(generatedImportedRoot, { recursive: true, force: true })
  await mkdir(generatedImportedRoot, { recursive: true })

  for (const document of documents) {
    const constName = buildDocumentConstName(document.slug)
    const fileContents = serializeModule(
      constName,
      document,
      'HtmlBlogPostDocument',
      '../../blog-types',
    )

    await writeFile(
      path.join(generatedImportedRoot, `${document.slug}.ts`),
      fileContents,
    )
  }

  await writeFile(
    path.join(generatedRoot, 'imported-post-summaries.ts'),
    buildSummaryManifest(documents),
  )

  await writeFile(
    path.join(generatedRoot, 'imported-post-loaders.ts'),
    buildLoaderManifest(documents),
  )
}

async function ensureGeneratedRoot() {
  await mkdir(generatedRoot, { recursive: true })
}

async function main() {
  const { posts, aboutPage } = await fetchPosts()
  const importedEntries = [...posts, aboutPage]
  const slugMap = createSlugMap(posts, aboutPage)
  const assetMap = await mirrorAssets(importedEntries)
  const documents = []

  for (const entry of importedEntries) {
    const comments = await fetchArchivedComments(entry, slugMap)
    documents.push(buildImportedDocument(entry, { slugMap, assetMap, comments }))
  }

  await ensureGeneratedRoot()
  await writeGeneratedDocuments(documents)

  const totalCommentCount = documents.reduce(
    (count, document) => count + document.commentCount,
    0,
  )

  const summary = {
    importedEntries: documents.length,
    importedPosts: posts.length,
    importedPages: 1,
    readerComments: totalCommentCount,
    assetsMirrored: Object.keys(assetMap).length,
  }

  await writeFile(
    path.join(generatedRoot, 'import-summary.json'),
    `${JSON.stringify(summary, null, 2)}\n`,
  )

  const existingSummary = JSON.parse(
    await readFile(path.join(generatedRoot, 'import-summary.json'), 'utf8'),
  )

  console.log(
    `Imported ${existingSummary.importedEntries} entries, ${existingSummary.readerComments} reader comments, and ${existingSummary.assetsMirrored} assets.`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
