import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '../lib/hooks'

/**
 * Custom cursor for desktop (mouse / trackpad) only.
 * Any element with data-cursor="Label" makes the ring grow and show that label.
 * Links and buttons grow the ring without a label.
 */
export default function Cursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 900, damping: 48, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 900, damping: 48, mass: 0.2 })
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 })

  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!fine) return
    const root = document.documentElement
    root.classList.add('has-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>('a, button, [data-cursor]')
      setHover(Boolean(target))
      setLabel(target?.dataset.cursor ?? '')
    }
    const onLeave = () => setVisible(false)
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [fine, x, y])

  if (!fine) return null

  const size = hover ? (label ? 92 : 58) : down ? 26 : 38

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-orchid"
          animate={{
            width: size,
            height: size,
            opacity: visible ? 1 : 0,
            backgroundColor: hover ? 'rgba(198, 134, 221, 0.92)' : 'rgba(198, 134, 221, 0)',
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        >
          {label && hover && (
            <span className="font-hand text-xl font-bold leading-none text-imperial">{label}</span>
          )}
        </motion.div>
      </motion.div>
      <motion.div style={{ x: dotX, y: dotY }} className="absolute left-0 top-0">
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-orchid transition-opacity"
          style={{ width: 6, height: 6, opacity: visible && !hover ? 1 : 0 }}
        />
      </motion.div>
    </div>
  )
}
