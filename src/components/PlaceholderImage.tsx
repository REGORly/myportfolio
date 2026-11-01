import { useId } from 'react'
import { cn } from '../lib/utils'

export type ArtKind = 'graphic' | 'animation' | '3d' | 'film' | 'uiux' | 'misc'

interface Combo {
  a: string
  b: string
  c: string
  ink: string
}

// Every combination is built only from the brand palette.
const combos: Combo[] = [
  { a: '#2A123F', b: '#4B1F6F', c: '#C686DD', ink: '#F1EDF7' },
  { a: '#4B1F6F', b: '#9C8CB9', c: '#F1EDF7', ink: '#F1EDF7' },
  { a: '#C686DD', b: '#9C8CB9', c: '#2A123F', ink: '#2A123F' },
  { a: '#9C8CB9', b: '#F1EDF7', c: '#4B1F6F', ink: '#2A123F' },
  { a: '#F1EDF7', b: '#C686DD', c: '#4B1F6F', ink: '#2A123F' },
]

interface Props {
  kind?: ArtKind
  seed?: number
  label?: string
  /** Path to your real image, for example '/images/cover.jpg'. When set, the generated art is skipped. */
  src?: string
  alt?: string
  className?: string
}

export default function PlaceholderImage({
  kind = 'misc',
  seed = 0,
  label = 'Your image here',
  src,
  alt = '',
  className,
}: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn('h-full w-full object-cover', className)}
      />
    )
  }

  const p = combos[Math.abs(seed) % combos.length]
  const flip = seed % 2 === 1 ? -1 : 1
  const rot = ((seed * 37) % 24) - 12
  const pearl = '#F1EDF7'
  const night = '#2A123F'

  const art = (() => {
    switch (kind) {
      case 'graphic':
        return (
          <g transform={`rotate(${rot} 200 200)`}>
            <text x="34" y="268" fontSize="250" fontWeight="800" fill={p.c} fontFamily="Bricolage Grotesque, sans-serif">
              Aa
            </text>
            <circle cx="312" cy="98" r="46" fill="none" stroke={pearl} strokeWidth="7" opacity=".85" />
            <rect x="34" y="314" width="150" height="14" rx="7" fill={pearl} opacity=".75" />
            <rect x="34" y="338" width="96" height="14" rx="7" fill={pearl} opacity=".45" />
          </g>
        )
      case '3d':
        return (
          <g>
            <ellipse cx="200" cy="318" rx="118" ry="20" fill={night} opacity=".35" />
            <circle cx="200" cy="196" r="112" fill={`url(#${uid}s)`} />
            <ellipse
              cx="200"
              cy="200"
              rx="170"
              ry="36"
              fill="none"
              stroke={pearl}
              strokeWidth="4"
              opacity=".55"
              transform={`rotate(${-14 * flip} 200 200)`}
            />
          </g>
        )
      case 'animation':
        return (
          <g>
            <path
              d="M30 310 C 110 60, 250 60, 370 280"
              fill="none"
              stroke={pearl}
              strokeWidth="3"
              strokeDasharray="4 10"
              strokeLinecap="round"
              opacity=".6"
              transform={flip === -1 ? 'translate(400 0) scale(-1 1)' : undefined}
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <circle
                key={i}
                cx={flip === -1 ? 340 - i * 62 : 60 + i * 62}
                cy={[286, 150, 112, 150, 262][i]}
                r={14 + i * 7}
                fill={p.c}
                opacity={0.25 + i * 0.18}
              />
            ))}
          </g>
        )
      case 'film':
        return (
          <g>
            <rect x="0" y="0" width="400" height="56" fill={night} opacity=".8" />
            <rect x="0" y="344" width="400" height="56" fill={night} opacity=".8" />
            {Array.from({ length: 9 }).map((_, i) => (
              <g key={i}>
                <rect x={16 + i * 44} y="18" width="22" height="20" rx="4" fill={pearl} opacity=".55" />
                <rect x={16 + i * 44} y="362" width="22" height="20" rx="4" fill={pearl} opacity=".55" />
              </g>
            ))}
            <circle cx="200" cy="200" r="58" fill={pearl} opacity=".92" />
            <path d="M186 172 L234 200 L186 228 Z" fill={night} />
          </g>
        )
      case 'uiux':
        return (
          <g transform={`rotate(${rot / 2} 200 200)`}>
            <rect x="110" y="44" width="180" height="312" rx="26" fill={pearl} opacity=".95" />
            <rect x="130" y="76" width="140" height="84" rx="14" fill={p.c} opacity=".9" />
            <circle cx="148" cy="196" r="13" fill={p.b} />
            <rect x="170" y="186" width="96" height="9" rx="4.5" fill={night} opacity=".6" />
            <rect x="170" y="203" width="64" height="9" rx="4.5" fill={night} opacity=".3" />
            <circle cx="148" cy="240" r="13" fill={p.b} />
            <rect x="170" y="230" width="90" height="9" rx="4.5" fill={night} opacity=".6" />
            <rect x="170" y="247" width="58" height="9" rx="4.5" fill={night} opacity=".3" />
            <rect x="130" y="292" width="140" height="38" rx="19" fill={night} />
          </g>
        )
      default:
        return (
          <g>
            <circle cx={flip === -1 ? 270 : 130} cy="170" r="100" fill={p.c} opacity=".75" />
            <circle cx={flip === -1 ? 150 : 250} cy="230" r="86" fill={pearl} opacity=".35" />
            <rect x="150" y="120" width="110" height="160" rx="55" fill={night} opacity=".25" transform={`rotate(${rot} 200 200)`} />
          </g>
        )
    }
  })()

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt || label}
      className={cn('h-full w-full', className)}
    >
      <defs>
        <linearGradient id={`${uid}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.a} />
          <stop offset="1" stopColor={p.b} />
        </linearGradient>
        <radialGradient id={`${uid}s`} cx=".32" cy=".3" r=".85">
          <stop offset="0" stopColor={pearl} />
          <stop offset=".24" stopColor={p.c} />
          <stop offset="1" stopColor={night} />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${uid}g)`} />
      {art}
      <text
        x="200"
        y="388"
        textAnchor="middle"
        fontSize="22"
        fontFamily="Caveat, cursive"
        fontWeight="700"
        fill={kind === 'film' ? pearl : p.ink}
        opacity=".85"
      >
        {label}
      </text>
    </svg>
  )
}
