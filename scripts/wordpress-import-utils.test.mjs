import { describe, expect, it } from 'vitest'
import {
  chunkBlocksIntoSections,
  decodeHtmlEntities,
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

  it('chunks sanitized blocks into anchorable sections', () => {
    const blocks = Array.from({ length: 8 }, (_, index) => ({
      html: `<p>Section ${index + 1} text. ${'A'.repeat(900)}</p>`,
      text: `Section ${index + 1} text. ${'A'.repeat(900)}`,
    }))

    const { html, sectionLinks } = chunkBlocksIntoSections(blocks)

    expect(sectionLinks).toHaveLength(4)
    expect(html).toContain('<section id=')
    expect(new Set(sectionLinks.map((section) => section.id)).size).toBe(4)
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
