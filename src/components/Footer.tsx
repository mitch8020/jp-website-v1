import { Link } from '@tanstack/react-router'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:items-end sm:text-left">
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
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/blog" className="nav-link">
            Blog
          </Link>
        </div>
      </div>
      <div className="page-wrap mt-5">
        <p className="island-kicker m-0 text-center sm:text-left">
          &copy; {year} JP. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
