import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { getBlogPostBySlug } from '../../pages/blogs/blog-posts'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogArticleRoute,
  head: ({ params }) => {
    const post = getBlogPostBySlug(params.slug)

    return {
      meta: [
        {
          title: post
            ? `${post.title} | JP Personal Website`
            : 'Article Not Found | JP Personal Website',
        },
        {
          name: 'description',
          content:
            post?.summary ??
            'The article you requested is not in the archive yet.',
        },
      ],
    }
  },
})

function BlogArticleRoute() {
  const { slug } = Route.useParams()
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return (
      <main className="page-wrap px-4 pb-16 pt-10 sm:pb-20">
        <section className="signal-card rise-in rounded-[2.2rem] p-6 sm:p-8">
          <p className="signal-label mb-3">Missing article</p>
          <h1 className="signal-display text-[clamp(2.4rem,6vw,4.4rem)] text-[var(--signal-ink)]">
            Nothing is orbiting at "{slug}" yet.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--signal-ink-soft)]">
            The archive is intentionally curated. This slug does not map to a
            published post right now.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--signal-line)] bg-[rgba(255,255,255,0.55)] px-5 py-3 text-sm font-semibold text-[var(--signal-ink)] no-underline transition hover:-translate-y-0.5 dark:bg-[rgba(13,22,29,0.62)]"
          >
            <ArrowLeft size={16} />
            Return to the journal
          </Link>
        </section>
      </main>
    )
  }

  const Article = post.Component

  return <Article />
}
