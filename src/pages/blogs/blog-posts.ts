import { futuresWorthPlayingForPost } from './articles/FuturesWorthPlayingForArticle'
import type { BlogPost } from './blog-types'

export const blogPosts: BlogPost[] = [futuresWorthPlayingForPost]

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export const featuredBlogPost = blogPosts[0]
