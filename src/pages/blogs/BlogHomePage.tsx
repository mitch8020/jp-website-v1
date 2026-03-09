import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { startTransition } from 'react'
import { cx, styles } from '../../lib/style-primitives'
import {
  blogPosts,
  featuredBlogPost,
  getDateGroups,
} from './blog-posts'

export default function BlogHomePage() {
  const navigate = useNavigate()
  const featuredStats = featuredBlogPost.stats ?? []
  const featuredSignals = featuredBlogPost.signals ?? []
  const currentOrbitPosts = blogPosts.slice(0, 3)
  const archivePosts = blogPosts.slice(currentOrbitPosts.length)
  const randomArchivePool =
    archivePosts.length > 0 ? archivePosts : currentOrbitPosts
  const archiveYears = blogPosts.map((post) =>
    new Date(post.publishedAt).getUTCFullYear(),
  )
  const archiveStartYear = Math.min(...archiveYears)
  const archiveEndYear = Math.max(...archiveYears)
  const dateGroups = getDateGroups()

  function handleRandomArchiveClick() {
    if (randomArchivePool.length === 0) {
      return
    }

    const randomPost =
      randomArchivePool[Math.floor(Math.random() * randomArchivePool.length)]

    startTransition(() => {
      void navigate({
        to: '/blog/$slug',
        params: { slug: randomPost.slug },
      })
    })
  }

  return (
    <main className={cx(styles.pageWrap, 'px-4 pb-16 pt-8 sm:pb-20 sm:pt-12')}>
      <section
        className={cx(
          styles.blogStage,
          styles.riseIn,
          'rounded-[2.6rem] px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7',
        )}
      >
        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative z-10">
            <p className={cx(styles.signalLabel, 'mb-3')}>
              Blog / Signal Atlas / Volume 01
            </p>
            <h1
              className={cx(
                styles.signalDisplay,
                'max-w-4xl text-[clamp(2.2rem,5vw,3.6rem)] text-[var(--signal-ink)]',
              )}
            >
              A journal for futures that should feel more human, more playful,
              and more real.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--signal-ink-soft)] sm:text-base sm:leading-8">
              New essays still anchor the front of the journal, but the older
              WordPress archive now lives here too. The result is one searchable
              room for the full writing history: 44 entries spanning{' '}
              {archiveStartYear} through {archiveEndYear}.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/blog/$slug"
                params={{ slug: featuredBlogPost.slug }}
                className={cx(styles.signalAction, styles.signalActionPrimary)}
              >
                Read the featured essay
                <ArrowRight size={16} />
              </Link>
              <a
                href="#current-orbit"
                className={cx(
                  styles.signalAction,
                  styles.signalActionSecondary,
                )}
              >
                Explore the archive
              </a>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {featuredStats.map((stat) => (
                <div key={stat.label} className={styles.signalStat}>
                  <p className={cx(styles.signalLabel, 'mb-1')}>{stat.label}</p>
                  <p className="m-0 text-sm leading-6 text-[var(--signal-ink)] sm:text-base">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
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
                'left-[10%] top-[8%] h-[18rem] w-[18rem] sm:h-[20rem] sm:w-[20rem]',
              )}
            />
            <div
              className={cx(
                styles.orbitRing,
                'left-[36%] top-[18%] h-[13rem] w-[13rem] [animation-duration:24s]',
              )}
            />
            <div
              className={cx(
                styles.orbitRing,
                'left-[18%] top-[48%] h-[10rem] w-[10rem] [animation-duration:30s]',
              )}
            />

            <span className={cx(styles.orbitChip, 'left-[9%] top-[16%]')}>
              Curation
            </span>
            <span className={cx(styles.orbitChip, 'right-[12%] top-[18%]')}>
              Automation
            </span>
            <span className={cx(styles.orbitChip, 'left-[14%] bottom-[20%]')}>
              Games
            </span>
            <span className={cx(styles.orbitChip, 'right-[9%] bottom-[24%]')}>
              Language
            </span>

            <div className={styles.orbitCore}>
              <p className={cx(styles.signalLabel, 'mb-3')}>Core thesis</p>
              <p className="m-0 text-xl leading-8 text-[var(--signal-ink)] sm:text-2xl sm:leading-9">
                When creation becomes cheap, the scarce thing is taste,
                stewardship, and the ability to spark better conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <article className={cx(styles.signalCard, 'p-6 sm:p-7')}>
          <p className={cx(styles.signalLabel, 'mb-3')}>Why this exists</p>
          <h2
            className={cx(
              styles.signalDisplay,
              'text-[clamp(2.2rem,5vw,3.8rem)] text-[var(--signal-ink)]',
            )}
          >
            Ideas deserve a room that feels alive.
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--signal-ink-soft)]">
            The blog is designed like an editorial control room: part magazine,
            part strategy board, part invitation to play. The writing is meant
            to feel ambitious without becoming abstract or detached from actual
            human behavior.
          </p>

          <div className="mt-6 space-y-3">
            {featuredSignals.slice(0, 3).map((signal) => (
              <div
                key={signal.title}
                className={cx(styles.signalSubcard, 'rounded-[1.4rem]')}
              >
                <p className={cx(styles.signalLabel, 'mb-2')}>{signal.title}</p>
                <p className="m-0 text-sm leading-7 text-[var(--signal-ink-soft)]">
                  {signal.text}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article
          className={cx(
            styles.signalCard,
            styles.signalCardHover,
            'group relative overflow-hidden p-6 sm:p-8',
          )}
        >
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,177,81,0.24),transparent_64%)]" />
          <p className={cx(styles.signalLabel, 'mb-4')}>Featured essay</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--signal-ink-soft)]">
            <span>{featuredBlogPost.publishedLabel}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal-orange)]" />
            <span>{featuredBlogPost.readTime}</span>
          </div>
          <h2
            className={cx(
              styles.signalDisplay,
              'mt-5 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] text-[var(--signal-ink)]',
            )}
          >
            {featuredBlogPost.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--signal-ink-soft)]">
            {featuredBlogPost.teaser}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {featuredBlogPost.tags.map((tag) => (
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

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {featuredStats.map((stat) => (
              <div key={stat.label} className={styles.signalStat}>
                <p className={cx(styles.signalLabel, 'mb-2')}>{stat.label}</p>
                <p className="m-0 text-sm leading-6 text-[var(--signal-ink)] sm:text-base">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {featuredBlogPost.preview && (
            <p className="mt-8 border-l-2 border-[var(--signal-orange)] pl-4 text-sm italic leading-7 text-[var(--signal-ink-soft)]">
              {featuredBlogPost.preview}
            </p>
          )}

          <Link
            to="/blog/$slug"
            params={{ slug: featuredBlogPost.slug }}
            className={cx(
              styles.signalAction,
              styles.signalActionSecondary,
              'mt-6',
            )}
          >
            Open article
            <ArrowRight size={16} />
          </Link>
        </article>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
        <article
          id="current-orbit"
          className={cx(styles.signalCard, 'scroll-mt-28 p-6 sm:p-7')}
        >
          <p className={cx(styles.signalLabel, 'mb-3')}>Current orbit</p>
          <h2
            className={cx(
              styles.signalDisplay,
              'text-[clamp(2.2rem,5vw,3.5rem)] text-[var(--signal-ink)]',
            )}
          >
            Three recent essays stay in view.
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--signal-ink-soft)]">
            The orbit keeps the latest four entries within reach while the rest
            of the archive stays available for wandering. If you want a deeper
            cut, jump to a random archive piece and see what still resonates.
          </p>

          <div className="mt-6 space-y-3">
            {currentOrbitPosts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className={cx(
                  styles.signalSubcard,
                  'block rounded-[1.5rem] no-underline',
                  'transition-[transform,border-color,box-shadow] duration-[200ms] ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--signal-orange)_36%,var(--signal-line))] hover:shadow-[0_16px_32px_rgba(17,32,46,0.12)]',
                )}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--signal-ink-soft)]">
                  <span>{post.category}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal-orange)]" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--signal-ink)]">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--signal-ink-soft)]">
                  {post.teaser}
                </p>
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={handleRandomArchiveClick}
            className={cx(
              styles.signalAction,
              styles.signalActionSecondary,
              'mt-6 w-full sm:w-auto',
            )}
          >
            Read a random archive article
            <ArrowRight size={16} />
          </button>
        </article>

        <article className={cx(styles.signalCard, 'p-6 sm:p-7')}>
          <p className={cx(styles.signalLabel, 'mb-3')}>Filter by date</p>
          <div className="space-y-4">
            {dateGroups.map((group) => (
              <div key={group.year}>
                <p className="mb-2 text-sm font-semibold text-[var(--signal-ink)]">
                  {group.year}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.months.map((m) => (
                    <Link
                      key={`${group.year}-${m.month}`}
                      to="/blog/date/$date"
                      params={{
                        date: `${group.year}-${String(m.month).padStart(2, '0')}`,
                      }}
                      className={cx(
                        styles.signalTagPill,
                        'no-underline transition-[transform,border-color,box-shadow] duration-[200ms] ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--signal-orange)_36%,var(--signal-line))] hover:shadow-[0_8px_16px_rgba(17,32,46,0.10)]',
                      )}
                    >
                      {m.label} ({m.count})
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}
