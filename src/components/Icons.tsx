import type { IconName } from '../data/skills'

interface Props {
  className?: string
}

const common = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export function SkillIcon({ name, className }: Props & { name: IconName }) {
  switch (name) {
    case 'type':
      return (
        <svg {...common} className={className}>
          <path d="M8 38 L20 8 L32 38 M12.5 28 H27.5" />
          <path d="M36 20 C 40 20, 42 22, 42 26 V38 M42 29 C 36 29, 34 31, 34 34 C 34 37, 36 38, 38 38 C 41 38, 42 36, 42 34" />
        </svg>
      )
    case 'cube':
      return (
        <svg {...common} className={className}>
          <path d="M24 5 L41 14.5 V33.5 L24 43 L7 33.5 V14.5 Z" />
          <path d="M7 14.5 L24 24 L41 14.5 M24 24 V43" />
        </svg>
      )
    case 'motion':
      return (
        <svg {...common} className={className}>
          <circle cx="12" cy="34" r="5" />
          <circle cx="24" cy="16" r="5" opacity=".7" />
          <circle cx="36" cy="30" r="5" opacity=".45" />
          <path d="M10 22 C 14 6, 34 4, 40 18" strokeDasharray="2 5" />
        </svg>
      )
    case 'film':
      return (
        <svg {...common} className={className}>
          <rect x="6" y="9" width="36" height="30" rx="4" />
          <path d="M14 9 V39 M34 9 V39 M6 19 H14 M6 29 H14 M34 19 H42 M34 29 H42" />
        </svg>
      )
    case 'camera':
      return (
        <svg {...common} className={className}>
          <rect x="5" y="14" width="30" height="22" rx="4" />
          <path d="M35 22 L43 16 V34 L35 28" />
          <circle cx="20" cy="25" r="5" />
        </svg>
      )
    case 'ui':
      return (
        <svg {...common} className={className}>
          <rect x="6" y="7" width="36" height="34" rx="4" />
          <path d="M6 16 H42 M15 16 V41" />
          <rect x="21" y="22" width="15" height="6" rx="2" />
          <path d="M21 34 H33" />
        </svg>
      )
  }
}

export function ArrowUpRight({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M7 17 L17 7 M8 7 H17 V16" />
    </svg>
  )
}

export function ArrowLeft({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M19 12 H5 M11 6 L5 12 L11 18" />
    </svg>
  )
}

export function ArrowRight({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12 H19 M13 6 L19 12 L13 18" />
    </svg>
  )
}

export function CloseIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={className} aria-hidden>
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </svg>
  )
}

export function PinIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 21 C 6 15, 5 11.5, 5 9.5 A7 7 0 0 1 19 9.5 C 19 11.5, 18 15, 12 21 Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}
