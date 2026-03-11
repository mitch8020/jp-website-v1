import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
} from 'react'
import type { ReactElement, ReactNode } from 'react'
import { createSectionLinkDeduper } from './section-link-dedupe.js'

type LinkLikeElementProps = {
  href?: unknown
  children?: ReactNode
}

function dedupeSectionLinkNodeWithTracker(
  node: ReactNode,
  tracker: ReturnType<typeof createSectionLinkDeduper>,
): ReactNode {
  if (
    node == null ||
    typeof node === 'string' ||
    typeof node === 'number' ||
    typeof node === 'boolean'
  ) {
    return node
  }

  if (!isValidElement(node)) {
    return node
  }

  const element = node as ReactElement<LinkLikeElementProps>
  const nextChildren =
    element.props.children === undefined
      ? element.props.children
      : Children.map(element.props.children, (child) =>
          dedupeSectionLinkNodeWithTracker(child, tracker),
        )

  if (typeof element.type === 'string' && element.type === 'a') {
    const href =
      typeof element.props.href === 'string' ? element.props.href : undefined

    if (href && !tracker.shouldKeepHref(href)) {
      return <Fragment>{nextChildren}</Fragment>
    }
  }

  return cloneElement(element, undefined, nextChildren)
}

export function createSectionLinkReactDeduper() {
  const tracker = createSectionLinkDeduper()

  return {
    dedupeNode(node: ReactNode) {
      return dedupeSectionLinkNodeWithTracker(node, tracker)
    },
  }
}
