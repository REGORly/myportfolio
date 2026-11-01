import { cn } from '../lib/utils'

interface Props {
  className?: string
  tone?: 'pearl' | 'orchid' | 'lavender'
}

const tones = {
  pearl: 'bg-pearl/75',
  orchid: 'bg-orchid/75',
  lavender: 'bg-lavender/80',
}

/** A strip of translucent washi tape. Position it with className (absolute + top/left + rotate). */
export default function Tape({ className, tone = 'pearl' }: Props) {
  return (
    <span
      aria-hidden
      className={cn(
        'tape pointer-events-none absolute block h-7 w-24 shadow-sm backdrop-blur-[1px]',
        tones[tone],
        className,
      )}
    />
  )
}
