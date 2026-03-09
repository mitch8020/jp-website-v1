import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { cx, styles } from '../../lib/style-primitives'
import ImportedBlogPostPage from '../../pages/blogs/ImportedBlogPostPage'
import { getManualPostDocumentBySlug } from '../../pages/blogs/manual-post-documents'
import {
  getBlogPostSummaryBySlug,
  loadBlogPostDocument,
} from '../../pages/blogs/blog-posts'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const summary = getBlogPostSummaryBySlug(params.slug)

    return {
      post:
        summary?.source === 'wordpress'
          ? await loadBlogPostDocument(params.slug)
          : undefined,
    }
  },
  component: BlogArticleRoute,
  head: ({ params }) => {
    const post = getBlogPostSummaryBySlug(params.slug)

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
  const { post } = Route.useLoaderData()
  const manualPost = getManualPostDocumentBySlug(slug)
  const resolvedPost = post ?? manualPost

  if (!resolvedPost) {
    return (
      <main className={cx(styles.pageWrap, 'px-4 pb-16 pt-10 sm:pb-20')}>
        <section
          className={cx(
            styles.signalCard,
            styles.riseIn,
            'rounded-[2.2rem] p-6 sm:p-8',
          )}
        >
          <p className={cx(styles.signalLabel, 'mb-3')}>Missing article</p>
          <h1
            className={cx(
              styles.signalDisplay,
              'text-[clamp(2.4rem,6vw,4.4rem)] text-[var(--signal-ink)]',
            )}
          >
            Nothing is orbiting at "{slug}" yet.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--signal-ink-soft)]">
            The archive is intentionally curated. This slug does not map to a
            published post right now.
          </p>
          <Link
            to="/blog"
            className={cx(
              styles.signalAction,
              styles.signalActionSecondary,
              'mt-6',
            )}
          >
            <ArrowLeft size={16} />
            Return to the journal
          </Link>
        </section>
      </main>
    )
  }

  if (resolvedPost.kind === 'html') {
    return <ImportedBlogPostPage post={resolvedPost} />
  }

  const Article = resolvedPost.Component
  return <Article />
}
