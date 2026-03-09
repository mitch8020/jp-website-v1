import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { cx, styles } from '../lib/style-primitives'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'JP Personal Website',
      },
      {
        name: 'description',
        content:
          'JP Personal Website featuring essays, ideas, and experiments about systems, media, and play.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  notFoundComponent: RootNotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
        <Header />
        {children}
        <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function RootNotFound() {
  return (
    <main className={cx(styles.pageWrap, 'px-4 pb-16 pt-10 sm:pb-20 sm:pt-14')}>
      <section
        className={cx(
          styles.islandShell,
          styles.riseIn,
          'rounded-[2rem] px-6 py-10 text-center sm:px-10 sm:py-14',
        )}
      >
        <p className={cx(styles.islandKicker, 'mb-3')}>404</p>
        <h1
          className={cx(
            styles.displayTitle,
            'text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl',
          )}
        >
          This page is not in the archive.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)]">
          The route does not exist, was moved, or points to an article that has
          not been restored yet.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className={cx(
              styles.siteControlPill,
              styles.siteControlPillAccent,
              'w-auto',
            )}
          >
            Go Home
          </Link>
          <Link
            to="/blog"
            className={cx(
              styles.siteControlPill,
              styles.siteControlPillSoft,
              'w-auto',
            )}
          >
            Browse the Blog
          </Link>
        </div>
      </section>
    </main>
  )
}
