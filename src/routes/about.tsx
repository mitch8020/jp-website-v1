import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Download,
  Github,
  Linkedin,
  MapPin,
  Puzzle,
  Workflow,
} from 'lucide-react'
import { cx, styles } from '../lib/style-primitives'

export const Route = createFileRoute('/about')({
  component: AboutRoute,
  head: () => ({
    meta: [
      {
        title: 'About | JP Personal Website',
      },
      {
        name: 'description',
        content:
          'About JP Mitra, a software engineer in Nashville with a background in construction, operations, and workflow automation.',
      },
    ],
  }),
})

const focusPoints = [
  {
    icon: Workflow,
    title: 'Operations-minded software engineering',
    text: "I've always been an advocate for automated systems and efficient workflows that help teams complete their work as smoothly as possible.",
  },
  {
    icon: BriefcaseBusiness,
    title: 'Cross-functional perspective',
    text: 'Estimator, project administrator, recruiter, and project manager are all part of the context I bring into the products I design.',
  },
  {
    icon: Puzzle,
    title: 'Specific systems for specific teams',
    text: 'I like building software around the actual stressors a company is facing instead of forcing generic tools onto specialized work.',
  },
] as const

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/johnestofpauls/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://github.com/mitch8020',
    label: 'GitHub',
    icon: Github,
  },
] as const

