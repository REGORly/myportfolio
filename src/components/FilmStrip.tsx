import PlaceholderImage from './PlaceholderImage'
import { cn } from '../lib/utils'

interface Props {
  className?: string
  /** Replace with your own stills, for example ['/images/f1.jpg', ...] */
  frames?: string[]
}

/** Vertical strip of film with sprocket holes. */
export default function FilmStrip({ className, frames }: Props) {
  const seeds = [1, 3, 0]
  return (
    <div
      className={cn('relative flex w-[92px] flex-col gap-2 px-[14px] py-3 shadow-ink', className)}
      style={{ backgroundColor: '#150822' }}
      aria-hidden
    >
      <span
        className="absolute inset-y-0 left-[3px] w-[7px]"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent 0 7px, rgba(241,237,247,.75) 7px 15px, transparent 15px 22px)',
        }}
      />
      <span
        className="absolute inset-y-0 right-[3px] w-[7px]"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent 0 7px, rgba(241,237,247,.75) 7px 15px, transparent 15px 22px)',
        }}
      />
      {seeds.map((s, i) => (
        <div key={i} className="aspect-[4/3] w-full overflow-hidden">
          <PlaceholderImage kind="film" seed={s} src={frames?.[i]} label="frame" />
        </div>
      ))}
    </div>
  )
}
