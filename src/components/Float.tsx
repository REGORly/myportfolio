import { motion, useReducedMotion, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePointer } from '../lib/parallax'

interface Props {
  children: ReactNode
  /** How strongly it reacts to the pointer (px). Higher = closer to the viewer. */
  depth?: number
  /** Vertical bob distance in px */
  bob?: number
  /** Rotation sway in degrees */
  sway?: number
  duration?: number
  delay?: number
  className?: string
}

/** Floating element: drifts gently on its own and shifts with the pointer for subtle parallax. */
export default function Float({ children, depth = 24, bob = 10, sway = 2, duration = 7, delay = 0, className }: Props) {
  const { mx, my } = usePointer()
  const reduce = useReducedMotion()
  const x = useTransform(mx, (v) => (reduce ? 0 : v * depth * -2))
  const y = useTransform(my, (v) => (reduce ? 0 : v * depth * -2))

  return (
    <motion.div style={{ x, y }} className={className}>
      <motion.div
        animate={reduce ? undefined : { y: [0, -bob, 0], rotate: [-sway, sway, -sway] }}
        transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
