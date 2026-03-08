import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { RollupLog } from 'rollup'
import netlify from '@netlify/vite-plugin-tanstack-start'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const ignoredTanStackExporters = new Set([
  '@tanstack/router-core',
  '@tanstack/router-core/ssr/client',
  '@tanstack/router-core/ssr/server',
])

function shouldIgnoreTanStackBuildWarning(
  warning: RollupLog & {
    exporter?: string
    id?: string
    message?: string
  },
) {
  const matchesExporter =
    warning.exporter && ignoredTanStackExporters.has(warning.exporter)
  const matchesTanStackPackage = [warning.id, warning.message].some(
    (value) =>
      typeof value === 'string' && value.includes('node_modules/@tanstack/start-'),
  )

  return (
    warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
    matchesExporter &&
    matchesTanStackPackage
  )
}

const config = defineConfig({
  build: {
    rollupOptions: {
      onLog(level, log, handler) {
        const details = log as RollupLog & {
          exporter?: string
          id?: string
          message?: string
        }

        if (level === 'warn' && shouldIgnoreTanStackBuildWarning(details)) {
          return
        }

        handler(level, log)
      },
      onwarn(warning, warn) {
        if (shouldIgnoreTanStackBuildWarning(warning)) {
          return
        }

        warn(warning)
      },
    },
  },
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    netlify(),
    viteReact(),
  ],
})

export default config
