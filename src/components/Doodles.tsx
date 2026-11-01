import { motion } from 'framer-motion'

interface Props {
  className?: string
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** Looping hand-drawn arrow. Pairs with a handwritten note. */
export function CurlArrow({ className }: Props) {
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden {...stroke}>
      <path d="M6 10 C 60 0, 110 30, 70 60 C 40 82, 20 50, 55 46 C 80 44, 96 62, 108 80" />
      <path d="M95 72 L109 82 L93 88" />
    </svg>
  )
}

export function SwoopArrow({ className }: Props) {
  return (
    <svg viewBox="0 0 140 60" className={className} aria-hidden {...stroke}>
      <path d="M4 52 C 40 2, 100 2, 130 40" />
      <path d="M117 40 L131 41 L128 27" />
    </svg>
  )
}

export function Star({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke} strokeWidth={2}>
      <path d="M12 2 L14.6 9 L22 9.5 L16.2 14.2 L18.2 22 L12 17.6 L5.8 22 L7.8 14.2 L2 9.5 L9.4 9 Z" />
    </svg>
  )
}

export function Spark({ className }: Props) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden {...stroke}>
      <path d="M20 3 V14 M20 26 V37 M3 20 H14 M26 20 H37 M8 8 L15 15 M25 25 L32 32 M32 8 L25 15 M15 25 L8 32" />
    </svg>
  )
}

/** Wavy underline. Set `draw` to animate it being drawn in. */
export function Squiggle({ className, draw = false }: Props & { draw?: boolean }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className} aria-hidden>
      <motion.path
        d="M2 6 Q 14 -2 26 6 T 50 6 T 74 6 T 98 6 T 122 6 T 146 6 T 170 6 T 198 6"
        {...stroke}
        vectorEffect="non-scaling-stroke"
        initial={draw ? { pathLength: 0 } : false}
        whileInView={draw ? { pathLength: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </svg>
  )
}

export function Check({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden {...stroke} strokeWidth={3.5}>
      <path d="M5 17 C 9 20, 11 24, 13 27 C 17 15, 22 8, 29 4" />
    </svg>
  )
}
