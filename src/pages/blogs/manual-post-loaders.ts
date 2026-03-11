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
  'byohp': () =>
    import('./articles/BYOHPArticle').then(
      (module) => module.byohpDocument,
    ),
  'byohp-raw': () =>
    import('./articles/BYOHPArticleRaw').then(
      (module) => module.byohpRawDocument,
    ),
  'movie-events': () =>
    import('./articles/MovieEventsArticle').then(
      (module) => module.movieEventsDocument,
    ),
  'movie-events-raw': () =>
    import('./articles/MovieEventsArticleRaw').then(
      (module) => module.movieEventsRawDocument,
    ),
  'game-nights': () =>
    import('./articles/GameNightsArticle').then(
      (module) => module.gameNightsDocument,
    ),
  'game-nights-raw': () =>
    import('./articles/GameNightsArticleRaw').then(
      (module) => module.gameNightsRawDocument,
    ),
  'city-builder-for-real-world': () =>
    import('./articles/CityBuilderArticle').then(
      (module) => module.cityBuilderDocument,
    ),
  'city-builder-for-real-world-raw': () =>
    import('./articles/CityBuilderArticleRaw').then(
      (module) => module.cityBuilderRawDocument,
    ),
} satisfies BlogDocumentLoaderMap
