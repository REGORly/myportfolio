import PlaceholderImage, { type ArtKind } from './PlaceholderImage'
import Tape from './Tape'
import { cn } from '../lib/utils'

interface Props {
  kind?: ArtKind
  seed?: number
  caption?: string
  /** Rotation in degrees */
  rotate?: number
  src?: string
  tape?: boolean
  className?: string
}

export default function Polaroid({ kind = 'misc', seed = 0, caption, rotate = 0, src, tape = true, className }: Props) {
  return (
    <figure
      className={cn('relative bg-pearl p-[5%] pb-[16%] text-imperial shadow-ink', className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {tape && <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" tone="orchid" />}
      <div className="aspect-square w-full overflow-hidden bg-amethyst">
        <PlaceholderImage kind={kind} seed={seed} src={src} alt={caption ?? 'Placeholder image'} />
      </div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-[3.5%] text-center font-hand text-[clamp(1rem,1.6vw,1.45rem)] leading-none">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
