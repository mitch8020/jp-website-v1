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

export type BlogPost = {
  slug: string
  title: string
  summary: string
  teaser: string
  strapline: string
  publishedAt: string
  publishedLabel: string
  readTime: string
  category: string
  tags: string[]
  quote: string
  stats: BlogStat[]
  signals: BlogSignal[]
  sectionLinks: BlogSectionLink[]
  Component: ComponentType
}
