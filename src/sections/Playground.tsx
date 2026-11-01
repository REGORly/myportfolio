import { motion } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'
import { useMediaQuery } from '../lib/hooks'
import Drop from '../components/Drop'
import Polaroid from '../components/Polaroid'
import Tape from '../components/Tape'
import TornEdge from '../components/TornEdge'
import type { ArtKind } from '../components/PlaceholderImage'
import { CurlArrow, Spark } from '../components/Doodles'

/**
 * SAMPLE scrapbook. Swap the polaroids for your experiments: add `src: '/images/your-file.jpg'`
 * to any polaroid item and it replaces the generated art.
 */
type Item =
  | { id: string; type: 'polaroid'; kind: ArtKind; seed: number; caption: string; rotate: number; src?: string }
  | { id: string; type: 'note'; text: string; rotate: number; tone: 'orchid' | 'pearl' }
  | { id: string; type: 'swatch'; rotate: number }
  | { id: string; type: 'ticket'; rotate: number }
  | { id: string; type: 'sticker'; text: string; rotate: number }

const items: Item[] = [
  { id: 'p1', type: 'polaroid', kind: '3d', seed: 2, caption: 'lighting test', rotate: -3 },
  { id: 'n1', type: 'note', text: 'Half-finished ideas live here. Nothing in this corner is precious.', rotate: 2, tone: 'orchid' },
  { id: 'p2', type: 'polaroid', kind: 'animation', seed: 0, caption: 'loop practice', rotate: 2.5 },
  { id: 'sw', type: 'swatch', rotate: -2 },
  { id: 'p3', type: 'polaroid', kind: 'graphic', seed: 4, caption: 'type experiment', rotate: -1.5 },
  { id: 'tk', type: 'ticket', rotate: 3 },
  { id: 'p4', type: 'polaroid', kind: 'film', seed: 3, caption: 'frame grab', rotate: 2 },
  { id: 'st', type: 'sticker', text: 'Made in Pune', rotate: -8 },
  { id: 'p5', type: 'polaroid', kind: 'uiux', seed: 1, caption: 'interface sketch', rotate: -2.5 },
  {
    id: 'n2',
    type: 'note',
    text: 'Replace these with your sketches, renders, motion tests and happy accidents.',
    rotate: -2,
    tone: 'pearl',
  },
]

const palette = [
  { name: 'Imperial Violet', hex: '#2A123F' },
  { name: 'Amethyst Noir', hex: '#4B1F6F' },
  { name: 'Dusted Lavender', hex: '#9C8CB9' },
  { name: 'Orchid Smoke', hex: '#C686DD' },
  { name: 'Moon Pearl', hex: '#F1EDF7' },
]

function renderItem(item: Item): ReactNode {
  switch (item.type) {
    case 'polaroid':
      return <Polaroid kind={item.kind} seed={item.seed} caption={item.caption} src={item.src} className="w-full" />
    case 'note':
      return (
        <div
          className={`relative p-6 pb-8 font-hand text-[1.7rem] leading-[1.15] shadow-ink ${
            item.tone === 'orchid' ? 'bg-orchid text-imperial' : 'bg-pearl text-imperial'
          }`}
        >
          <Tape className="-top-3 left-6 -rotate-6" tone={item.tone === 'orchid' ? 'pearl' : 'orchid'} />
          {item.text}
        </div>
      )
    case 'swatch':
      return (
        <div className="relative bg-pearl p-3 text-imperial shadow-ink">
          <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-2" tone="lavender" />
          <ul className="flex h-44 overflow-hidden">
            {palette.map((c) => (
              <li key={c.hex} className="flex-1" style={{ backgroundColor: c.hex }} title={`${c.name} ${c.hex}`} />
            ))}
          </ul>
          <p className="mt-3 px-1 font-hand text-2xl leading-none">the palette</p>
          <p className="px-1 text-sm text-imperial/65">{palette.map((c) => c.hex).join('  ')}</p>
        </div>
      )
    case 'ticket':
      return (
        <div className="relative bg-amethyst px-7 py-6 text-pearl shadow-ink">
          <span aria-hidden className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-lavender" />
          <span aria-hidden className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-lavender" />
          <p className="font-hand text-4xl font-bold leading-none text-orchid">Admit one</p>
          <p className="mt-3 border-t-2 border-dashed border-pearl/40 pt-3 text-lg font-medium leading-snug">
            Experiments, tests and happy accidents.
          </p>
        </div>
      )
    case 'sticker':
      return (
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[3px] border-dashed border-imperial bg-orchid p-3 text-center font-hand text-3xl font-bold leading-[0.95] text-imperial shadow-ink">
          {item.text}
        </div>
      )
  }
}

export default function Playground() {
  const board = useRef<HTMLDivElement>(null)
  const canDrag = useMediaQuery('(hover: hover) and (pointer: fine)')
  const [top, setTop] = useState<string | null>(null)

  return (
    <section id="playground" className="graph-bg relative overflow-hidden pb-32 pt-28 text-imperial sm:pt-36">
      <TornEdge fill="#2A123F" seed={8} />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="condensed text-[clamp(3.6rem,10.5vw,9.5rem)] font-extrabold leading-[0.82] tracking-[-0.035em]">
            Playground
          </h2>
          <div className="max-w-sm md:pb-2">
            <p className="text-lg leading-relaxed text-imperial/80">
              The experiments, tests and side-quests that sit between finished projects.
            </p>
            <p className="mt-3 flex items-center gap-2 font-hand text-2xl text-amethyst">
              <CurlArrow className="h-9 w-9 shrink-0 -rotate-12" />
              {canDrag ? 'drag things around' : 'scroll through the mess'}
            </p>
          </div>
        </div>

        <div
          ref={board}
          className="relative mt-16 columns-1 gap-x-10 sm:columns-2 lg:columns-3 [&>*]:mb-12"
        >
          {items.map((item, i) => (
            <div key={item.id} className="break-inside-avoid" style={{ position: 'relative', zIndex: top === item.id ? 30 : 1 }}>
              <Drop rotate={item.rotate} delay={(i % 3) * 0.08}>
                <motion.div
                  drag={canDrag}
                  dragConstraints={board}
                  dragElastic={0.18}
                  dragMomentum={false}
                  onDragStart={() => setTop(item.id)}
                  whileDrag={{ scale: 1.05, rotate: item.rotate * -1.5 }}
                  whileHover={canDrag ? { y: -4 } : undefined}
                  data-cursor={canDrag ? 'Drag' : undefined}
                >
                  {renderItem(item)}
                </motion.div>
              </Drop>
            </div>
          ))}
        </div>

        <div aria-hidden className="mt-4 flex justify-end text-amethyst">
          <Spark className="h-12 w-12" />
        </div>
      </div>
    </section>
  )
}
