import { useMemo } from 'react'
import { seeded } from '../lib/utils'

interface Props {
  /** Colour of the section ABOVE this one, which "tears" down into this section. */
  fill: string
  seed?: number
}

/** Ripped-paper divider. Place as the first child of a `relative` section. */
export default function TornEdge({ fill, seed = 1 }: Props) {
  const d = useMemo(() => {
    const rand = seeded(seed * 97 + 11)
    const steps = 70
    let path = 'M0,0 L0,10'
    for (let i = 1; i <= steps; i++) {
      const x = (i / steps) * 1000
      const y = 6 + rand() * 20
      path += ` L${x.toFixed(1)},${y.toFixed(1)}`
    }
    return `${path} L1000,0 Z`
  }, [seed])

  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 32"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -top-px left-0 z-10 block h-5 w-full sm:h-7"
    >
      <path d={d} fill={fill} />
    </svg>
  )
}
