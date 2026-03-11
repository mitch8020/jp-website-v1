import BlogArticleLayout from '../BlogArticleLayout'
import type { ComponentBlogPostDocument } from '../blog-types'
import { movieEventsSummary } from '../manual-post-summaries'
import { ManualArticleSection } from './ManualArticleSection'
import { blogLink } from './blogLink'

const articleSections = [
  {
    id: 'the-concept',
    label: 'Rent a room, pick a film, build a ritual',
    kicker: 'Signal 01',
    body: [
      `The concept starts with a question most people have never thought to ask: what if you could rent a theater room at AMC or Regal for your own group? Not for a premiere. Not for a corporate event. Just for you and your friends on a random Tuesday night, watching whatever movie you want, in a private room with nobody else around.`,
      `Theaters have slow nights. They have empty rooms sitting dark while the projectors cool. An event-driven rental model turns dead inventory into revenue for the theater and a private cinema experience for the group. The theater wins. The group wins. And if it happens on a regular basis, it stops being a one-off hangout and becomes a ritual that people build their week around.`,
    ],
    quote: 'Tuesday night Shrek with friends is more valuable than any blockbuster premiere alone.',
  },
  {
    id: 'cheeriocracy',
    label: 'Cheeriocracy: voting as a micro-game',
    kicker: 'Signal 02',
    body: [
      `Choosing the movie is half the fun. Cheeriocracy is the process: everyone nominates a film, the group votes, and the most popular pick wins. It sounds like basic democracy, but in practice it becomes a game all on its own. People campaign for their movie. They pitch it to the group chat. They make their case with trailers and one-liners. They lobby friends to join their side.`,
      `By the time the vote is settled, the group has already bonded over the debate. The person whose pick lost is already plotting their campaign for next week. The process turns what could be an annoying logistical detail into a source of anticipation and inside jokes that carry over from session to session.`,
    ],
    note: 'The vote itself becomes a bonding moment. People campaign for their pick, make cases, and laugh about the outcome before the movie even starts.',
  },
  {
    id: 'the-revenue-model',
    label: 'Tips and NFC cover the tab',
    kicker: 'Signal 03',
    body: [
      <>
        The same tip-based revenue model from{' '}
        {blogLink('byohp', 'BYOHP')} applies here. NFC cards and QR codes are
        set up at the entrance or passed around before the movie starts.
        Everyone contributes what they can toward the theater rental. No fixed
        ticket price. No one is priced out. The group absorbs the cost
        together.
      </>,
      `This works because the ask is small and the value is obvious. People just watched a movie they voted for, in a private room, surrounded by friends. Tapping a phone to chip in five or ten dollars feels natural, not transactional. And for the people who want to give more, the option is right there.`,
    ],
    list: [
      'No one is priced out by a fixed ticket.',
      'Everyone contributes what they can.',
      'The group absorbs the cost together.',
    ],
  },
  {
    id: 'why-it-works',
    label: 'Why Tuesday-night Shrek matters',
    kicker: 'Signal 04',
    body: [
      `Shared stories become shared language. When a group of people watches the same movie together, they walk away with references that belong to them. Not references borrowed from the internet or recycled from a trending topic. References that carry the memory of who laughed the hardest, who cried first, and who would not stop quoting lines in the parking lot afterward.`,
      `That shared language is the raw material of community. It gives people something to talk about that is theirs. It creates inside jokes that outlast the evening. And when the same group keeps showing up week after week, the library of shared references grows into something that feels like a culture. A small, local, deeply personal culture that no algorithm can replicate.`,
      `The movie is the excuse. The community is the point. And the more often it happens, the stronger it gets. Frequency is what turns a group of people who like the same things into a group of people who genuinely care about each other.`,
    ],
    quote: 'Shared stories become shared language, and shared language becomes real community.',
  },
] as const

function MovieEventsArticle() {
  return (
    <BlogArticleLayout post={movieEventsSummary}>
      {articleSections.map((section) => (
        <ManualArticleSection key={section.id} section={section} />
      ))}
    </BlogArticleLayout>
  )
}

export const movieEventsDocument: ComponentBlogPostDocument = {
  ...movieEventsSummary,
  kind: 'component',
  Component: MovieEventsArticle,
}
