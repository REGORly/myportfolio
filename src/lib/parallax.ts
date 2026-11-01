import { createContext, useContext } from 'react'
import { motionValue, type MotionValue } from 'framer-motion'

export interface PointerValues {
  /** Pointer position inside the hero, normalised to -0.5 … 0.5 */
  mx: MotionValue<number>
  my: MotionValue<number>
}

export const PointerContext = createContext<PointerValues>({
  mx: motionValue(0),
  my: motionValue(0),
})

export const usePointer = () => useContext(PointerContext)
