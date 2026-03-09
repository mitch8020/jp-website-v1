import BlogArticleLayout from './BlogArticleLayout'
import type { HtmlBlogPostDocument } from './blog-types'

export default function ImportedBlogPostPage({
  post,
}: {
  post: HtmlBlogPostDocument
}) {
  const featuredImage = post.featuredImage ? (
    <figure className="mb-8 overflow-hidden rounded-[1.6rem] border border-[var(--signal-line)] bg-[color-mix(in_oklab,var(--signal-surface-strong)_88%,white_12%)] shadow-[0_18px_36px_rgba(17,32,46,0.08)]">
      <img
        src={post.featuredImage.src}
        alt={post.featuredImage.alt}
        className="block h-auto w-full"
      />
    </figure>
  ) : null

  return (
    <BlogArticleLayout
      post={post}
      html={post.html}
      leadingVisual={featuredImage}
      comments={post.comments}
      proseClassName="[&>section>:first-child]:mt-0"
    />
  )
}
