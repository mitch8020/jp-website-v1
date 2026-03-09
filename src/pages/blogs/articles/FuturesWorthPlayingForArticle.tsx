import BlogArticleLayout from '../BlogArticleLayout'
import type { ComponentBlogPostDocument } from '../blog-types'
import { cx, styles } from '../../../lib/style-primitives'
import { futuresWorthPlayingForSummary } from '../manual-post-summaries'

const articleSections = [
  {
    id: 'dream-first',
    label: 'Dream first, then defend the next step',
    kicker: 'Signal 01',
    body: [
      `Our brains are still the best place to start. We imagine impossible futures before we can prove them, and that creative leap matters. AI does not replace that leap. It compresses the time between "what if" and the next useful draft.`,
      `The practical way to predict the future is less mystical than people want it to be. We take the information we have right now, make the smallest defensible conclusion, then make the next one. Enough disciplined steps later, we arrive in a world that would have looked unrealistic from the beginning.`,
    ],
    quote: 'Prediction is often just imagination plus disciplined iteration.',
  },
  {
    id: 'curation-is-the-craft',
    label: 'In abundance, curation becomes the real craft',
    kicker: 'Signal 02',
    body: [
      `We are moving toward a world where anyone can create media. That means the valuable businesses will not simply be the ones that make more things. They will be the ones that help people discover the best things: the games, videos, books, teachers, tools, and communities that are genuinely worth attention.`,
      `If dollars behave like votes, then payment is one way people reward what deserves more life. As content gets cheaper to produce, taste becomes infrastructure. Curation becomes a form of public service. The winners are the people who can separate signal from noise without flattening the joy out of discovery.`,
    ],
    list: [
      'Creation becomes abundant.',
      'Attention becomes scarce.',
      'Trustworthy curation becomes decisive.',
    ],
  },
  {
    id: 'tools-people-love',
    label: 'Meet people inside the tools they already love',
    kicker: 'Signal 03',
    body: [
      `A better future is not one where everyone is forced to "upskill" into a language, workflow, or trade they never wanted. It is one where automation enters the tools people already use and extends the behaviors they already enjoy.`,
      `That same logic applies to value exchange. There is a plausible world where people use crypto networks instead of dollars for more everyday transactions, where access to ownership broadens, and where value is tied less to gatekept assets and more to what communities actually choose to sustain. If control diffuses outward, the conversation can shift from status and extraction toward what makes people feel alive, connected, and emotionally real.`,
    ],
    quote:
      'The best systems do not demand a new identity before they start helping.',
  },
  {
    id: 'events-create-care',
    label: 'Events create conversation, and conversation creates care',
    kicker: 'Signal 04',
    body: [
      `The future of culture is increasingly event-driven. Events give people a reason to talk; conversation gives people a reason to connect; and real connection makes people more likely to help each other in the physical world.`,
      `That matters because many people are exhausted by distant tragedies they cannot act on. We should push toward systems that help people solve the problems they can actually see from day to day. Hope feels believable when the feedback loop is local, visible, and shared.`,
      `If we can build worlds where people see the direct impact of their work on someone who truly needs it, happiness stops being abstract moral language. It becomes a practical outcome of better coordination.`,
    ],
  },
  {
    id: 'play-teaches',
    label: 'Play can teach faster than obligation',
    kicker: 'Signal 05',
    body: [
      `Games are one of the most underrated engines for learning because they hide the lesson inside momentum. An event inside a game can feel like entertainment while quietly rewiring how someone solves problems, reads other people, or experiments with strategy.`,
      `That is why language learning through media can work so well. Studying Japanese head-on can feel intimidating. Watching something compelling is easy. First you follow the subtitles so you can feel the story. Then you watch again. Eventually you start repeating lines under your breath, noticing sounds before meanings, and meanings before grammar. Curiosity does the rest.`,
      `The same pattern shows up everywhere. Fans learn how to discuss a show without spoiling it. New players learn how to communicate with masters of a game. People grow into new literacies through repeated play, not through shame. Equity often starts with patience: everyone gets there on their own schedule.`,
    ],
    note: 'When learning feels like a puzzle you chose, your brain keeps coming back for another round.',
  },
  {
    id: 'iterate-cheaply',
    label: 'Iteration changes the economics of progress',
    kicker: 'Signal 06',
    body: [
      `There is a long arc from war games to board games to video games, and it raises a serious question: what would it look like to design a game that helps end hunger, reduce injustice, or make cooperation irresistible? The point is not escapism. The point is to make better behavior attractive enough to rehearse.`,
      `Iteration now happens at every layer. We can test ideas at almost no cost, shape plans at a manageable cost, and only then spend heavily on implementation. A rough rule of thumb is simple: it might cost one unit to iterate on an idea, ten to iterate on planning, and a hundred to change implementation after the fact. AI dramatically improves the first layer. That should make us bolder about exploring futures and stricter about deciding which ones deserve to be built.`,
    ],
    quote:
      'Cheap iteration is not permission to ship noise. It is permission to discover better futures before they become expensive.',
  },
] as const

function FuturesWorthPlayingForArticle() {
  return (
    <BlogArticleLayout post={futuresWorthPlayingForSummary}>
      {articleSections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-28">
          <p className={cx(styles.signalLabel, 'mb-3')}>{section.kicker}</p>
          <h2>{section.label}</h2>

          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {'quote' in section ? <blockquote>{section.quote}</blockquote> : null}

          {'list' in section ? (
            <ul>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {'note' in section ? (
            <div className={styles.signalInlineNote}>
              <p className={cx(styles.signalLabel, 'mb-2')}>Applied example</p>
              <p className="m-0 text-base leading-8 text-[var(--signal-ink-soft)]">
                {section.note}
              </p>
            </div>
          ) : null}
        </section>
      ))}
    </BlogArticleLayout>
  )
}

export const futuresWorthPlayingForDocument: ComponentBlogPostDocument = {
  ...futuresWorthPlayingForSummary,
  kind: 'component',
  Component: FuturesWorthPlayingForArticle,
}
