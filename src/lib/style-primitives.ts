type ClassValue = string | false | null | undefined

export function cx(...parts: ClassValue[]) {
  return parts.filter(Boolean).join(' ')
}

const transitionBase =
  'transition-[background-color,color,border-color,transform,box-shadow,opacity] duration-[180ms] ease-out'

export const styles = {
  pageWrap: 'mx-auto w-full max-w-[1080px]',
  riseIn: 'animate-rise-in',

  displayTitle: 'font-display',
  signalDisplay: 'font-display-alt leading-[0.96] tracking-[-0.055em]',
  islandKicker:
    'text-[0.69rem] font-bold uppercase tracking-[0.16em] text-[var(--kicker)]',
  signalLabel:
    'font-mono-alt text-[0.74rem] font-bold uppercase tracking-[0.14em] text-[var(--signal-ink-soft)]',

  islandShell: cx(
    'border border-[var(--line)]',
    'bg-[linear-gradient(165deg,var(--surface-strong),var(--surface))]',
    'shadow-[inset_0_1px_0_var(--inset-glint),0_22px_44px_rgba(30,90,72,0.1),0_6px_18px_rgba(23,58,64,0.08)]',
    'backdrop-blur-[4px]',
    transitionBase,
  ),
  featureCard: cx(
    'border border-[var(--line)]',
    'bg-[linear-gradient(165deg,color-mix(in_oklab,var(--surface-strong)_93%,white_7%),var(--surface))]',
    'shadow-[inset_0_1px_0_var(--inset-glint),0_18px_34px_rgba(30,90,72,0.1),0_4px_14px_rgba(23,58,64,0.06)]',
    'backdrop-blur-[4px]',
    'hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--lagoon-deep)_35%,var(--line))]',
    transitionBase,
  ),

  navLink: cx(
    'relative inline-flex items-center rounded-[0.8rem] no-underline text-[var(--sea-ink-soft)]',
    "after:pointer-events-none after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[linear-gradient(90deg,var(--lagoon),#7ed3bf)] after:content-[''] after:transition-transform after:duration-[170ms] after:ease-out",
    'hover:text-[var(--sea-ink)] hover:after:scale-x-100',
    'focus-visible:after:scale-x-100 max-sm:after:bottom-[-4px]',
    transitionBase,
  ),
  navLinkActive: 'text-[var(--sea-ink)] after:scale-x-100',
  mobileNavLink:
    'rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-[var(--link-bg-hover)]',
  mobileNavLinkActive:
    'bg-[color-mix(in_oklab,var(--lagoon)_12%,var(--surface-strong))] shadow-[inset_3px_0_0_var(--lagoon-deep)] after:!scale-x-0',

  siteControlPill: cx(
    'inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border-2 px-4 py-[0.78rem] text-[0.97rem] font-extrabold leading-[1.2] tracking-[0.01em] no-underline shadow-[0_10px_24px_rgba(30,90,72,0.08)] max-sm:w-full',
    'hover:-translate-y-px',
    transitionBase,
  ),
  siteControlPillSoft:
    'border-[color-mix(in_oklab,var(--chip-line)_45%,var(--sea-ink)_55%)] bg-[color-mix(in_oklab,var(--surface-strong)_86%,white_14%)] text-[var(--sea-ink)] hover:bg-[var(--link-bg-hover)]',
  siteControlPillAccent:
    'border-[color-mix(in_oklab,var(--lagoon-deep)_58%,var(--sea-ink)_42%)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--lagoon)_72%,white_28%),color-mix(in_oklab,var(--lagoon-deep)_68%,white_32%))] text-[#14353a]',
  siteControlPillOutline:
    'border-[1.5px] border-[var(--sea-ink-soft)] bg-transparent text-[var(--sea-ink-soft)] shadow-none hover:bg-[var(--link-bg-hover)]',
  siteControlPillBrand: 'min-h-[2.85rem] px-[1.1rem] pl-[0.45rem]',
  headerControlPill: 'w-auto',

  signalAction: cx(
    'inline-flex min-h-[3.1rem] items-center justify-center gap-[0.65rem] rounded-full border-2 px-[1.15rem] py-[0.84rem] text-[0.98rem] font-extrabold leading-[1.2] tracking-[0.01em] no-underline shadow-[0_16px_30px_rgba(17,32,46,0.12)] max-sm:w-full',
    'hover:-translate-y-px',
    transitionBase,
  ),
  signalActionPrimary:
    'border-[color-mix(in_oklab,var(--signal-orange)_72%,black_28%)] bg-[linear-gradient(135deg,var(--signal-orange),var(--signal-gold))] text-[#201108]',
  signalActionSecondary:
    'border-[color-mix(in_oklab,var(--signal-line)_35%,var(--signal-ink)_65%)] bg-[color-mix(in_oklab,var(--signal-surface-strong)_92%,white_8%)] text-[var(--signal-ink)] hover:border-[color-mix(in_oklab,var(--signal-line)_18%,var(--signal-ink)_82%)]',
  signalTagPill:
    'inline-flex min-h-[2.4rem] items-center justify-center rounded-full border-[1.5px] border-[color-mix(in_oklab,var(--signal-line)_30%,var(--signal-ink)_70%)] bg-[color-mix(in_oklab,var(--signal-surface-strong)_90%,white_10%)] px-[0.92rem] py-[0.58rem] text-[0.84rem] font-extrabold uppercase leading-[1.2] tracking-[0.08em] text-[var(--signal-ink)]',

  blogStage: cx(
    'relative isolate overflow-hidden border border-[var(--signal-line)]',
    'bg-[radial-gradient(circle_at_18%_18%,rgba(255,177,81,0.16),transparent_26%),radial-gradient(circle_at_84%_14%,rgba(71,195,183,0.18),transparent_30%),linear-gradient(155deg,var(--signal-surface-strong),var(--signal-surface))]',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_28px_56px_var(--signal-shadow),0_10px_28px_rgba(17,32,46,0.08)]',
    'backdrop-blur-[8px]',
    "before:pointer-events-none before:absolute before:inset-[-16%_-6%_auto_auto] before:h-[22rem] before:w-[22rem] before:rounded-full before:bg-[radial-gradient(circle,rgba(255,177,81,0.18),transparent_62%)] before:content-['']",
  ),
  signalCard: cx(
    'border border-[var(--signal-line)]',
    'bg-[linear-gradient(155deg,var(--signal-surface-strong),var(--signal-surface))]',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_24px_46px_var(--signal-shadow),0_6px_18px_rgba(17,32,46,0.06)]',
    'backdrop-blur-[8px]',
    transitionBase,
  ),
  signalCardHover:
    'hover:border-[color-mix(in_oklab,var(--signal-orange)_28%,var(--signal-line))]',
  signalStat:
    'rounded-[1.45rem] border border-[var(--signal-line)] bg-[color-mix(in_oklab,var(--signal-surface-strong)_90%,white_10%)] px-[1.15rem] py-[1.05rem]',
  signalSubcard:
    'rounded-[1.5rem] border border-[var(--signal-line)] bg-[rgba(255,255,255,0.48)] p-4 dark:bg-[rgba(10,18,24,0.56)]',

  orbitField: cx(
    'relative isolate overflow-hidden rounded-[2rem] border border-[color-mix(in_oklab,var(--signal-line)_85%,var(--signal-teal))]',
    'bg-[radial-gradient(circle_at_50%_50%,rgba(255,177,81,0.08),transparent_30%),radial-gradient(circle_at_18%_20%,rgba(71,195,183,0.2),transparent_34%),linear-gradient(150deg,rgba(255,255,255,0.44),rgba(255,255,255,0.12))]',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-24px_60px_rgba(255,177,81,0.06)]',
    'dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,177,81,0.12),transparent_30%),radial-gradient(circle_at_18%_20%,rgba(71,195,183,0.18),transparent_34%),linear-gradient(150deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]',
    "before:pointer-events-none before:absolute before:inset-1/2 before:h-[72%] before:w-[72%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border before:border-[rgba(255,255,255,0.2)] before:content-['']",
    "after:pointer-events-none after:absolute after:inset-1/2 after:h-[44%] after:w-[44%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-[rgba(255,177,81,0.22)] after:content-['']",
  ),
  orbitRing:
    'absolute rounded-full border border-dashed border-[color-mix(in_oklab,var(--signal-line)_78%,var(--signal-teal))] [animation:orbit-drift_18s_linear_infinite]',
  orbitChip:
    'absolute inline-flex min-h-[2.35rem] items-center rounded-full border-[1.5px] border-[color-mix(in_oklab,var(--signal-line)_26%,var(--signal-ink)_74%)] bg-[color-mix(in_oklab,var(--signal-surface-strong)_92%,white_8%)] px-[0.86rem] py-[0.58rem] font-mono-alt text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[var(--signal-ink)] shadow-[0_14px_26px_rgba(17,32,46,0.12)] max-sm:min-h-[2.1rem] max-sm:px-[0.7rem] max-sm:py-[0.46rem] max-sm:text-[0.7rem] max-sm:tracking-[0.1em]',
  orbitCore:
    'absolute left-1/2 top-1/2 w-[min(74%,21rem)] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-[var(--signal-line)] bg-[color-mix(in_oklab,var(--signal-surface-strong)_92%,white_8%)] px-[1.8rem] py-[1.8rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_24px_44px_rgba(17,32,46,0.16)] max-sm:w-[min(78%,17rem)] max-sm:px-[1.3rem] max-sm:py-[1.3rem]',

  signalPath: cx(
    'flex min-w-0 items-start gap-[0.9rem] rounded-2xl px-[0.8rem] py-3 no-underline',
    'hover:translate-x-[2px] hover:bg-[rgba(255,255,255,0.38)] dark:hover:bg-[rgba(255,255,255,0.04)]',
    transitionBase,
  ),
  signalPathIndex:
    'inline-flex h-[2.1rem] w-[2.1rem] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[color-mix(in_oklab,var(--signal-line)_28%,var(--signal-ink)_72%)] font-mono-alt text-[0.82rem] font-bold text-[var(--signal-ink)]',
  signalInlineNote:
    'mt-6 rounded-[1.75rem] border border-[var(--signal-line)] bg-[color-mix(in_oklab,var(--signal-surface-strong)_88%,white_12%)] px-[1.4rem] py-[1.35rem]',
  signalKeyCue:
    'rounded-[1.6rem] border-2 border-[color-mix(in_oklab,var(--signal-line)_26%,var(--signal-ink)_74%)] bg-[linear-gradient(155deg,color-mix(in_oklab,var(--signal-surface-strong)_96%,white_4%),color-mix(in_oklab,var(--signal-surface)_92%,white_8%))] px-[1.2rem] py-[1.25rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.52),0_16px_30px_rgba(17,32,46,0.08)] max-sm:px-4 max-sm:py-[1.05rem]',
  signalKeyCueLabel:
    'text-[color-mix(in_oklab,var(--signal-ink-soft)_72%,var(--signal-teal)_28%)]',
  signalKeyCueText:
    'max-w-[18ch] text-[1.28rem] font-bold leading-[1.65] tracking-[-0.02em] text-[var(--signal-ink)] max-sm:max-w-none max-sm:text-[1.12rem] max-sm:leading-[1.6]',

  suggestedReading: cx(
    'border border-[var(--signal-line)]',
    'bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,177,81,0.08),transparent_50%),radial-gradient(ellipse_at_90%_100%,rgba(71,195,183,0.06),transparent_50%),linear-gradient(155deg,var(--signal-surface-strong),var(--signal-surface))]',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_20px_40px_var(--signal-shadow),0_6px_16px_rgba(17,32,46,0.05)]',
    'backdrop-blur-[8px]',
  ),
  suggestedCard: cx(
    'border border-[var(--signal-line)] bg-[color-mix(in_oklab,var(--signal-surface-strong)_88%,white_12%)]',
    'hover:-translate-y-[3px] hover:border-[color-mix(in_oklab,var(--signal-orange)_36%,var(--signal-line))] hover:shadow-[0_16px_32px_rgba(17,32,46,0.12)]',
    transitionBase,
  ),

  aboutSocialLink: cx(
    'flex items-center justify-between rounded-[1.25rem] border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-[var(--sea-ink)] no-underline',
    'hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--lagoon-deep)_28%,var(--line))]',
    transitionBase,
  ),
} as const
