import type { CSSProperties } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  FolderOpen,
  Lightbulb,
  MessageCircle,
  Sparkles,
  ThumbsUp,
  Users,
} from 'lucide-react'
import { cx, styles } from '../lib/style-primitives'

export const Route = createFileRoute('/')({ component: App })

const techStack = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'React',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Git',
  'GitHub',
  'Docker',
  'AWS',
  'Netlify',
  'Hostinger',
  'Anthropic AI Models',
  'OpenAI AI Models',
  'OpenClaw',
]

const taglines = [
  'Automation Engineer',
  'AI Integrations Consultant',
  'Web Application Developer',
  'Marketing Website Developer',
  'Personal Website Developer',
]

const skills = [
  {
    icon: FolderOpen,
    title: 'Effective Organization\n& Attention to Detail',
    description:
      'Led many initiatives to write documentation and SOPs in my departments to maintain consistency and quality assurance in production.',
  },
  {
    icon: MessageCircle,
    title: 'Team Oriented\nCommunication',
    description:
      'Always aim to keep everyone in my team well-informed on key items to make sure the project starts and completes as smoothly as possible.',
  },
  {
    icon: ThumbsUp,
    title: 'Customer Service\n& Client Satisfaction',
    description:
      'Guaranteed to update my clients on a regular basis to maintain cooperative customer relationships and sustain a reliable company image.',
  },
] as const

const carouselWrapClass =
  'mb-4 overflow-x-hidden overflow-y-visible rounded-xl [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]'
const carouselTrackClass =
  'flex w-max gap-2 [animation:carousel-scroll_var(--carousel-duration,30s)_linear_infinite] hover:[animation-play-state:paused]'
const carouselReverseTrackClass = '[animation-name:carousel-scroll-reverse]'
const carouselPillClass =
  'w-fit shrink-0 whitespace-nowrap text-sm max-sm:!w-fit'

