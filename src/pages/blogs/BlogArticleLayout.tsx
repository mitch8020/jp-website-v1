import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Sparkles,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { cx, styles } from '../../lib/style-primitives'
import ArchivedComments from './ArchivedComments'
import { blogPosts } from './blog-posts'
import type { ArchivedComment, BlogPostSummary } from './blog-types'

type BlogArticleLayoutProps = {
  post: BlogPostSummary
  children?: ReactNode
  comments?: ArchivedComment[]
  html?: string
  leadingVisual?: ReactNode
  proseClassName?: string
}

export default function BlogArticleLayout({
  post,
  children,
  comments = [],
  html,
  leadingVisual,
  proseClassName = '',
}: BlogArticleLayoutProps) {
  const currentTags = new Set(post.tags.map((t) => t.toLowerCase()))
  const relatedByTopic = blogPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      overlap: p.tags.filter((t) => currentTags.has(t.toLowerCase())).length,
    }))
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 2)
    .map(({ post: p }) => p)

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug)
  const newerPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : undefined
  const olderPost =
    currentIndex >= 0 && currentIndex < blogPosts.length - 1
      ? blogPosts[currentIndex + 1]
      : undefined

  const readingModeCopy =
    post.source === 'wordpress'
      ? 'This entry was restored from the original WordPress archive with light cleanup, preserved dates, remapped self-links, and archived reader comments when they existed.'
      : 'This essay is written like a route sketch: small defensible conclusions stacked until a larger future becomes visible.'

  const keyCue = post.signals?.[0]?.text ?? post.quote ?? post.summary
  const closingNote =
    post.source === 'wordpress'
      ? 'Archive work matters because old thoughts only stay useful if they remain legible, searchable, and connected to the conversations around them.'
      : 'Better futures rarely arrive fully formed. They are tested, curated, and made legible one iteration at a time.'

  return (
    <main className={cx(styles.pageWrap, 'px-4 pb-16 pt-8 sm:pb-20 sm:pt-12')}>
      <section
        className={cx(
          styles.blogStage,
          styles.riseIn,
          'rounded-[2.4rem] px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7',
        )}
      >
        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative z-10">
            <Link
              to="/blog"
              className={cx(styles.signalAction, styles.signalActionSecondary)}
            >
              <ArrowLeft size={16} />
              Back to the journal
            </Link>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--signal-ink-soft)]">
              <span className={styles.signalLabel}>{post.category}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal-orange)]" />
              <span>{post.publishedLabel}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal-teal)]" />
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} />
                {post.readTime}
              </span>
            </div>

            <h1
              className={cx(
                styles.signalDisplay,
                'mt-4 max-w-4xl text-[clamp(2rem,4.5vw,3.6rem)] text-[var(--signal-ink)]',
              )}
            >
              {post.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--signal-ink-soft)] sm:text-base sm:leading-8">
              {post.summary}
            </p>

            {post.tags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2.5">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to="/blog/tag/$tag"
                    params={{ tag: tag.toLowerCase() }}
                    className={cx(
                      styles.signalTagPill,
                      'no-underline transition-[transform,border-color,box-shadow] duration-[200ms] ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--signal-orange)_36%,var(--signal-line))] hover:shadow-[0_8px_16px_rgba(17,32,46,0.10)]',
                    )}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}

            {post.stats && post.stats.length > 0 ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {post.stats.map((stat) => (
                  <div key={stat.label} className={styles.signalStat}>
                    <p className={cx(styles.signalLabel, 'mb-1')}>
                      {stat.label}
                    </p>
                    <p className="m-0 text-sm leading-6 text-[var(--signal-ink)] sm:text-base">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div
            className={cx(
              styles.orbitField,
              'hidden min-h-[260px] sm:block sm:min-h-[300px]',
            )}
          >
            <div
              className={cx(
                styles.orbitRing,
                'left-[14%] top-[18%] h-[16rem] w-[16rem] sm:h-[18rem] sm:w-[18rem]',
              )}
            />
            <div
              className={cx(
                styles.orbitRing,
                'left-[38%] top-[8%] h-[12rem] w-[12rem] [animation-duration:24s]',
              )}
            />
            <div
              className={cx(
                styles.orbitRing,
                'left-[4%] top-[42%] h-[10rem] w-[10rem] [animation-duration:30s]',
              )}
            />

            <span className={cx(styles.orbitChip, 'left-[10%] top-[12%]')}>
              Taste
            </span>
            <span className={cx(styles.orbitChip, 'right-[14%] top-[18%]')}>
              Play
            </span>
            <span className={cx(styles.orbitChip, 'left-[16%] bottom-[18%]')}>
              Care
            </span>
            <span className={cx(styles.orbitChip, 'right-[8%] bottom-[22%]')}>
              Signal
            </span>

            <div className={styles.orbitCore}>
              <p className={cx(styles.signalLabel, 'mb-3')}>Featured line</p>
              <p className="m-0 text-xl leading-8 text-[var(--signal-ink)] sm:text-2xl sm:leading-9">
                {post.quote ?? post.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {post.sectionLinks && post.sectionLinks.length > 0 ? (
            <div className={cx(styles.signalCard, 'rounded-[1.8rem] p-5')}>
              <p className={cx(styles.signalLabel, 'mb-3')}>Route map</p>
              <div className="space-y-3">
                {post.sectionLinks.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={styles.signalPath}
                  >
                    <span className={styles.signalPathIndex}>{index + 1}</span>
                    <span className="text-sm leading-6 text-[var(--signal-ink)]">
                      {section.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <div className={cx(styles.signalCard, 'rounded-[1.8rem] p-5')}>
            <p className={cx(styles.signalLabel, 'mb-3')}>Reading mode</p>
            <p className="m-0 text-sm leading-7 text-[var(--signal-ink-soft)]">
              {readingModeCopy}
            </p>

            <div className={cx(styles.signalKeyCue, 'mt-5')}>
              <p
                className={cx(
                  styles.signalLabel,
                  styles.signalKeyCueLabel,
                  'mb-3',
                )}
              >
                Key cue
              </p>
              <p className={cx(styles.signalKeyCueText, 'm-0')}>{keyCue}</p>
            </div>
          </div>

          <div className={cx(styles.signalCard, 'rounded-[1.8rem] p-5')}>
            <p className={cx(styles.signalLabel, 'mb-3')}>Continue</p>
            <Link
              to="/blog"
              className={cx(styles.signalAction, styles.signalActionSecondary)}
            >
              Return to all writing
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </aside>

        <div className="space-y-6">
          <article
            className={cx(
              styles.signalCard,
              'overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10',
            )}
          >
            {leadingVisual}

            <div
              className={cx(
                'blog-prose prose max-w-none prose-neutral dark:prose-invert',
                '[--tw-prose-body:var(--signal-ink-soft)] [--tw-prose-headings:var(--signal-ink)] [--tw-prose-links:var(--signal-orange)] [--tw-prose-bold:var(--signal-ink)] [--tw-prose-counters:var(--signal-ink-soft)] [--tw-prose-bullets:var(--signal-orange)] [--tw-prose-quotes:var(--signal-ink)] [--tw-prose-quote-borders:var(--signal-orange)] [--tw-prose-captions:var(--signal-ink-soft)]',
                proseClassName,
              )}
              dangerouslySetInnerHTML={html ? { __html: html } : undefined}
            >
              {html ? null : children}
            </div>

            <div className={cx(styles.signalInlineNote, 'mt-10')}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,138,56,0.12)] text-[var(--signal-orange)]">
                  <Sparkles size={18} />
                </span>
                <div>
                  <p className={cx(styles.signalLabel, 'mb-1')}>Last note</p>
                  <p className="m-0 text-sm leading-6 text-[var(--signal-ink-soft)]">
                    {closingNote}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <ArchivedComments comments={comments} />

          <section
            className={cx(
              styles.suggestedReading,
              styles.riseIn,
              'rounded-[2rem] p-6 sm:p-8',
            )}
          >
            <p className={cx(styles.signalLabel, 'mb-4')}>Continue reading</p>

            {relatedByTopic.length > 0 && (
              <>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--signal-ink-soft)]">
                  Related by topic
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedByTopic.map((suggested) => (
                    <Link
                      key={suggested.slug}
                      to="/blog/$slug"
                      params={{ slug: suggested.slug }}
                      className={cx(
                        styles.suggestedCard,
                        'group block rounded-[1.6rem] p-5 no-underline',
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-2.5 text-xs">
                        <span className={styles.signalLabel}>
                          {suggested.category}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-[var(--signal-orange)]" />
                        <span className="font-semibold tracking-wide text-[var(--signal-ink-soft)]">
                          {suggested.readTime}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight text-[var(--signal-ink)]">
                        {suggested.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--signal-ink-soft)]">
                        {suggested.teaser}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--signal-orange)] transition-transform group-hover:translate-x-1">
                        Read article
                        <ArrowRight size={14} />
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {(olderPost || newerPost) && (
              <div className={cx(relatedByTopic.length > 0 && 'mt-6')}>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--signal-ink-soft)]">
                  Previous / Next
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {olderPost ? (
                    <Link
                      to="/blog/$slug"
                      params={{ slug: olderPost.slug }}
                      className={cx(
                        styles.suggestedCard,
                        'group flex items-center gap-4 rounded-[1.6rem] p-5 no-underline',
                      )}
                    >
                      <ArrowLeft
                        size={18}
                        className="shrink-0 text-[var(--signal-orange)] transition-transform group-hover:-translate-x-1"
                      />
                      <div className="min-w-0">
                        <p className={cx(styles.signalLabel, 'mb-1')}>
                          Previous
                        </p>
                        <p className="m-0 truncate text-sm font-bold leading-snug text-[var(--signal-ink)]">
                          {olderPost.title}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {newerPost ? (
                    <Link
                      to="/blog/$slug"
                      params={{ slug: newerPost.slug }}
                      className={cx(
                        styles.suggestedCard,
                        'group flex items-center gap-4 rounded-[1.6rem] p-5 no-underline text-right',
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <p className={cx(styles.signalLabel, 'mb-1')}>Next</p>
                        <p className="m-0 truncate text-sm font-bold leading-snug text-[var(--signal-ink)]">
                          {newerPost.title}
                        </p>
                      </div>
                      <ArrowRight
                        size={18}
                        className="shrink-0 text-[var(--signal-orange)] transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <Link
                to="/blog"
                className={cx(
                  styles.signalAction,
                  styles.signalActionSecondary,
                )}
              >
                View all writing
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
