import type { ComponentType } from 'react'

export type BlogSignal = {
  title: string
  text: string
}

export type BlogStat = {
  label: string
  value: string
}

export type BlogSectionLink = {
  id: string
  label: string
}

export type ArchivedComment = {
  id: string
  parentId: string | null
  authorName: string
  authorUrl?: string
  publishedAt: string
  publishedLabel: string
  contentHtml: string
  replies: ArchivedComment[]
}

export type FeaturedImage = {
  src: string
  alt: string
}

export type BlogPostSummary = {
  slug: string
  title: string
  summary: string
  teaser: string
  publishedAt: string
  publishedLabel: string
  readTime: string
  category: string
  tags: string[]
  preview?: string
  quote?: string
  stats?: BlogStat[]
  signals?: BlogSignal[]
  sectionLinks?: BlogSectionLink[]
  source: 'manual' | 'wordpress'
  commentCount: number
}

export type ComponentBlogPostDocument = BlogPostSummary & {
  kind: 'component'
  Component: ComponentType
}

export type HtmlBlogPostDocument = BlogPostSummary & {
  kind: 'html'
  html: string
  comments: ArchivedComment[]
  featuredImage?: FeaturedImage
}

export type BlogPostDocument = ComponentBlogPostDocument | HtmlBlogPostDocument

export type BlogDocumentLoaderMap = Record<
  string,
  () => Promise<BlogPostDocument>
>
