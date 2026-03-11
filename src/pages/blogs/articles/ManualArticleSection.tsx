import type { ReactNode } from 'react'
import { cx, styles } from '../../../lib/style-primitives'
import { createSectionLinkReactDeduper } from '../section-link-dedupe-react'

export type ManualArticleSectionData = {
  id: string
  label: string
  kicker: string
  body: readonly ReactNode[]
  quote?: ReactNode
  list?: readonly ReactNode[]
  note?: ReactNode
}

export function ManualArticleSection({
  section,
}: {
  section: ManualArticleSectionData
}) {
  const deduper = createSectionLinkReactDeduper()

  return (
    <section id={section.id} className="scroll-mt-28">
      <p className={cx(styles.signalLabel, 'mb-3')}>{section.kicker}</p>
      <h2>{section.label}</h2>

      {section.body.map((paragraph, index) => (
        <p key={index}>{deduper.dedupeNode(paragraph)}</p>
      ))}

      {section.quote ? <blockquote>{deduper.dedupeNode(section.quote)}</blockquote> : null}

      {section.list ? (
        <ul>
          {section.list.map((item, index) => (
            <li key={index}>{deduper.dedupeNode(item)}</li>
          ))}
        </ul>
      ) : null}

      {section.note ? (
        <div className={styles.signalInlineNote}>
          <p className={cx(styles.signalLabel, 'mb-2')}>Applied example</p>
          <p className="m-0 text-base leading-8 text-[var(--signal-ink-soft)]">
            {deduper.dedupeNode(section.note)}
          </p>
        </div>
      ) : null}
    </section>
  )
}

export function RawThoughtsSection({
  thoughts,
  id = 'raw-thoughts',
}: {
  thoughts: readonly ReactNode[]
  id?: string
}) {
  const deduper = createSectionLinkReactDeduper()

  return (
    <section id={id} className="scroll-mt-28">
      <ul>
        {thoughts.map((thought, index) => (
          <li key={index}>{deduper.dedupeNode(thought)}</li>
        ))}
      </ul>
    </section>
  )
}
