import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Compass,
  Gamepad2,
  Languages,
  Workflow,
} from 'lucide-react'
import { blogPosts, featuredBlogPost } from './blog-posts'

const signalIcons = [Compass, Workflow, Gamepad2, Languages]

export default function BlogHomePage() {
  return (
    <main className="page-wrap px-4 pb-16 pt-8 sm:pb-20 sm:pt-12">
      <section className="blog-stage rise-in overflow-hidden rounded-[2.6rem] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative z-10">
            <p className="signal-label mb-4">Blog / Signal Atlas / Volume 01</p>
            <h1 className="signal-display max-w-4xl text-[clamp(3.3rem,9vw,7.4rem)] text-[var(--signal-ink)]">
              A journal for futures that should feel more human, more playful,
              and more real.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--signal-ink-soft)] sm:text-lg">
              This corner of the site is built for essays about curation, games,
              language, automation, and the kinds of systems that could help
              people feel agency instead of drift.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/blog/$slug"
                params={{ slug: featuredBlogPost.slug }}
                className="signal-action signal-action--primary"
              >
                Read the first essay
                <ArrowRight size={16} />
              </Link>
              <a
                href="#current-orbit"
                className="signal-action signal-action--secondary"
              >
                Explore the archive
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {featuredBlogPost.stats.map((stat) => (
                <div key={stat.label} className="signal-stat">
                  <p className="signal-label mb-2">{stat.label}</p>
                  <p className="m-0 text-sm leading-6 text-[var(--signal-ink)] sm:text-base">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="orbit-field min-h-[320px] sm:min-h-[380px]">
            <div className="orbit-ring left-[10%] top-[8%] h-[18rem] w-[18rem] sm:h-[20rem] sm:w-[20rem]" />
            <div className="orbit-ring left-[36%] top-[18%] h-[13rem] w-[13rem] [animation-duration:24s]" />
            <div className="orbit-ring left-[18%] top-[48%] h-[10rem] w-[10rem] [animation-duration:30s]" />

            <span className="orbit-chip left-[9%] top-[16%]">Curation</span>
            <span className="orbit-chip right-[12%] top-[18%]">Automation</span>
            <span className="orbit-chip left-[14%] bottom-[20%]">Games</span>
            <span className="orbit-chip right-[9%] bottom-[24%]">Language</span>

            <div className="orbit-core">
              <p className="signal-label mb-3">Core thesis</p>
              <p className="m-0 text-xl leading-8 text-[var(--signal-ink)] sm:text-2xl sm:leading-9">
                When creation becomes cheap, the scarce thing is taste,
                stewardship, and the ability to spark better conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <article className="signal-card p-6 sm:p-7">
          <p className="signal-label mb-3">Why this exists</p>
          <h2 className="signal-display text-[clamp(2.2rem,5vw,3.8rem)] text-[var(--signal-ink)]">
            Ideas deserve a room that feels alive.
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--signal-ink-soft)]">
            The blog is designed like an editorial control room: part magazine,
            part strategy board, part invitation to play. The writing is meant
            to feel ambitious without becoming abstract or detached from actual
            human behavior.
          </p>

          <div className="mt-6 space-y-3">
            {featuredBlogPost.signals.slice(0, 3).map((signal) => (
              <div
                key={signal.title}
                className="rounded-[1.4rem] border border-[var(--signal-line)] bg-[rgba(255,255,255,0.48)] p-4 dark:bg-[rgba(10,18,24,0.56)]"
              >
                <p className="signal-label mb-2">{signal.title}</p>
                <p className="m-0 text-sm leading-7 text-[var(--signal-ink-soft)]">
                  {signal.text}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="signal-card group relative overflow-hidden p-6 sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,177,81,0.24),transparent_64%)]" />
          <p className="signal-label mb-4">Featured essay</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--signal-ink-soft)]">
            <span>{featuredBlogPost.publishedLabel}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal-orange)]" />
            <span>{featuredBlogPost.readTime}</span>
          </div>
          <h2 className="signal-display mt-5 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] text-[var(--signal-ink)]">
            {featuredBlogPost.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--signal-ink-soft)]">
            {featuredBlogPost.teaser}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {featuredBlogPost.tags.map((tag) => (
              <span key={tag} className="signal-tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {featuredBlogPost.stats.map((stat) => (
              <div key={stat.label} className="signal-stat">
                <p className="signal-label mb-2">{stat.label}</p>
                <p className="m-0 text-sm leading-6 text-[var(--signal-ink)] sm:text-base">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/blog/$slug"
            params={{ slug: featuredBlogPost.slug }}
            className="signal-action signal-action--secondary mt-8"
          >
            Open article
            <ArrowRight size={16} />
          </Link>
        </article>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
        <article className="signal-card p-6 sm:p-7">
          <p className="signal-label mb-3">Signal map</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredBlogPost.signals.map((signal, index) => {
              const Icon = signalIcons[index % signalIcons.length]

              return (
                <div
                  key={signal.title}
                  className="rounded-[1.5rem] border border-[var(--signal-line)] bg-[rgba(255,255,255,0.48)] p-4 dark:bg-[rgba(10,18,24,0.56)]"
                >
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(71,195,183,0.12)] text-[var(--signal-teal)]">
                    <Icon size={18} />
                  </span>
                  <h3 className="m-0 text-base font-semibold text-[var(--signal-ink)]">
                    {signal.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--signal-ink-soft)]">
                    {signal.text}
                  </p>
                </div>
              )
            })}
          </div>
        </article>

        <article
          id="current-orbit"
          className="signal-card scroll-mt-28 p-6 sm:p-7"
        >
          <p className="signal-label mb-3">Current orbit</p>
          <h2 className="signal-display text-[clamp(2.2rem,5vw,3.5rem)] text-[var(--signal-ink)]">
            The archive is small on purpose.
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--signal-ink-soft)]">
            The infrastructure is ready for more essays, but the bar is curation
            instead of volume. New writing can be added as new page components
            under <code>src/pages/blogs</code> and surfaced here through the
            shared registry.
          </p>

          <div className="mt-6 space-y-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block rounded-[1.5rem] border border-[var(--signal-line)] bg-[rgba(255,255,255,0.48)] p-4 no-underline transition hover:-translate-y-0.5 dark:bg-[rgba(10,18,24,0.56)]"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.12em] text-[var(--signal-ink-soft)] uppercase">
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
        </article>
      </section>
    </main>
  )
}
