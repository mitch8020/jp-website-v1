import { JSDOM } from 'jsdom'
import { createSectionLinkDeduper } from '../src/pages/blogs/section-link-dedupe.js'

const decoderDom = new JSDOM('<!doctype html><html><body></body></html>')
const decoderDocument = decoderDom.window.document

const WORDPRESS_HOST = 'jpmitra.wordpress.com'

const POST_ALLOWED_TAGS = new Set([
  'a',
  'blockquote',
  'br',
  'code',
  'del',
  'div',
  'em',
  'figcaption',
  'figure',
  'hr',
  'iframe',
  'img',
  'li',
  'ol',
  'p',
  'pre',
  'span',
  'strong',
  'ul',
])

const COMMENT_ALLOWED_TAGS = new Set([
  'a',
  'br',
  'code',
  'em',
  'p',
  'strong',
])

const EMPTY_ALLOWED_TAGS = new Set(['br', 'hr', 'iframe', 'img'])

export function decodeHtmlEntities(value = '') {
  if (!value) {
    return ''
  }

  const textarea = decoderDocument.createElement('textarea')
  textarea.innerHTML = value
  return repairMojibake(textarea.value).replace(/\u00a0/g, ' ')
}

export function repairMojibake(value = '') {
  if (!/[ÃÂâð]/.test(value)) {
    return value
  }

  return Buffer.from(value, 'latin1').toString('utf8')
}

export function normalizeWhitespace(value = '') {
  return decodeHtmlEntities(value).replace(/\s+/g, ' ').trim()
}

export function extractDateOnly(value = '') {
  const match = value.match(/\d{4}-\d{2}-\d{2}/)
  return match ? match[0] : ''
}