function AboutRoute() {
  return (
    <main className={cx(styles.pageWrap, 'px-4 pb-16 pt-8 sm:pb-20 sm:pt-12')}>
      <section
        className={cx(
          styles.islandShell,
          styles.riseIn,
          'relative overflow-hidden rounded-[2rem] px-6 py-6 sm:px-8 sm:py-8',
        )}
      >
        <div className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.28),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative z-10">
            <p className={cx(styles.islandKicker, 'mb-2')}>About Me</p>
            <h1
              className={cx(
                styles.displayTitle,
                'max-w-4xl text-[clamp(2rem,4vw,3.2rem)] text-[var(--sea-ink)]',
              )}
            >
              Software engineering with a construction and operations
              background.
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[var(--sea-ink-soft)]">
              <span
                className={cx(
                  styles.siteControlPill,
                  styles.siteControlPillSoft,
                  'text-xs',
                )}
              >
                Software Engineer
              </span>
              <span
                className={cx(
                  styles.siteControlPill,
                  styles.siteControlPillSoft,
                  'text-xs',
                )}
              >
                Construction Background
              </span>
              <span
                className={cx(
                  styles.siteControlPill,
                  styles.siteControlPillOutline,
                  'text-xs',
                )}
              >
                <MapPin size={15} />
                Nashville, TN
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base sm:leading-8">
              I'm a software engineer with a background in construction based in
              Nashville, TN.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base sm:leading-8">
              Transitioning through multiple roles from{' '}
              <strong className="text-[var(--sea-ink)]">estimator</strong> to{' '}
              <strong className="text-[var(--sea-ink)]">
                project administrator
              </strong>{' '}
              to <strong className="text-[var(--sea-ink)]">recruiter</strong> to{' '}
              <strong className="text-[var(--sea-ink)]">project manager</strong>
              , I've always been an advocate for automated systems and efficient
              workflows to help the people I work with complete their tasks as
              smoothly as possible. Knowing the key stressors among the
              different departments that I've worked with,{' '}
              <strong className="text-[var(--sea-ink)]">
                I took it upon myself to design and create enterprise software
                that caters to the specific needs of the company
              </strong>
              .
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--sea-ink-soft)] sm:text-base sm:leading-8">
              Currently,{' '}
              <strong className="text-[var(--sea-ink)]">
                I'm building{' '}
                <a
                  href="https://www.taliho.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--lagoon-deep)] underline decoration-[color-mix(in_oklab,var(--lagoon-deep)_45%,transparent)] underline-offset-4"
                >
                  Taliho
                </a>
              </strong>
              , a construction management platform that uses NFC and QR
              technology to connect field teams with real-time project data,
              safety workflows, and tool tracking — all integrated with systems
              like Procore.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/about-assets/jp-mitra-resume-2022.pdf"
                className={cx(
                  styles.siteControlPill,
                  styles.siteControlPillAccent,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} />
                Download Resume
              </a>
              <a
                href="https://www.taliho.com/"
                className={cx(
                  styles.siteControlPill,
                  styles.siteControlPillSoft,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Taliho
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="relative z-10">
            <figure className="overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-[var(--surface-strong)] shadow-[0_22px_44px_rgba(17,32,46,0.12)]">
              <img
                src="/about-assets/jp-2022-color.jpg"
                alt="JP Mitra"
                className="block h-full w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {focusPoints.map(({ icon: Icon, title, text }, index) => (
          <article
            key={title}
            className={cx(
              styles.featureCard,
              styles.riseIn,
              'rounded-[1.7rem] p-5',
            )}
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--lagoon)_18%,var(--surface-strong))] text-[var(--lagoon-deep)]">
              <Icon size={20} />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">
              {title}
            </h2>
            <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {text}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article
          className={cx(
            styles.islandShell,
            styles.riseIn,
            'rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10',
          )}
        >
          <p className={cx(styles.islandKicker, 'mb-3')}>Outside Of Coding</p>
          <h2
            className={cx(
              styles.displayTitle,
              'text-[clamp(2.1rem,5vw,3.7rem)] text-[var(--sea-ink)]',
            )}
          >
            The personal side matters too.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
            Outside of coding, I love board games, biking, swimming, climbing,
            and anything that gets me moving or thinking competitively. I'm also
            a big food person — I'll eat anything that's put in front of me and
            love exploring the Nolensville Pike thoroughfare for new
            discoveries.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
            I have a personal desire to take alternative modes of transit for
            commuting and navigating the Nashville area, and I want to do
            everything in my power to update the city's infrastructure to fit
            the needs of the many different citizens that live in our
            communities. Right now my main side projects that I'm helping other people with are the{' '}
            <a
              href="https://south-nashville-greenways.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--lagoon-deep)] underline decoration-[color-mix(in_oklab,var(--lagoon-deep)_45%,transparent)] underline-offset-4"
            >
              South Nashville Greenways
            </a>{' '}
            and{' '}
            <a
              href="https://nashvillebikefun.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--lagoon-deep)] underline decoration-[color-mix(in_oklab,var(--lagoon-deep)_45%,transparent)] underline-offset-4"
            >
              Nashville Bike Fun
            </a>
            .
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
            I also have two cats,{' '}
            <a
              href="/about-assets/Bucket.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--lagoon-deep)] underline decoration-[color-mix(in_oklab,var(--lagoon-deep)_45%,transparent)] underline-offset-4"
            >
              Bucket
            </a>{' '}
            and{' '}
            <a
              href="/about-assets/Chico.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--lagoon-deep)] underline decoration-[color-mix(in_oklab,var(--lagoon-deep)_45%,transparent)] underline-offset-4"
            >
              Chico
            </a>
            . Here's a{' '}
            <a
              href="/about-assets/family-photo.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--lagoon-deep)] underline decoration-[color-mix(in_oklab,var(--lagoon-deep)_45%,transparent)] underline-offset-4"
            >
              Family Photo
            </a>
            .
          </p>
        </article>

        <article
          className={cx(
            styles.islandShell,
            styles.riseIn,
            'rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10',
          )}
        >
          <p className={cx(styles.islandKicker, 'mb-3')}>
            Interested In Learning More?
          </p>
          <h2
            className={cx(
              styles.displayTitle,
              'text-[clamp(2.1rem,5vw,3.5rem)] text-[var(--sea-ink)]',
            )}
          >
            Download the resume or connect with me directly.
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--sea-ink-soft)]">
            The old site paired this page with a resume download and a contact
            form. Here, the clean version is simpler: grab the resume, review
            the work, or reach out through the channels I actually use.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/about-assets/jp-mitra-resume-2022.pdf"
              className={cx(
                styles.siteControlPill,
                styles.siteControlPillAccent,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
              Download Resume
            </a>
            <Link
              to="/"
              className={cx(styles.siteControlPill, styles.siteControlPillSoft)}
            >
              View Profile
            </Link>
          </div>

          <div className="mt-6 grid gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.aboutSocialLink}
              >
                <span className="inline-flex items-center gap-2.5">
                  <Icon size={18} />
                  {label}
                </span>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}
