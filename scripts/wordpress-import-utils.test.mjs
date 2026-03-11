import { describe, expect, it } from 'vitest'
import { curatedArchiveBacklinks } from './wordpress-curated-backlinks.mjs'
import {
  appendCuratedReadingLinks,
  chunkBlocksIntoSections,
  decodeHtmlEntities,
  dedupeSectionLinksInHtml,
  estimateReadTime,
  extractDateOnly,
  filterArchivedComments,
  formatDateLabel,
  nestArchivedComments,
  rewriteWordPressLink,
  sanitizePostHtml,
} from './wordpress-import-utils.mjs'

describe('wordpress-import-utils', () => {
  it('decodes HTML entities and preserves the intended date label', () => {
    expect(decodeHtmlEntities('JP&#8217;s German Joke')).toBe('JP’s German Joke')
    expect(extractDateOnly('2015-01-14T03:46:00+00:00')).toBe('2015-01-14')
    expect(formatDateLabel('2015-01-14')).toBe('January 14, 2015')
  })

  it('estimates read time from plain text', () => {
    const text = Array.from({ length: 420 }, (_, index) => `word-${index}`).join(' ')
    expect(estimateReadTime(text)).toBe('3 min read')
  })

  it('rewrites WordPress self-links to the new blog archive', () => {
    expect(
      rewriteWordPressLink(
        'https://jpmitra.wordpress.com/2015/06/26/becoming-me/',
        { 'becoming-me': 'becoming-me' },
      ),
    ).toBe('/blog/becoming-me')

    expect(
      rewriteWordPressLink(
        'https://jpmitra.wordpress.com/about/',
        { about: 'club-professionals' },
      ),
    ).toBe('/blog/club-professionals')

    expect(
      rewriteWordPressLink(
        'https://jpmitra.wordpress.com/category/personal/',
        { personal: 'personal' },
      ),
    ).toBe('https://jpmitra.wordpress.com/category/personal/')
  })

  it('sanitizes post HTML, rewrites internal links, and mirrors images', () => {
    const { html, blocks } = sanitizePostHtml(
      `
        <p class="wp-block-paragraph">See <a href="https://jpmitra.wordpress.com/about/">About</a>.</p>
        <figure class="wp-block-image">
          <img src="https://jpmitra.wordpress.com/wp-content/uploads/2022/09/20220430_215455_128.jpg?w=300" alt="JP" />
        </figure>
        <script>alert('xss')</script>
      `,
      {
        slugMap: { about: 'club-professionals' },
        assetMap: {
          'https://jpmitra.wordpress.com/wp-content/uploads/2022/09/20220430_215455_128.jpg':
            '/blog-archive-assets/about.jpg',
        },
      },
    )

    expect(html).toContain('href="/blog/club-professionals"')
    expect(html).toContain('src="/blog-archive-assets/about.jpg"')
    expect(html).not.toContain('<script')
    expect(blocks).toHaveLength(2)
  })

  it('appends curated keep-reading blocks only for configured posts without internal links', () => {
    const standaloneHtml = '<p>Standalone archive thought.</p>'
    const standaloneBlocks = [
      { html: standaloneHtml, text: 'Standalone archive thought.' },
    ]
    const withExistingInternalLink =
      '<p>Read <a href="/blog/existing-post">this</a> first.</p>'
    const existingBlocks = [
      { html: withExistingInternalLink, text: 'Read this first.' },
    ]

    const appendedBlocks = appendCuratedReadingLinks(
      standaloneBlocks,
      standaloneHtml,
      curatedArchiveBacklinks['dedication'],
    )

    expect(appendedBlocks).toHaveLength(2)
    expect(appendedBlocks[1].html).toContain('href="/blog/16-lessons-for-2016"')
    expect(appendedBlocks[1].forceOwnSection).toBe(true)

    expect(
      appendCuratedReadingLinks(
        standaloneBlocks,
        standaloneHtml,
        curatedArchiveBacklinks['life-update-graduation-nashville-and-birthday'],
      ),
    ).toEqual(standaloneBlocks)

    expect(
      appendCuratedReadingLinks(
        existingBlocks,
        withExistingInternalLink,
        curatedArchiveBacklinks['dedication'],
      ),
    ).toEqual(existingBlocks)
  })

  it('chunks sanitized blocks into anchorable sections and isolates forced sections', () => {
    const blocks = Array.from({ length: 8 }, (_, index) => ({
      html: `<p>Section ${index + 1} text. ${'A'.repeat(900)}</p>`,
      text: `Section ${index + 1} text. ${'A'.repeat(900)}`,
    }))
    blocks.push({
      html: '<p>Keep reading: <a href="/blog/dedication">Dedication</a></p>',
      text: 'Keep reading: Dedication',
      forceOwnSection: true,
    })

    const { html, sectionLinks } = chunkBlocksIntoSections(blocks)

    expect(sectionLinks).toHaveLength(4)
    expect(html).toContain('<section id=')
    expect(new Set(sectionLinks.map((section) => section.id)).size).toBe(4)
    expect(html).toContain('Keep reading: <a href="/blog/dedication">Dedication</a>')
  })

  it('dedupes repeated anchors within each generated section only', () => {
    const dedupedHtml = dedupeSectionLinksInHtml(`
      <section id="section-one">
        <p><a href="/blog/byohp">BYOHP</a> meets <a href="/blog/byohp/">BYOHP again</a>.</p>
        <p><a href="https://www.taliho.com">Taliho</a> builds things with <a href="https://www.taliho.com/">Taliho again</a>.</p>
      </section>
      <section id="section-two">
        <p><a href="/blog/byohp">BYOHP in another section</a>.</p>
      </section>
    `)

    expect((dedupedHtml.match(/href="\/blog\/byohp"/g) ?? []).length).toBe(2)
    expect(dedupedHtml).not.toContain('<a href="/blog/byohp/">BYOHP again</a>')
    expect(dedupedHtml).toContain('BYOHP again')
    expect(dedupedHtml).toContain('href="https://www.taliho.com"')
    expect(dedupedHtml).not.toContain('<a href="https://www.taliho.com/">Taliho again</a>')
  })

  it('filters pingbacks and nests archived reader comments', () => {
    const filtered = filterArchivedComments(
      [
        {
          ID: 10,
          type: 'comment',
          status: 'approved',
          date: '2016-01-01T06:52:17+00:00',
          parent: false,
          author: { name: 'Reader One', URL: 'https://example.com' },
          content: '<p>First!</p>',
        },
        {
          ID: 11,
          type: 'comment',
          status: 'approved',
          date: '2016-01-01T07:52:17+00:00',
          parent: { ID: 10 },
          author: { name: 'Reader Two', URL: '' },
          content: '<p>Reply</p>',
        },
        {
          ID: 12,
          type: 'pingback',
          status: 'approved',
          date: '2016-01-01T08:52:17+00:00',
          parent: false,
          author: { name: 'Pingback', URL: '' },
          content: '<p>Ignored</p>',
        },
      ],
      {},
    )

    const nested = nestArchivedComments(filtered)

    expect(filtered).toHaveLength(2)
    expect(nested).toHaveLength(1)
    expect(nested[0].replies).toHaveLength(1)
    expect(nested[0].replies[0].authorName).toBe('Reader Two')
  })
})
