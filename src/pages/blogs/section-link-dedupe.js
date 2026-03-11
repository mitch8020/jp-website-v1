const INTERNAL_ORIGIN = 'https://jpmitra.local'

function normalizePathname(pathname = '') {
  if (!pathname || pathname === '/') {
    return '/'
  }

  return pathname.replace(/\/+$/, '') || '/'
}

export function normalizeSectionLinkHref(href = '') {
  if (typeof href !== 'string') {
    return ''
  }

  const trimmedHref = href.trim()

  if (!trimmedHref) {
    return ''
  }

  if (
    trimmedHref.startsWith('#') ||
    trimmedHref.startsWith('mailto:') ||
    trimmedHref.startsWith('tel:')
  ) {
    return trimmedHref
  }

  try {
    const url = new URL(trimmedHref, INTERNAL_ORIGIN)
    const normalizedPathname = normalizePathname(url.pathname)

    if (url.origin === INTERNAL_ORIGIN) {
      return `${normalizedPathname}${url.search}${url.hash}`
    }

    return `${url.protocol}//${url.host}${normalizedPathname}${url.search}${url.hash}`
  } catch {
    return trimmedHref.replace(/\/+$/, '')
  }
}

export function createSectionLinkDeduper() {
  const seenDestinations = new Set()

  return {
    shouldKeepHref(href = '') {
      const normalizedHref = normalizeSectionLinkHref(href)

      if (!normalizedHref) {
        return true
      }

      if (seenDestinations.has(normalizedHref)) {
        return false
      }

      seenDestinations.add(normalizedHref)
      return true
    },
  }
}
