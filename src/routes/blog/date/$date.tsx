import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { cx, styles } from '../../../lib/style-primitives'
import { getPostsByDate } from '../../../pages/blogs/blog-posts'

const monthNames = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function parseDateParam(date: string): { year: number; month?: number } {
  const parts = date.split('-')
  const year = parseInt(parts[0], 10)
  const month = parts[1] ? parseInt(parts[1], 10) : undefined
  return { year, month }
}

function formatDateHeading(year: number, month?: number): string {
  if (month && month >= 1 && month <= 12) {
    return `${monthNames[month]} ${year}`
  }
  return String(year)
}

export const Route = createFileRoute('/blog/date/$date')({
  component: BlogDateRoute,
  head: ({ params }) => {
    const { year, month } = parseDateParam(params.date)
    const heading = formatDateHeading(year, month)
    return {
      meta: [
        {
          title: `Posts from ${heading} | JP Personal Website`,
        },
        {
          name: 'description',
          content: `All blog posts published in ${heading}.`,
        },
      ],
    }
  },
})

function BlogDateRoute() {
  const { date } = Route.useParams()
  const { year, month } = parseDateParam(date)
  const heading = formatDateHeading(year, month)
  const posts = getPostsByDate(year, month)

  return (
    <main className={cx(styles.pageWrap, 'px-4 pb-16 pt-8 sm:pb-20 sm:pt-12')}>
      <section
        className={cx(
          styles.signalCard,
          styles.riseIn,
          'rounded-[2.2rem] p-6 sm:p-8',
        )}
      >
        <Link
          to="/blog"
          className={cx(
            styles.signalAction,
            styles.signalActionSecondary,
            'mb-6',
          )}
        >
          <ArrowLeft size={16} />
          Back to journal
        </Link>

        <p className={cx(styles.signalLabel, 'mb-3')}>
          Filtered by date
        </p>
        <h1
          className={cx(
            styles.signalDisplay,
            'text-[clamp(2.2rem,5vw,3.8rem)] text-[var(--signal-ink)]',
          )}
        >
          {heading}
        </h1>
        <p className="mt-3 text-base leading-8 text-[var(--signal-ink-soft)]">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
          in {heading}.
        </p>

        {posts.length === 0 ? (
          <p className="mt-6 text-base leading-8 text-[var(--signal-ink-soft)]">
            No articles found for this date.
          </p>
        ) : (
          <div className="mt-6 space-y-3">
            {posts.map((post) => (
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
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal-orange)]" />
                  <span>{post.publishedLabel}</span>
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
        )}
      </section>
    </main>
  )
}
