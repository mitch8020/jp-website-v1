import BlogArticleLayout from '../BlogArticleLayout'
import type { ComponentBlogPostDocument } from '../blog-types'
import { gameNightsSummary } from '../manual-post-summaries'
import { ManualArticleSection } from './ManualArticleSection'
import { blogLink } from './blogLink'

const articleSections = [
  {
    id: 'the-case-for-lan',
    label: 'Why LAN parties still matter',
    kicker: 'Signal 01',
    body: [
      `Online multiplayer solved the logistics of playing with other people. It did not solve the feeling. Sitting next to someone while you play a game together creates a kind of trust and energy that voice chat and Discord servers cannot replicate. You can read their body language. You can hear them laugh without a microphone compressing the sound. You can high-five after a win and share a pizza after a loss.`,
      `LAN parties were never really about the network cable. They were about the room. A room full of people who chose to show up, set up their gear, and commit to being present together for a few hours. That commitment is what makes the experience stick. And in a world that has gotten very good at making presence optional, choosing to be in the same room matters more than ever.`,
    ],
  },
  {
    id: 'the-format',
    label: 'The format: BYOC, large space, regular cadence',
    kicker: 'Signal 02',
    body: [
      `The format is deliberately low-infrastructure. Find a space with enough room and enough power outlets. Warehouses, community centers, church basements, someone's garage. The venue does not need to be fancy. It needs to be available and it needs to have electricity.`,
      `Everyone brings their own console. Switches, PlayStations, Xboxes, Steam Decks, laptops. The hardware does not matter. What matters is that people show up with something to play and a willingness to play it with other people. A few folding tables, some power strips, and a Wi-Fi connection handle the rest.`,
      <>
        In that sense, this sits right beside {blogLink('byohp', 'BYOHP')} and{' '}
        {blogLink('movie-events', 'Movie Events')}: the same low-friction
        community model, just pointed at play instead of music or film.
      </>,
    ],
    list: [
      'A large space with power outlets.',
      'People who own consoles and controllers.',
      'A regular schedule everyone can rely on.',
    ],
  },
  {
    id: 'frequency-is-the-secret',
    label: 'Frequency is the secret ingredient',
    kicker: 'Signal 03',
    body: [
      `A single game night is a good time. A recurring game night is a community. The difference is frequency. When people know that every Thursday or every other Saturday there is a place to show up and play, they start planning around it. They start inviting friends. They start looking forward to it in a way that changes the texture of their week.`,
      `The compounding effect is real. Every session builds on the last one. Inside jokes accumulate. Rivalries form and evolve. Traditions emerge without anyone planning them. Someone always brings the same snack. Someone always picks the same character. Someone always shows up late and gets roasted for it. These small, repeated patterns are the connective tissue of community.`,
    ],
    quote: 'A single event is a memory. A recurring event is a community.',
  },
  {
    id: 'community-is-the-output',
    label: 'The game is input, community is output',
    kicker: 'Signal 04',
    body: [
      `Games are one of the most effective tools for teaching communication, strategy, teamwork, and patience. They do it without anyone feeling like they are being taught. A cooperative game forces strangers to coordinate. A competitive game forces friends to handle losing gracefully. A long campaign forces a group to commit to something together over weeks or months.`,
      `The game is never really the point. The game is the invitation that gets people through the door. What happens between the rounds, during the loading screens, and in the parking lot afterward is where the real value lives. That is where people talk about their lives, share what they are working on, and offer help they would never think to offer in a more formal setting.`,
      `The barrier to entry is as low as it gets. You need a space and some power strips. Everything else, people bring themselves. The infrastructure is minimal. The community impact, if you keep showing up, is massive.`,
    ],
    note: 'Games teach communication, strategy, teamwork, and patience — all things we need more of in the world.',
  },
] as const

function GameNightsArticle() {
  return (
    <BlogArticleLayout post={gameNightsSummary}>
      {articleSections.map((section) => (
        <ManualArticleSection key={section.id} section={section} />
      ))}
    </BlogArticleLayout>
  )
}

export const gameNightsDocument: ComponentBlogPostDocument = {
  ...gameNightsSummary,
  kind: 'component',
  Component: GameNightsArticle,
}
