import { futuresWorthPlayingForDocument } from './articles/FuturesWorthPlayingForArticle'
import { rawThoughtsDocument } from './articles/FuturesWorthPlayingForArticleRaw'
import { byohpDocument } from './articles/BYOHPArticle'
import { byohpRawDocument } from './articles/BYOHPArticleRaw'
import { movieEventsDocument } from './articles/MovieEventsArticle'
import { movieEventsRawDocument } from './articles/MovieEventsArticleRaw'
import { gameNightsDocument } from './articles/GameNightsArticle'
import { gameNightsRawDocument } from './articles/GameNightsArticleRaw'
import { cityBuilderDocument } from './articles/CityBuilderArticle'
import { cityBuilderRawDocument } from './articles/CityBuilderArticleRaw'
import type { ComponentBlogPostDocument } from './blog-types'

const manualPostDocuments = {
  'futures-worth-playing-for': futuresWorthPlayingForDocument,
  'futures-worth-playing-for-raw': rawThoughtsDocument,
  'byohp': byohpDocument,
  'byohp-raw': byohpRawDocument,
  'movie-events': movieEventsDocument,
  'movie-events-raw': movieEventsRawDocument,
  'game-nights': gameNightsDocument,
  'game-nights-raw': gameNightsRawDocument,
  'city-builder-for-real-world': cityBuilderDocument,
  'city-builder-for-real-world-raw': cityBuilderRawDocument,
} satisfies Record<string, ComponentBlogPostDocument>

export function getManualPostDocumentBySlug(slug: string) {
  return manualPostDocuments[slug as keyof typeof manualPostDocuments]
}
