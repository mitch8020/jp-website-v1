import { importedPostLoaders } from './generated/imported-post-loaders'
import { importedPostSummaries } from './generated/imported-post-summaries'
import { manualPostLoaders } from './manual-post-loaders'
import {
  futuresWorthPlayingForSummary,
  manualPostSummaries,
} from './manual-post-summaries'
import type { BlogPostDocument, BlogPostSummary } from './blog-types'

function sortBlogPosts(left: BlogPostSummary, right: BlogPostSummary) {
  return (
    new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
  )
}

export const blogPosts: BlogPostSummary[] = [
  ...manualPostSummaries,
  ...importedPostSummaries,
].sort(sortBlogPosts)

export function getBlogPostSummaryBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

const blogPostLoaders = {
  ...manualPostLoaders,
  ...importedPostLoaders,
}

export async function loadBlogPostDocument(
  slug: string,
): Promise<BlogPostDocument | undefined> {
  const loader = blogPostLoaders[slug]

  if (!loader) {
    return undefined
  }

  return loader()
}

export const featuredBlogPost =
  getBlogPostSummaryBySlug(futuresWorthPlayingForSummary.slug) ?? blogPosts[0]

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      tagSet.add(tag)
    }
  }
  return [...tagSet].sort((a, b) => a.localeCompare(b))
}

export function getPostsByTag(tag: string): BlogPostSummary[] {
  const lower = tag.toLowerCase()
  return blogPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === lower),
  )
}

export type BlogDateGroup = {
  year: number
  months: { month: number; label: string; count: number }[]
}

export function getDateGroups(): BlogDateGroup[] {
  const map = new Map<number, Map<number, number>>()
  for (const post of blogPosts) {
    const d = new Date(post.publishedAt)
    const year = d.getUTCFullYear()
    const month = d.getUTCMonth() + 1
    if (!map.has(year)) map.set(year, new Map())
    const monthMap = map.get(year)!
    monthMap.set(month, (monthMap.get(month) ?? 0) + 1)
  }

  const monthNames = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  return [...map.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, monthMap]) => ({
      year,
      months: [...monthMap.entries()]
        .sort(([a], [b]) => b - a)
        .map(([month, count]) => ({
          month,
          label: monthNames[month],
          count,
        })),
    }))
}

export function getPostsByDate(year: number, month?: number): BlogPostSummary[] {
  return blogPosts.filter((post) => {
    const d = new Date(post.publishedAt)
    if (d.getUTCFullYear() !== year) return false
    if (month != null && d.getUTCMonth() + 1 !== month) return false
    return true
  })
}
