import type { CSSProperties } from 'react'
import { cx, styles } from '../../lib/style-primitives'
import type { ArchivedComment } from './blog-types'

type ArchivedCommentsProps = {
  comments: ArchivedComment[]
}

function ArchivedCommentNode({
  comment,
  depth = 0,
}: {
  comment: ArchivedComment
  depth?: number
}) {
  return (
    <li
      className="mt-4 first:mt-0"
      style={{ '--comment-depth': depth } as CSSProperties}
    >
      <div className="[margin-left:calc(var(--comment-depth,0)*1rem)] rounded-[1.35rem] border border-[color-mix(in_oklab,var(--signal-line)_86%,white_14%)] bg-[color-mix(in_oklab,var(--signal-surface-strong)_90%,white_10%)] p-4 pb-[1.05rem] max-sm:[margin-left:calc(var(--comment-depth,0)*0.65rem)]">
        <div className="flex flex-wrap items-center gap-2 text-[0.82rem] font-bold uppercase tracking-[0.08em] text-[var(--signal-ink-soft)]">
          {comment.authorUrl ? (
            <a
              href={comment.authorUrl}
              rel="noopener noreferrer"
              className="no-underline text-[var(--signal-ink)] transition-colors duration-[180ms] ease-out hover:text-[var(--signal-orange)]"
            >
              {comment.authorName}
            </a>
          ) : (
            <span>{comment.authorName}</span>
          )}
          <span className="h-1 w-1 rounded-full bg-[var(--signal-orange)]" />
          <span>{comment.publishedLabel}</span>
        </div>

        <div
          className="archived-comment-body"
          dangerouslySetInnerHTML={{ __html: comment.contentHtml }}
        />
      </div>

      {comment.replies.length > 0 ? (
        <ol className="mt-[0.9rem] list-none pl-0">
          {comment.replies.map((reply) => (
            <ArchivedCommentNode
              key={reply.id}
              comment={reply}
              depth={depth + 1}
            />
          ))}
        </ol>
      ) : null}
    </li>
  )
}

export default function ArchivedComments({ comments }: ArchivedCommentsProps) {
  if (comments.length === 0) {
    return null
  }

  return (
    <section
      className={cx(styles.signalCard, 'mt-8 rounded-[2rem] p-6 sm:p-8')}
    >
      <p className={cx(styles.signalLabel, 'mb-3')}>Archived discussion</p>
      <h2 className="m-0 text-2xl font-semibold tracking-tight text-[var(--signal-ink)] sm:text-3xl">
        Reader comments from the original WordPress post
      </h2>
      <p className="mt-3 text-sm leading-7 text-[var(--signal-ink-soft)]">
        These replies are preserved as read-only archive material. Pingbacks and
        trackbacks were not migrated.
      </p>

      <ol className="mt-6 list-none pl-0">
        {comments.map((comment) => (
          <ArchivedCommentNode key={comment.id} comment={comment} />
        ))}
      </ol>
    </section>
  )
}
