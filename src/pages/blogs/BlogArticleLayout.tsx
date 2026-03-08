import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight, Clock3, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import type { BlogPost } from './blog-types'

type BlogArticleLayoutProps = {
  post: BlogPost
  children: ReactNode
}

export default function BlogArticleLayout({
  post,
  children,
}: BlogArticleLayoutProps) {
  return (
    <main className="page-wrap px-4 pb-16 pt-8 sm:pb-20 sm:pt-12">
      <section className="blog-stage rise-in overflow-hidden rounded-[2.4rem] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative z-10">
            <Link to="/blog" className="signal-action signal-action--secondary">
              <ArrowLeft size={16} />
              Back to the journal
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--signal-ink-soft)]">
              <span className="signal-label">{post.category}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal-orange)]" />
              <span>{post.publishedLabel}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal-teal)]" />
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} />
                {post.readTime}
              </span>
            </div>

            <h1 className="signal-display mt-5 max-w-4xl text-[clamp(3rem,8vw,6.4rem)] text-[var(--signal-ink)]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--signal-ink-soft)] sm:text-lg">
              {post.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {post.tags.map((tag) => (
                <span key={tag} className="signal-tag-pill">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {post.stats.map((stat) => (
                <div key={stat.label} className="signal-stat">
                  <p className="signal-label mb-2">{stat.label}</p>
                  <p className="m-0 text-sm leading-6 text-[var(--signal-ink)] sm:text-base">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="orbit-field min-h-[320px] sm:min-h-[360px]">
            <div className="orbit-ring left-[14%] top-[18%] h-[16rem] w-[16rem] sm:h-[18rem] sm:w-[18rem]" />
            <div className="orbit-ring left-[38%] top-[8%] h-[12rem] w-[12rem] [animation-duration:24s]" />
            <div className="orbit-ring left-[4%] top-[42%] h-[10rem] w-[10rem] [animation-duration:30s]" />

            <span className="orbit-chip left-[10%] top-[12%]">Taste</span>
            <span className="orbit-chip right-[14%] top-[18%]">Play</span>
            <span className="orbit-chip left-[16%] bottom-[18%]">Care</span>
            <span className="orbit-chip right-[8%] bottom-[22%]">Signal</span>

            <div className="orbit-core">
              <p className="signal-label mb-3">Featured line</p>
              <p className="m-0 text-xl leading-8 text-[var(--signal-ink)] sm:text-2xl sm:leading-9">
                {post.quote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="signal-card p-5">
            <p className="signal-label mb-3">Route map</p>
            <div className="space-y-3">
              {post.sectionLinks.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="signal-path no-underline"
                >
                  <span className="signal-path-index">{index + 1}</span>
                  <span className="text-sm leading-6 text-[var(--signal-ink)]">
                    {section.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="signal-card p-5">
            <p className="signal-label mb-3">Reading mode</p>
            <p className="m-0 text-sm leading-7 text-[var(--signal-ink-soft)]">
              This essay is written like a route sketch: small defensible
              conclusions stacked until a larger future becomes visible.
            </p>

            <div className="signal-key-cue mt-5">
              <p className="signal-label signal-key-cue-label mb-3">Key cue</p>
              <p className="signal-key-cue-text m-0">
                AI lowers the cost of trying. Taste, patience, and curation
                decide which tries deserve more life.
              </p>
            </div>
          </div>

          <div className="signal-card p-5">
            <p className="signal-label mb-3">Continue</p>
            <Link to="/blog" className="signal-action signal-action--secondary">
              Return to all writing
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </aside>

        <article className="signal-card overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="blog-prose">{children}</div>

          <div className="signal-inline-note mt-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,138,56,0.12)] text-[var(--signal-orange)]">
                <Sparkles size={18} />
              </span>
              <div>
                <p className="signal-label mb-1">Last note</p>
                <p className="m-0 text-sm leading-6 text-[var(--signal-ink-soft)]">
                  Better futures rarely arrive fully formed. They are tested,
                  curated, and made legible one iteration at a time.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}
