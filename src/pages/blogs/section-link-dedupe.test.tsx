import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ManualArticleSection } from './articles/ManualArticleSection'
import { createSectionLinkReactDeduper } from './section-link-dedupe-react'
import {
  createSectionLinkDeduper,
  normalizeSectionLinkHref,
} from './section-link-dedupe.js'

describe('section-link-dedupe', () => {
  it('normalizes internal and external href variants that should share a destination', () => {
    expect(normalizeSectionLinkHref('/blog/byohp/')).toBe('/blog/byohp')
    expect(normalizeSectionLinkHref('/blog/byohp?ref=home')).toBe(
      '/blog/byohp?ref=home',
    )
    expect(normalizeSectionLinkHref('https://example.com')).toBe(
      'https://example.com/',
    )
    expect(normalizeSectionLinkHref('https://example.com/')).toBe(
      'https://example.com/',
    )
    expect(normalizeSectionLinkHref('https://example.com#top')).toBe(
      'https://example.com/#top',
    )
  })

  it('keeps the first destination in a section and rejects repeats for the same normalized href', () => {
    const deduper = createSectionLinkDeduper()

    expect(deduper.shouldKeepHref('/blog/byohp')).toBe(true)
    expect(deduper.shouldKeepHref('/blog/byohp/')).toBe(false)
    expect(deduper.shouldKeepHref('https://www.taliho.com')).toBe(true)
    expect(deduper.shouldKeepHref('https://www.taliho.com/')).toBe(false)
    expect(deduper.shouldKeepHref('/blog/byohp#section-two')).toBe(true)
  })

  it('dedupes repeated links in manual React content while allowing the same destination in a new section', () => {
    const firstSection = createSectionLinkReactDeduper()
    const secondSection = createSectionLinkReactDeduper()
    const byohpLink = <a href="/blog/byohp">BYOHP</a>
    const talihoLink = <a href="https://www.taliho.com">Taliho</a>

    const html = renderToStaticMarkup(
      <div>
        <p>
          {firstSection.dedupeNode(
            <>
              {byohpLink} stays linked and {byohpLink} again becomes plain text.
            </>,
          )}
        </p>
        <p>
          {firstSection.dedupeNode(
            <>
              {talihoLink} stays linked but {talihoLink} again does not.
            </>,
          )}
        </p>
        <p>
          {secondSection.dedupeNode(
            <>
              <a href="/blog/byohp">BYOHP in section two</a> can link again.
            </>,
          )}
        </p>
      </div>,
    )

    expect((html.match(/href="\/blog\/byohp"/g) ?? []).length).toBe(2)
    expect(html).not.toContain('<a href="/blog/byohp/">BYOHP again</a>')
    expect(html).toContain('BYOHP again')
    expect(html).toContain('href="https://www.taliho.com"')
    expect(html).not.toContain('<a href="https://www.taliho.com/">Taliho again</a>')
  })

  it('keeps links when the visible text matches but the destinations differ', () => {
    const deduper = createSectionLinkReactDeduper()
    const html = renderToStaticMarkup(
      <p>
        {deduper.dedupeNode(
          <>
            <a href="/blog/byohp">Read more</a> and{' '}
            <a href="/blog/movie-events">Read more</a>.
          </>,
        )}
      </p>,
    )

    expect((html.match(/href="\/blog\//g) ?? []).length).toBe(2)
  })

  it('dedupes repeated destinations when rendered through the shared manual section component', () => {
    const talihoLink = <a href="https://www.taliho.com">Taliho</a>
    const html = renderToStaticMarkup(
      <ManualArticleSection
        section={{
          id: 'test-section',
          label: 'Test section',
          kicker: 'Signal 00',
          body: [<>One {talihoLink} and {talihoLink}.</>],
          list: [<>Then {talihoLink} again.</>],
        }}
      />,
    )

    expect((html.match(/href="https:\/\/www\.taliho\.com"/g) ?? []).length).toBe(1)
  })
})
