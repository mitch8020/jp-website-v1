import type { BlogPostSummary } from './blog-types'

export const futuresWorthPlayingForSummary = {
  slug: 'futures-worth-playing-for',
  title: 'Futures Worth Playing For',
  summary:
    'AI makes it dramatically cheaper to explore ideas. The harder and more important work is deciding which futures deserve more attention, more craft, and more human care.',
  teaser:
    'A manifesto about iteration, curation, games, language, automation, and why better worlds often start by making better forms of play.',
  publishedAt: '2026-03-08',
  publishedLabel: 'March 8, 2026',
  readTime: '8 min read',
  category: 'Manifesto',
  tags: ['Curation', 'Play', 'Automation', 'Media', 'Systems'],
  preview:
    'Our brains are still the best place to start. We imagine impossible futures before we can prove them, and that creative leap matters. AI does not replace that leap. It compresses the time between "what if" and the next useful draft.',
  quote:
    "If content is cheap, the people who matter most are the ones who can recognize what is actually worth someone's time.",
  stats: [
    {
      label: 'Read',
      value: '8 minutes',
    },
    {
      label: 'Mode',
      value: 'Manifesto essay',
    },
    {
      label: 'Thread',
      value: 'Curation over abundance',
    },
  ],
  signals: [
    {
      title: 'Curation becomes infrastructure',
      text: 'Abundant creation raises the value of the people and systems that can surface what is actually worth attention.',
    },
    {
      title: 'Automation should feel native',
      text: 'The best future tools extend familiar workflows instead of forcing people into identities they never asked for.',
    },
    {
      title: 'Events generate real connection',
      text: 'Shared moments lead to conversation, and conversation is still one of the strongest engines for care and cooperation.',
    },
    {
      title: 'Play is a learning engine',
      text: 'Games, shows, and repeatable rituals can teach language, strategy, and empathy faster than intimidation can.',
    },
  ],
  sectionLinks: [
    {
      id: 'dream-first',
      label: 'Dream first, then defend the next step',
    },
    {
      id: 'curation-is-the-craft',
      label: 'In abundance, curation becomes the real craft',
    },
    {
      id: 'tools-people-love',
      label: 'Meet people inside the tools they already love',
    },
    {
      id: 'events-create-care',
      label: 'Events create conversation, and conversation creates care',
    },
    {
      id: 'play-teaches',
      label: 'Play can teach faster than obligation',
    },
    {
      id: 'iterate-cheaply',
      label: 'Iteration changes the economics of progress',
    },
  ],
  source: 'manual',
  commentCount: 0,
} satisfies BlogPostSummary

export const rawThoughtsSummary = {
  slug: 'futures-worth-playing-for-raw',
  title: 'Futures Worth Playing For * [RAW THOUGHTS]',
  summary:
    'Unfiltered notes on AI, curation, play, automation, crypto, events, language learning, and building futures worth living in.',
  teaser:
    'Raw, unedited stream of consciousness on the forces shaping how we create, connect, and play.',
  publishedAt: '2026-03-08',
  publishedLabel: 'March 8, 2026',
  readTime: '6 min read',
  category: 'Raw Thoughts',
  tags: ['AI', 'Curation', 'Play', 'Crypto', 'Events', 'Language'],
  quote:
    "Content is now cheap so it's up to the people who can make really good quality to curate what people should see.",
  stats: [
    {
      label: 'Read',
      value: '6 minutes',
    },
    {
      label: 'Mode',
      value: 'Raw notes',
    },
    {
      label: 'Thread',
      value: 'Unfiltered conviction',
    },
  ],
  signals: [
    {
      title: 'AI accelerates ideation',
      text: 'Our brains dream up futures; AI helps iterate on those ideas faster than ever before.',
    },
    {
      title: 'Curation over creation',
      text: 'When content is cheap, the real value is in curating and surfacing what matters most.',
    },
    {
      title: 'Play as a learning engine',
      text: 'Games and media teach us about ourselves and others in ways that feel like entertainment.',
    },
    {
      title: 'Events drive connection',
      text: 'Real world events spark conversations that lead to genuine human connections and care.',
    },
  ],
  sectionLinks: [
    {
      id: 'raw-thoughts',
      label: 'Raw thoughts',
    },
  ],
  source: 'manual',
  commentCount: 0,
} satisfies BlogPostSummary

export const manualPostSummaries = [
  rawThoughtsSummary,
  futuresWorthPlayingForSummary,
] satisfies BlogPostSummary[]
