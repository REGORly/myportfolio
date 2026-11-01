import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Final rotation in degrees */
  rotate?: number
  delay?: number
  className?: string
}

/** Scrapbook entrance: the item gets "pasted" onto the page and settles at its angle. */
export default function Drop({ children, rotate = 0, delay = 0, className }: Props) {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className={className} style={{ transform: `rotate(${rotate}deg)` }}>
        {children}
      </div>
    )
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -46, rotate: rotate + 9, scale: 1.1 }}
      whileInView={{ opacity: 1, y: 0, rotate, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 130, damping: 15, mass: 0.9, delay }}
    >
      {children}
    </motion.div>
  )
}