export function formatDateLabel(dateOnly) {
  if (!dateOnly) {
    return ''
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${dateOnly}T12:00:00Z`))
}

export function stripHtmlToText(html = '') {
  const dom = new JSDOM(`<!doctype html><html><body>${html}</body></html>`)
  return normalizeWhitespace(dom.window.document.body.textContent ?? '')
}

export function trimText(value, maxLength) {
  const normalized = normalizeWhitespace(value)
  if (!normalized || normalized.length <= maxLength) {
    return normalized
  }

  const truncated = normalized.slice(0, maxLength + 1)
  const lastSpace = truncated.lastIndexOf(' ')
  const safeSlice = lastSpace > Math.floor(maxLength * 0.65) ? lastSpace : maxLength
  return `${normalized.slice(0, safeSlice).trim()}...`
}

export function estimateReadTime(text, wordsPerMinute = 200) {
  const wordCount = normalizeWhitespace(text).split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute))
  return `${minutes} min read`
}

export function slugify(value) {
  return normalizeWhitespace(value)
    .toLowerCase()
    .replace(/['".,!?()[\]/]+/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function sanitizeUrl(href = '') {
  if (!href) {
    return ''
  }

  const trimmed = href.trim()
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('mailto:')
  ) {
    return trimmed
  }

  return ''
}

export function extractWordPressSlug(href = '') {
  let url

  try {
    url = new URL(href)
  } catch {
    return null
  }

  if (url.hostname !== WORDPRESS_HOST) {
    return null
  }

  const parts = url.pathname.split('/').filter(Boolean)
  if (parts.length === 1) {
    return parts[0]
  }

  if (
    parts.length >= 4 &&
    /^\d{4}$/.test(parts[0]) &&
    /^\d{2}$/.test(parts[1]) &&
    /^\d{2}$/.test(parts[2])
  ) {
    return parts[3]
  }

  return null
}

export function rewriteWordPressLink(href, slugMap = {}) {
  const safeHref = sanitizeUrl(href)
  if (!safeHref.startsWith('http://') && !safeHref.startsWith('https://')) {
    return safeHref
  }

  let url

  try {
    url = new URL(safeHref)
  } catch {
    return safeHref
  }

  if (url.hostname !== WORDPRESS_HOST) {
    return safeHref
  }

  const slug = extractWordPressSlug(safeHref)
  if (!slug || !slugMap[slug]) {
    return safeHref
  }

  return `/blog/${slugMap[slug]}${url.hash}`
}

export function rewriteWordPressLinks(html, slugMap = {}) {
  const dom = new JSDOM(`<!doctype html><html><body>${html}</body></html>`)
  const document = dom.window.document

  for (const anchor of document.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href') ?? ''
    anchor.setAttribute('href', rewriteWordPressLink(href, slugMap))
  }

  return document.body.innerHTML.trim()
}

function escapeHtml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function appendCuratedReadingLinks(blocks = [], html = '', links = []) {
  const blockList = Array.isArray(blocks) ? [...blocks] : []
  const trimmedHtml = typeof html === 'string' ? html.trim() : ''
  const linkList = Array.isArray(links) ? links : []

  if (!blockList.length || !trimmedHtml || trimmedHtml.includes('href="/blog/')) {
    return blockList
  }

  const anchors = linkList
    .map(({ href = '', label = '' }) => {
      const safeHref = sanitizeUrl(href)
      const safeLabel = normalizeWhitespace(label)

      if (!safeHref.startsWith('/blog/') || !safeLabel) {
        return null
      }

      return {
        anchorHtml: `<a href="${safeHref}">${escapeHtml(safeLabel)}</a>`,
        label: safeLabel,
      }
    })
    .filter(Boolean)

  if (!anchors.length) {
    return blockList
  }

  return [
    ...blockList,
    {
      html: `<p>Keep reading: ${anchors.map(({ anchorHtml }) => anchorHtml).join(', ')}</p>`,
      text: `Keep reading: ${anchors.map(({ label }) => label).join(', ')}`,
      forceOwnSection: true,
    },
  ]
}

function dedupeAnchorsWithinRoot(root) {
  const tracker = createSectionLinkDeduper()

  function walk(node) {
    for (const child of [...node.childNodes]) {
      if (child.nodeType !== child.ELEMENT_NODE) {
        continue
      }

      const element = child

      if (element.tagName.toLowerCase() === 'a') {
        const href = element.getAttribute('href') ?? ''

        if (href && !tracker.shouldKeepHref(href)) {
          walk(element)
          replaceWithChildren(element)
          continue
        }
      }

      walk(element)
    }
  }

  walk(root)
}

export function dedupeSectionLinksInHtml(html = '') {
  const trimmedHtml = html.trim()

  if (!trimmedHtml) {
    return trimmedHtml
  }

  const dom = new JSDOM(`<!doctype html><html><body>${trimmedHtml}</body></html>`)
  const body = dom.window.document.body
  const sections = [...body.querySelectorAll('section')]

  if (!sections.length) {
    dedupeAnchorsWithinRoot(body)
    return body.innerHTML.trim()
  }

  for (const section of sections) {
    dedupeAnchorsWithinRoot(section)
  }

  return body.innerHTML.trim()
}

function replaceWithChildren(element) {
  const fragment = element.ownerDocument.createDocumentFragment()
  while (element.firstChild) {
    fragment.appendChild(element.firstChild)
  }
  element.replaceWith(fragment)
}

function sanitizeImageSource(src, assetMap) {
  const safeSrc = sanitizeUrl(src)
  if (!safeSrc) {
    return ''
  }

  if (safeSrc.startsWith('http://') || safeSrc.startsWith('https://')) {
    const withoutQuery = safeSrc.split('?')[0]
    return assetMap[withoutQuery] ?? safeSrc
  }

  return safeSrc
}

function sanitizeElementAttributes(element, context) {
  const { slugMap, assetMap } = context
  const tag = element.tagName.toLowerCase()
  const originalAttributes = {
    href: element.getAttribute('href') ?? '',
    src: element.getAttribute('src') ?? '',
    title: element.getAttribute('title') ?? '',
    alt: element.getAttribute('alt') ?? '',
    width: element.getAttribute('width') ?? '',
    height: element.getAttribute('height') ?? '',
    dataOrigFile: element.getAttribute('data-orig-file') ?? '',
  }

  for (const attr of [...element.attributes]) {
    element.removeAttribute(attr.name)
  }

  if (tag === 'a') {
    const href = rewriteWordPressLink(originalAttributes.href, slugMap)
    const safeHref = sanitizeUrl(href)

    if (!safeHref) {
      replaceWithChildren(element)
      return
    }

    element.setAttribute('href', safeHref)

    if (safeHref.startsWith('http://') || safeHref.startsWith('https://')) {
      element.setAttribute('rel', 'noopener noreferrer')
    }

    return
  }

  if (tag === 'img') {
    const src = originalAttributes.dataOrigFile || originalAttributes.src
    const safeSrc = sanitizeImageSource(src, assetMap)

    if (!safeSrc) {
      element.remove()
      return
    }

    element.setAttribute('src', safeSrc)
    element.setAttribute('loading', 'lazy')

    const alt = normalizeWhitespace(originalAttributes.alt)
    if (alt) {
      element.setAttribute('alt', alt)
    } else {
      element.setAttribute('alt', '')
    }

    const width = originalAttributes.width
    const height = originalAttributes.height
    if (width) {
      element.setAttribute('width', width)
    }
    if (height) {
      element.setAttribute('height', height)
    }

    return
  }

  if (tag === 'iframe') {
    const src = sanitizeUrl(originalAttributes.src)
    if (!src) {
      element.remove()
      return
    }

    let url

    try {
      url = new URL(src)
    } catch {
      element.remove()
      return
    }

    const allowedHosts = new Set([
      'www.youtube.com',
      'youtube.com',
      'www.youtube-nocookie.com',
      'youtube-nocookie.com',
    ])

    if (!allowedHosts.has(url.hostname)) {
      element.remove()
      return
    }

    element.setAttribute('src', src)
    element.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    )
    element.setAttribute('allowfullscreen', '')
    element.setAttribute('loading', 'lazy')
    element.setAttribute('title', originalAttributes.title || 'Embedded media')
    return
  }

  if (tag === 'blockquote' || tag === 'figure' || tag === 'figcaption') {
    return
  }

  if (tag === 'div' || tag === 'span' || tag === 'p' || tag === 'li') {
    return
  }
}

function sanitizeChildren(parent, context) {
  for (const child of [...parent.childNodes]) {
    if (child.nodeType === child.COMMENT_NODE) {
      child.remove()
      continue
    }

    if (child.nodeType === child.TEXT_NODE) {
      const normalized = child.textContent?.replace(/\s+/g, ' ') ?? ''
      child.textContent = normalized
      continue
    }

    if (child.nodeType !== child.ELEMENT_NODE) {
      child.remove()
      continue
    }

    const element = child
    const tag = element.tagName.toLowerCase()

    if (!context.allowedTags.has(tag)) {
      if (tag === 'script' || tag === 'style' || tag === 'noscript') {
        element.remove()
      } else {
        sanitizeChildren(element, context)
        replaceWithChildren(element)
      }
      continue
    }

    sanitizeChildren(element, context)

    if (!element.isConnected) {
      continue
    }

    sanitizeElementAttributes(element, context)

    if (
      element.isConnected &&
      !EMPTY_ALLOWED_TAGS.has(tag) &&
      !normalizeWhitespace(element.textContent ?? '') &&
      !element.querySelector('img, iframe')
    ) {
      element.remove()
    }
  }
}

function normalizeTopLevelTextNodes(body) {
  for (const child of [...body.childNodes]) {
    if (child.nodeType !== child.TEXT_NODE) {
      continue
    }

    const normalized = normalizeWhitespace(child.textContent ?? '')
    if (!normalized) {
      child.remove()
      continue
    }

    const paragraph = body.ownerDocument.createElement('p')
    paragraph.textContent = normalized
    child.replaceWith(paragraph)
  }
}

function collectBlocks(body) {
  const blocks = []

  for (const child of [...body.childNodes]) {
    if (child.nodeType !== child.ELEMENT_NODE) {
      continue
    }

    const html = child.outerHTML.trim()
    const text = normalizeWhitespace(child.textContent ?? '')

    if (!html) {
      continue
    }

    blocks.push({ html, text })
  }

  return blocks
}

export function sanitizePostHtml(html, options = {}) {
  const slugMap = options.slugMap ?? {}
  const assetMap = options.assetMap ?? {}
  const dom = new JSDOM(`<!doctype html><html><body>${html}</body></html>`)
  const document = dom.window.document
  const body = document.body

  sanitizeChildren(body, {
    slugMap,
    assetMap,
    allowedTags: POST_ALLOWED_TAGS,
  })
  normalizeTopLevelTextNodes(body)

  const blocks = collectBlocks(body)

  return {
    html: body.innerHTML.trim(),
    plainText: normalizeWhitespace(body.textContent ?? ''),
    blocks,
  }
}

export function sanitizeCommentHtml(html, options = {}) {
  const slugMap = options.slugMap ?? {}
  const dom = new JSDOM(`<!doctype html><html><body>${html}</body></html>`)
  const body = dom.window.document.body

  sanitizeChildren(body, {
    slugMap,
    assetMap: {},
    allowedTags: COMMENT_ALLOWED_TAGS,
  })
  normalizeTopLevelTextNodes(body)

  return body.innerHTML.trim()
}

function pickSectionCount(totalCharacters, blockCount) {
  if (blockCount <= 1 || totalCharacters < 1400) {
    return 1
  }

  if (totalCharacters < 3200) {
    return Math.min(2, blockCount)
  }

  if (totalCharacters < 6200) {
    return Math.min(3, blockCount)
  }

  return Math.min(4, blockCount)
}

function pickSectionLabel(text, index) {
  const normalized = normalizeWhitespace(text)
  if (!normalized) {
    return `Section ${index + 1}`
  }

  const sentenceMatch = normalized.match(/.+?[.!?](?:\s|$)/)
  const sentence = sentenceMatch ? sentenceMatch[0] : normalized
  return trimText(sentence.replace(/[.!?]+$/, ''), 72) || `Section ${index + 1}`
}

export function chunkBlocksIntoSections(blocks) {
  if (!blocks.length) {
    return {
      html: '',
      sectionLinks: [],
    }
  }

  const totalCharacters = blocks.reduce((sum, block) => sum + block.text.length, 0)
  const desiredSections = pickSectionCount(totalCharacters, blocks.length)
  const targetSize = Math.max(1, Math.ceil(totalCharacters / desiredSections))
  const chunkedBlocks = []
  let currentChunk = []
  let currentSize = 0

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]

    if (block.forceOwnSection) {
      if (currentChunk.length > 0) {
        chunkedBlocks.push(currentChunk)
        currentChunk = []
        currentSize = 0
      }

      chunkedBlocks.push([block])
      continue
    }

    const remainingBlocks = blocks.length - index
    const remainingSections = desiredSections - chunkedBlocks.length

    if (
      currentChunk.length > 0 &&
      currentSize >= targetSize &&
      remainingBlocks >= remainingSections
    ) {
      chunkedBlocks.push(currentChunk)
      currentChunk = []
      currentSize = 0
    }

    currentChunk.push(block)
    currentSize += block.text.length
  }

  if (currentChunk.length > 0) {
    chunkedBlocks.push(currentChunk)
  }

  const usedIds = new Set()
  const sections = chunkedBlocks.map((chunk, index) => {
    const label = pickSectionLabel(
      chunk.map((block) => block.text).join(' '),
      index,
    )
    let idBase = slugify(label) || `section-${index + 1}`
    let id = idBase
    let suffix = 2

    while (usedIds.has(id)) {
      id = `${idBase}-${suffix}`
      suffix += 1
    }

    usedIds.add(id)

    return {
      id,
      label,
      html: `<section id="${id}" class="scroll-mt-28">${chunk
        .map((block) => block.html)
        .join('\n')}</section>`,
    }
  })

  return {
    html: sections.map((section) => section.html).join('\n'),
    sectionLinks: sections.map(({ id, label }) => ({ id, label })),
  }
}

export function filterArchivedComments(comments, slugMap = {}) {
  return comments
    .filter((comment) => comment.type === 'comment' && comment.status === 'approved')
    .map((comment) => {
      const publishedAt = extractDateOnly(comment.date)

      return {
        id: String(comment.ID),
        parentId: comment.parent ? String(comment.parent.ID ?? comment.parent) : null,
        authorName: normalizeWhitespace(comment.author?.name ?? 'Archived Reader'),
        authorUrl: sanitizeUrl(comment.author?.URL ?? '') || undefined,
        publishedAt,
        publishedLabel: formatDateLabel(publishedAt),
        contentHtml: sanitizeCommentHtml(comment.content ?? '', { slugMap }),
        rawDate: comment.date,
      }
    })
}

export function nestArchivedComments(comments) {
  const commentsById = new Map()
  const roots = []

  for (const comment of [...comments].sort((left, right) => {
    return new Date(left.rawDate).getTime() - new Date(right.rawDate).getTime()
  })) {
    const normalizedComment = {
      id: comment.id,
      parentId: comment.parentId,
      authorName: comment.authorName,
      authorUrl: comment.authorUrl,
      publishedAt: comment.publishedAt,
      publishedLabel: comment.publishedLabel,
      contentHtml: comment.contentHtml,
      replies: [],
    }

    commentsById.set(normalizedComment.id, normalizedComment)

    if (normalizedComment.parentId && commentsById.has(normalizedComment.parentId)) {
      commentsById.get(normalizedComment.parentId).replies.push(normalizedComment)
    } else {
      roots.push(normalizedComment)
    }
  }

  return roots
}