function App() {
  return (
    <main className={cx(styles.pageWrap, 'px-4 pb-8 pt-14')}>
      <section
        className={cx(
          styles.islandShell,
          styles.riseIn,
          'relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14',
        )}
      >
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <img
            src="/images/MitraJP-Square-Center.jpg"
            alt="JP Mitra"
            className="h-36 w-36 flex-shrink-0 rounded-2xl object-cover shadow-lg sm:h-40 sm:w-40"
          />

          <div>
            <h1
              className={cx(
                styles.displayTitle,
                'mb-4 text-4xl font-bold leading-[1.05] text-[var(--sea-ink)] sm:text-5xl',
              )}
            >
              Hi. I'm <strong>JP Mitra</strong>.
            </h1>
            <p className="mb-2 max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)]">
              I am a{' '}
              <strong className="text-[var(--sea-ink)]">
                Software Engineer
              </strong>{' '}
              with a concentration in{' '}
              <strong className="text-[var(--sea-ink)]">
                Full-Stack Web Development
              </strong>
              .
            </p>
            <p className="mb-6 max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)]">
              My background is in the{' '}
              <strong className="text-[var(--sea-ink)]">
                Construction Industry
              </strong>{' '}
              specializing in{' '}
              <strong className="text-[var(--sea-ink)]">
                Project Management
              </strong>
              ,{' '}
              <strong className="text-[var(--sea-ink)]">
                Business Administration
              </strong>
              , and{' '}
              <strong className="text-[var(--sea-ink)]">Estimating</strong>.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/about"
                className={cx(
                  styles.siteControlPill,
                  styles.siteControlPillAccent,
                )}
              >
                About Me
              </Link>
              <a
                href="#skills"
                className={cx(
                  styles.siteControlPill,
                  styles.siteControlPillSoft,
                )}
              >
                My Skills
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className={cx(
          styles.islandShell,
          styles.riseIn,
          'mt-8 rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14',
        )}
        style={{ animationDelay: '80ms' }}
      >
        <p className={cx(styles.islandKicker, 'mb-3')}>Skills</p>
        <h2
          className={cx(
            styles.displayTitle,
            'mb-4 text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl',
          )}
        >
          Here are my skill sets
        </h2>
        <p className="mb-6 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          With a strong technical adaptivity and a persevering attitude, I am
          confident in my ability to tackle any programming challenge thrown my
          way. From doing daily coding challenges to creating custom enterprise
          software, I take every coding project as a learning opportunity to
          gain insightful experience and become a better programmer for my
          future work.
        </p>

        <div className={carouselWrapClass}>
          <div
            className={cx(carouselTrackClass, carouselReverseTrackClass)}
            style={{ '--carousel-duration': '35s' } as CSSProperties}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className={cx(
                  styles.siteControlPill,
                  styles.siteControlPillSoft,
                  carouselPillClass,
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 overflow-x-hidden overflow-y-visible rounded-xl [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div
            className={carouselTrackClass}
            style={{ '--carousel-duration': '28s' } as CSSProperties}
          >
            {[...taglines, ...taglines].map((tagline, i) => (
              <span
                key={`${tagline}-${i}`}
                className={cx(
                  styles.siteControlPill,
                  styles.siteControlPillAccent,
                  carouselPillClass,
                )}
              >
                {tagline}
              </span>
            ))}
          </div>
        </div>

        <p className="mb-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          Through <strong className="text-[var(--sea-ink)]">years</strong> of
          professional experience, I have developed my skills to focus on{' '}
          <strong className="text-[var(--sea-ink)]">
            efficient operations
          </strong>
          ,{' '}
          <strong className="text-[var(--sea-ink)]">
            open-door communication
          </strong>
          , and{' '}
          <strong className="text-[var(--sea-ink)]">client satisfaction</strong>
          .
        </p>

        <Link
          to="/about"
          className={cx(
            styles.siteControlPill,
            styles.siteControlPillSoft,
            'mt-6 text-sm',
          )}
        >
          Learn More
        </Link>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {skills.map(({ icon: Icon, title, description }, index) => (
          <article
            key={title}
            className={cx(styles.featureCard, styles.riseIn, 'rounded-2xl p-5')}
            style={{ animationDelay: `${index * 90 + 170}ms` }}
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--lagoon)_18%,var(--surface-strong))]">
              <Icon size={20} className="text-[var(--lagoon-deep)]" />
            </div>
            <h3 className="mb-2 whitespace-pre-line text-base font-semibold text-[var(--sea-ink)]">
              {title}
            </h3>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {description}
            </p>
          </article>
        ))}
      </section>

      <section
        className={cx(
          styles.islandShell,
          styles.riseIn,
          'relative mt-8 overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14',
        )}
        style={{ animationDelay: '440ms' }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.24),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.14),transparent_66%)]" />

        <p className={cx(styles.islandKicker, 'mb-3')}>Vision</p>
        <h2
          className={cx(
            styles.displayTitle,
            'mb-4 max-w-2xl text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl',
          )}
        >
          Equity-driven development
        </h2>
        <p className="mb-8 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          I believe technology should serve human connection, not replace it. AI
          makes it dramatically cheaper to explore ideas - the harder and more
          important work is deciding which futures deserve more attention, more
          craft, and more human care. I build with the conviction that better
          worlds start by making better forms of play, curation, and
          cooperation.
        </p>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: 'Curation over abundance',
              text: 'As content becomes cheap to produce, the real value shifts to the people and systems that can surface what is genuinely worth attention.',
            },
            {
              icon: Users,
              title: 'Meet people where they are',
              text: 'The best automation enters tools people already use and extends behaviors they already enjoy - no forced upskilling, no new identities required.',
            },
            {
              icon: Lightbulb,
              title: 'Play teaches faster than obligation',
              text: 'Games, media, and shared events can teach language, strategy, and empathy through momentum. Equity starts with patience - everyone gets there on their own schedule.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--lagoon)_18%,var(--surface-strong))]">
                <Icon size={18} className="text-[var(--lagoon-deep)]" />
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--sea-ink)]">
                  {title}
                </h3>
                <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/blog/$slug"
          params={{ slug: 'futures-worth-playing-for' }}
          className={cx(
            styles.siteControlPill,
            styles.siteControlPillSoft,
            'text-sm',
          )}
        >
          Read the full manifesto
        </Link>
      </section>
    </main>
  )
}
