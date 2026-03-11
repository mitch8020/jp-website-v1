import type { ReactNode } from 'react'
import BlogArticleLayout from '../BlogArticleLayout'
import type { ComponentBlogPostDocument } from '../blog-types'
import { cx, styles } from '../../../lib/style-primitives'
import { cityBuilderSummary } from '../manual-post-summaries'

const link = (href: string, text: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
)

const hundredDevs = link('https://100devs.org/', '100 Devs')
const ivStudio = link('https://shop.iv.studio/', 'IV Studio')

type ArticleSection = {
  id: string
  label: string
  kicker: string
  body: ReactNode[]
  quote?: string
  list?: ReactNode[]
  note?: ReactNode
}

const articleSections: ArticleSection[] = [
  {
    id: 'games-that-work',
    label: 'What if a video game was actually professional software?',
    kicker: 'Signal 01',
    body: [
      `There is a category of software that nobody has built yet: video games that feel like games but actually do professional work. Construction, logistics, city planning. The interface looks like entertainment. The output looks like a deliverable.`,
      `The idea is not gamification, which usually means sprinkling points and badges on top of something boring. The idea is that the game itself produces real value. When someone designs a city layout inside the game, that layout contains real data about traffic flow, land use, accessibility, and equity. The game is the tool. The play is the work.`,
      `If the experience is genuinely fun, people will do it voluntarily. And if enough people do it voluntarily, the aggregate data becomes more valuable than anything a single firm could produce on its own.`,
    ],
    quote: 'The game is the tool. The play is the work.',
  },
  {
    id: 'crowdsourced-planning',
    label: 'Crowdsourcing city design through play',
    kicker: 'Signal 02',
    body: [
      `Imagine connecting real city skyline data into a city builder game and adding a voting system where players compete to design the best version of their own city. Most efficient traffic. Most accessible layout. Most equitable distribution of resources. The metrics are real. The analysis is real. The designs are iterative and crowd-tested before a professional ever sees them.`,
      `Voting would be restricted to people who actually live in the city. Register with a driver's license or equivalent identity verification. The designs are not theoretical exercises from outsiders. They are proposals from residents who walk those streets, sit in that traffic, and use those parks. Public commenters post into a forum and their comments appear within the game as actual feedback from actual people.`,
      `There is a real tension around identity verification. Requiring a driver's license can be a turn-off for some people, and that is worth solving carefully. A crypto-based voting system is one possible path that balances verification with accessibility. The point is not to pick the perfect mechanism today. The point is that the principle of local, verified participation is worth defending.`,
    ],
    list: [
      'Traffic flow analysis from real player decisions.',
      'Crowd management and land-use patterns at scale.',
      'Public comment forums embedded directly in the game world.',
    ],
  },
  {
    id: 'revenue-model',
    label: 'Players play cheap, professionals pay for data',
    kicker: 'Signal 03',
    body: [
      `The goal is to make the game practically free for anyone to play. Ten dollars per player, maybe less. The price is not dictated by the need to charge the consumer. The value is driven by the actual use that city planning departments all over the world derive from the data.`,
      `As people play, the game gathers data. Not data about the people themselves, but data about how they are playing: what designs they create, what trade-offs they make, what patterns emerge at scale. That data becomes the product. The long-term customers are the actual professionals, the city planning departments, the urban design firms, the municipal governments that find genuine value in crowd-tested designs.`,
      `Those professional customers subsidize the cost of the game for everyone else. No ads. No predatory monetization. The revenue model is built on the idea that crowdsourcing design work is a fundamental shift in how cities get planned, and there is a very real path to making the version of a plan that an actual professional sees for the first time something that is already somewhat usable for their day-to-day work.`,
    ],
    quote: 'The price of the game is not dictated by our need to charge the consumer. The value is driven by the actual use that cities derive from it.',
  },
  {
    id: 'taliho-to-games',
    label: 'From SaaS to game studio: a real-world path',
    kicker: 'Signal 04',
    body: [
      `This is not a fantasy. There is a concrete path from where Taliho is today to a game development company. Taliho already builds software engines for construction companies. That is the foundation. The next layer is people.`,
      <>{hundredDevs} provides free training for people who want to learn software engineering. Taliho gives {hundredDevs} graduates the repeatable, actionable knowledge on how to leverage modern AI tools to their benefit, for free. Taliho hires those graduates and dedicates one software engineer per company as an in-house developer paid by Taliho. That engineer handles all software development, maintenance, tool integrations, and automation for that one company as a premium service.</>,
      `From that profitable base, Taliho finds software engineers on the team who want to be game developers and starts investing in game development skills. The transition is organic. The funding comes from existing revenue. The talent pipeline is already built.`,
    ],
    list: [
      'Taliho builds the SaaS engine for construction.',
      <>{hundredDevs} provides the talent pipeline for free.</>,
      'Dedicated engineers per company generate premium revenue.',
      'Game-passionate engineers transition into game development.',
    ],
  },
  {
    id: 'start-small',
    label: 'Playground first, city planner last',
    kicker: 'Signal 05',
    body: [
      `The city planner simulator is the destination, not the starting point. The path there goes through smaller, more manageable games that each teach the team how to build better.`,
      `Step one is a Playground Design Simulator or City Park Design Simulator. Find real-world playground designers and city park designers. Get their feedback on what makes software genuinely useful for their professional work. The twist is that the "software" is actually a video game. Iterate on what makes a great game in general while solving a real professional need.`,
      `Step two is a Bridge Design Simulator. More complex engineering, more variables, more data. Take the lessons from the first game, apply them, and repeat the process. Step three is the City Planner Simulator: the full vision with traffic, utilities, weather, zoning, and every variable that makes city planning genuinely hard. Easy mode reduces variables for accessibility. Hard mode is the real thing.`,
    ],
    note: <>{ivStudio}, a board game company, helps validate what makes a good game, how to run a solid Kickstarter, and how to market effectively.</>,
  },
  {
    id: 'kickstarter-and-community',
    label: 'Marketing, Kickstarter, and building in public',
    kicker: 'Signal 06',
    body: [
      `Before writing a single line of game code, there is a marketing website. The website communicates the grand vision: what the City Planner Simulator will eventually become, why it matters, and how people can be part of making it happen. Vision first, then funding, then building.`,
      <>A Kickstarter page gathers the funds to develop the first game. The city itself could fund game development. The community that benefits from the tool helps pay for its creation. The developers building the game are {hundredDevs} graduates and Taliho software engineers who are already paid and already trained.</>,
      `Each game release feeds the next one. What worked gets amplified. What did not work gets cut. The iteration cycle that makes software development powerful gets applied to game development with the same discipline. Playground Simulator ships. Bridge Simulator ships. City Planner Simulator ships. Each one better than the last because each one was built on real lessons, real feedback, and real professional use.`,
    ],
    quote: 'Vision first, then funding, then building. Each game ships better than the last because each one is built on real lessons.',
  },
]

function CityBuilderArticle() {
  return (
    <BlogArticleLayout post={cityBuilderSummary}>
      {articleSections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-28">
          <p className={cx(styles.signalLabel, 'mb-3')}>{section.kicker}</p>
          <h2>{section.label}</h2>

          {section.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          {'quote' in section ? <blockquote>{section.quote}</blockquote> : null}

          {section.list ? (
            <ul>
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
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

export const cityBuilderDocument: ComponentBlogPostDocument = {
  ...cityBuilderSummary,
  kind: 'component',
  Component: CityBuilderArticle,
}
