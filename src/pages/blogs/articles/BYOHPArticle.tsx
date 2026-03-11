import BlogArticleLayout from '../BlogArticleLayout'
import type { ComponentBlogPostDocument } from '../blog-types'
import { byohpSummary } from '../manual-post-summaries'
import { ManualArticleSection } from './ManualArticleSection'
import { blogLink } from './blogLink'

const articleSections = [
  {
    id: 'the-format',
    label: 'The format: silent disco, zero cover',
    kicker: 'Signal 01',
    body: [
      `The idea is disarmingly simple. A DJ streams a live set through MixCloud. Everyone in the crowd brings their own headphones. There is no massive speaker rig to rent, no noise complaints to worry about, and no cover charge at the door. The only equipment the DJ needs is a deck, a laptop, and a couple of cables.`,
      `Because every listener controls their own volume, the experience becomes personal in a way that a traditional club set never can. Someone who wants it loud gets it loud. Someone who wants background energy while they talk to a friend gets that too. The format respects people instead of overwhelming them.`,
      `The events are free. That is not a loss leader or a marketing stunt. It is the entire point. Free removes the one barrier that stops most people from showing up: the question of whether the night is worth the price. When the answer is always yes, the crowd diversifies and the energy compounds.`,
    ],
    quote: 'The best events remove every reason not to show up.',
  },
  {
    id: 'the-revenue-model',
    label: 'Tips fund three causes at once',
    kicker: 'Signal 02',
    body: [
      `Revenue comes from tips, not tickets. A highly visible station near the door accepts contributions through Venmo, Cash App, and physical NFC tags that anyone can tap with their phone. The friction is almost zero: see a sign, tap your phone, move on.`,
      `Every dollar that comes in splits across three priorities. The DJ gets paid for their craft. A therapy nonprofit receives direct funding. And the organizer takes a share that keeps the operation sustainable. No one extracts from anyone else because the whole system runs on voluntary generosity.`,
      `The beauty of this model is that it scales with enthusiasm. A night where the DJ is on fire naturally generates more tips. A cause that resonates with the crowd draws more support. The revenue is a direct signal of how much value the event actually created.`,
    ],
    list: [
      'The DJ gets paid for their craft.',
      'A therapy nonprofit receives direct funding.',
      'The organizer sustains the operation.',
    ],
  },
  {
    id: 'location-as-activism',
    label: 'Location as quiet activism',
    kicker: 'Signal 03',
    body: [
      `Where you throw the party matters as much as how you throw it. The philosophy is deliberate: plan events around areas and businesses that need the most help. A taco truck with incredible food but not enough foot traffic. A food stand in a neighborhood that does not get the attention it deserves. A venue like Primitive that wants to experiment with new energy.`,
      `When people show up for the music, they naturally buy food and drinks from whatever is nearby. The event becomes economic infrastructure for the surrounding community without anyone having to lecture about supporting local business. The behavior just happens because the environment makes it easy.`,
      `This is activism that does not feel like activism. It feels like a party. And that is exactly why it works. People do not resist having a good time. They resist being told what to care about. Give them a reason to show up and the caring follows.`,
    ],
    quote: 'Every attendee becomes a potential customer for the taco truck next door.',
  },
  {
    id: 'nfc-and-vr',
    label: 'NFC tags, VR headsets, and new touch points',
    kicker: 'Signal 04',
    body: [
      `NFC tags turn generosity into a tactile moment. Instead of fumbling with an app or waiting in line, someone taps their phone against a card and the payment is done. Each tag maps to a different cause: one for the DJ, one for the nonprofit, one for the organizer. The sign by the door makes the options obvious and the action effortless.`,
      `VR headsets add another dimension. They are available for free, but a gentle nudge encourages donations from anyone who uses them. It is a bonus experience layered on top of the core event, and it creates yet another touch point where value flows from the crowd to the people providing the experience. The NFC tags themselves can also be sold as merch, creating a secondary revenue stream while putting payment infrastructure directly in people's hands.`,
    ],
    note: 'Selling NFC tags as merch creates a secondary revenue stream while putting payment infrastructure directly in people\'s hands.',
  },
  {
    id: 'the-long-game',
    label: 'The long game: a full-time DJ salary',
    kicker: 'Signal 05',
    body: [
      `The immediate goal is to run the experiment. See if the format works. See if tips actually flow. See if the community shows up consistently. But the long-term dream is much bigger: hire a DJ full-time, pay them a living salary of seventy thousand dollars or more, and have them play at events organized all over Nashville and beyond.`,
      `That sounds ambitious, but the math is not impossible if the events happen frequently enough and the community grows. Weekly sessions, multiple organizers, different DJs rotating through the format. The model does not depend on a single person. It depends on a system that anyone can replicate.`,
      <>
        The same community-first logic can branch into{' '}
        {blogLink('movie-events', 'Movie Events')} or{' '}
        {blogLink('game-nights', 'Game Nights')} without losing the core idea.
        Music is just one doorway into the larger system.
      </>,
      `The most important thing is that the DJ never overworks themselves. If weekly is too much, the cadence adjusts. The point is sustainability, not burnout. Creative ways to fund the artist, whether through sponsorship, direct payment, or community tips, all stay on the table. The format is the vehicle. The destination is a world where more artists can make a living doing what they love.`,
    ],
    quote: 'If the community shows up consistently, the artist deserves a living wage.',
  },
] as const

function BYOHPArticle() {
  return (
    <BlogArticleLayout post={byohpSummary}>
      {articleSections.map((section) => (
        <ManualArticleSection key={section.id} section={section} />
      ))}
    </BlogArticleLayout>
  )
}

export const byohpDocument: ComponentBlogPostDocument = {
  ...byohpSummary,
  kind: 'component',
  Component: BYOHPArticle,
}
