import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { cx, styles } from '../lib/style-primitives'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { to: '/' as const, label: 'Home' },
  { to: '/about' as const, label: 'About' },
  { to: '/blog' as const, label: 'Blog' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!mobileMenuOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className={cx(styles.pageWrap, 'flex items-center py-3 sm:py-4')}>
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="block h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-[color-mix(in_oklab,var(--chip-line)_45%,var(--sea-ink)_55%)] transition-opacity duration-[180ms] ease-out hover:opacity-80"
          >
            <img
              src="/profile-jp.jpg"
              alt="JP"
              className="h-full w-full object-cover"
            />
          </Link>
        </h2>

        <div className="hidden items-center gap-x-8 text-sm font-semibold sm:ml-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={styles.navLink}
              activeProps={{
                className: cx(styles.navLink, styles.navLinkActive),
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <div className="sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className={cx(
                styles.siteControlPill,
                styles.siteControlPillSoft,
                styles.headerControlPill,
              )}
            >
              <span className="relative flex h-[18px] w-[18px] items-center justify-center">
                <Menu
                  size={18}
                  strokeWidth={2.4}
                  className={cx(
                    'absolute transition-all duration-200 ease-out',
                    mobileMenuOpen
                      ? 'rotate-90 scale-0 opacity-0'
                      : 'rotate-0 scale-100 opacity-100',
                  )}
                />
                <X
                  size={18}
                  strokeWidth={2.4}
                  className={cx(
                    'absolute transition-all duration-200 ease-out',
                    mobileMenuOpen
                      ? 'rotate-0 scale-100 opacity-100'
                      : '-rotate-90 scale-0 opacity-0',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={cx(
          'grid transition-[grid-template-rows] duration-300 ease-out sm:hidden',
          mobileMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cx(
              'border-t border-[var(--line)] px-2 pb-4 pt-2 transition-opacity duration-200 ease-out',
              mobileMenuOpen ? 'opacity-100 delay-100' : 'opacity-0',
            )}
          >
            <div className={cx(styles.pageWrap, 'flex flex-col gap-1')}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cx(styles.navLink, styles.mobileNavLink)}
                  activeProps={{
                    className: cx(
                      styles.navLink,
                      styles.navLinkActive,
                      styles.mobileNavLink,
                      styles.mobileNavLinkActive,
                    ),
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
