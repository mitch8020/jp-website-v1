import type { BlogDocumentLoaderMap } from './blog-types'

export const manualPostLoaders = {
  'futures-worth-playing-for': () =>
    import('./articles/FuturesWorthPlayingForArticle').then(
      (module) => module.futuresWorthPlayingForDocument,
    ),
  'futures-worth-playing-for-raw': () =>
    import('./articles/FuturesWorthPlayingForArticleRaw').then(
      (module) => module.rawThoughtsDocument,
    ),
} satisfies BlogDocumentLoaderMap
