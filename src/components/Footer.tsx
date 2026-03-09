import { Link } from '@tanstack/react-router'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { cx, styles } from '../lib/style-primitives'

function DiscordIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.59 5.89c-1.23-.57-2.54-.99-3.92-1.23-.17.3-.37.71-.5 1.04-1.46-.22-2.91-.22-4.34 0-.14-.33-.34-.74-.51-1.04-1.38.24-2.69.66-3.92 1.23C2.18 10.12 1.39 14.23 1.79 18.29c1.65 1.21 3.24 1.95 4.81 2.44.39-.52.73-1.08 1.03-1.67-.57-.21-1.11-.47-1.62-.78.14-.1.27-.2.4-.31 3.13 1.46 6.52 1.46 9.61 0 .13.11.26.21.4.31-.51.31-1.06.57-1.62.78.3.59.64 1.15 1.03 1.67 1.57-.49 3.17-1.23 4.81-2.44.47-4.87-.78-9.09-3.24-12.4zM8.84 15.67c-1.08 0-1.97-.99-1.97-2.2s.87-2.2 1.97-2.2 1.99.99 1.97 2.2c0 1.21-.88 2.2-1.97 2.2zm6.32 0c-1.08 0-1.97-.99-1.97-2.2s.87-2.2 1.97-2.2 1.99.99 1.97 2.2c0 1.21-.87 2.2-1.97 2.2z" />
    </svg>
  )
}

const socialLinks = [
  { href: 'https://x.com/JohnestOfPauls', label: 'Twitter', icon: Twitter },
  {
    href: 'https://www.linkedin.com/in/johnestofpauls/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  { href: 'https://github.com/mitch8020', label: 'GitHub', icon: Github },
  {
    href: 'https://discord.com/users/929047382618955867',
    label: 'Discord',
    icon: DiscordIcon,
  },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div
        className={cx(
          styles.pageWrap,
          'flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:items-end sm:text-left',
        )}
      >
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
            JP Personal Website
          </p>
          <p className="mt-2 max-w-lg text-sm leading-7">
            Notes on systems, media, play, and the kinds of ideas worth
            iterating on carefully.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold sm:justify-end">
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/about" className={styles.navLink}>
            About
          </Link>
          <Link to="/blog" className={styles.navLink}>
            Blog
          </Link>
        </div>
      </div>

      <div
        className={cx(
          styles.pageWrap,
          'mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row',
        )}
      >
        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--sea-ink-soft)] transition-colors hover:text-[var(--sea-ink)]"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p className={cx(styles.islandKicker, 'm-0')}>
          &copy; {year} JP. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
