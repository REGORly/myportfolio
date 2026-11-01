import { Star } from './Doodles'
import { cn } from '../lib/utils'

interface Props {
  items: string[]
  className?: string
}

/** Endless ticker. The track holds two copies so the CSS loop is seamless. */
export default function Marquee({ items, className }: Props) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 whitespace-nowrap">
          {item}
          <Star className="h-5 w-5 shrink-0" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className={cn('overflow-hidden', className)}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
