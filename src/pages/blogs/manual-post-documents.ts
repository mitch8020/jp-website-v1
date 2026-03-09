import { futuresWorthPlayingForDocument } from './articles/FuturesWorthPlayingForArticle'
import { rawThoughtsDocument } from './articles/FuturesWorthPlayingForArticleRaw'
import type { ComponentBlogPostDocument } from './blog-types'

const manualPostDocuments = {
  'futures-worth-playing-for': futuresWorthPlayingForDocument,
  'futures-worth-playing-for-raw': rawThoughtsDocument,
} satisfies Record<string, ComponentBlogPostDocument>

export function getManualPostDocumentBySlug(slug: string) {
  return manualPostDocuments[slug as keyof typeof manualPostDocuments]
}
