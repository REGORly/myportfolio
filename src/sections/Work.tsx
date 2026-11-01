import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { categories, categoryById, projects, showSampleTags, type CategoryId, type Project } from '../data/projects'
import PlaceholderImage, { type ArtKind } from '../components/PlaceholderImage'
import Tape from '../components/Tape'
import TornEdge from '../components/TornEdge'
import { ArrowUpRight } from '../components/Icons'
import { SwoopArrow } from '../components/Doodles'

type Filter = CategoryId | 'all'

const ratioClass: Record<Project['ratio'], string> = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
}
const tilts = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.9]

interface CardProps {
  project: Project
  index: number
  onOpen: (slug: string) => void
}

function ProjectCard({ project, index, onOpen }: CardProps) {
  const category = categoryById[project.category]
  const tilt = tilts[index % tilts.length]
  const kind = project.category as ArtKind

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1, rotate: tilt }}
      exit={{ opacity: 0, scale: 0.92 }}
      whileHover={{ rotate: 0, y: -10 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="group relative xl:[&:nth-child(3n+2)]:mt-14"
    >
      <button
        type="button"
        onClick={() => onOpen(project.slug)}
        data-cursor="Open"
        aria-label={`Open case study: ${project.title}`}
        className="relative block w-full bg-pearl p-3 pb-5 text-left text-imperial shadow-ink"
      >
        <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-2" tone="orchid" />
        <div className={`relative overflow-hidden bg-amethyst ${ratioClass[project.ratio]}`}>
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.07]">
            <PlaceholderImage kind={kind} seed={project.seed} src={project.cover} alt={project.title} />
          </div>
          {showSampleTags && !project.cover && (
            <span className="absolute left-2 top-2 -rotate-3 bg-pearl px-2 py-0.5 font-hand text-lg leading-none text-amethyst">
              sample
            </span>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-3 px-1">
          <div className="min-w-0">
            <p className="font-hand text-2xl leading-none text-amethyst">{category.label}</p>
            <h3 className="mt-1.5 text-2xl font-bold leading-tight tracking-tight">{project.title}</h3>
          </div>
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-imperial text-pearl transition-all duration-300 group-hover:rotate-45 group-hover:bg-orchid group-hover:text-imperial">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
        <p className="mt-2 px-1 text-[0.95rem] leading-snug text-imperial/70">{project.summary}</p>
      </button>
    </motion.article>
  )
}

interface Props {
  onOpen: (slug: string) => void
}

export default function Work({ onOpen }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
  const activeBlurb = filter === 'all' ? 'Five disciplines, one notebook.' : categoryById[filter].blurb

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: projects.length },
    ...categories.map((c) => ({
      id: c.id as Filter,
      label: c.label,
      count: projects.filter((p) => p.category === c.id).length,
    })),
  ]

  return (
    <section id="work" className="relative overflow-hidden bg-imperial pb-32 pt-28 sm:pt-36">
      <TornEdge fill="#F1EDF7" seed={5} />
      <div aria-hidden className="dot-grid absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-amethyst/60 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="condensed text-[clamp(4rem,12vw,10.5rem)] font-extrabold leading-[0.8] tracking-[-0.035em] text-pearl">
            Work
          </h2>
          <div className="max-w-sm md:pb-2">
            <p className="text-lg leading-relaxed text-pearl/75">{activeBlurb}</p>
            <p className="mt-3 flex items-center gap-2 font-hand text-2xl text-orchid">
              <SwoopArrow className="h-7 w-10 shrink-0 -scale-x-100" />
              sample projects. Swap in your own in src/data/projects.ts
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3" role="group" aria-label="Filter projects by category">
          {tabs.map((tab, i) => {
            const active = filter === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                aria-pressed={active}
                data-cursor="Filter"
                className={`relative px-5 py-2.5 text-[1.02rem] font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-orchid text-imperial shadow-ink'
                    : 'border border-pearl/25 text-pearl/80 hover:border-orchid hover:text-orchid'
                }`}
                style={{ transform: `rotate(${active ? 0 : i % 2 ? 0.8 : -0.8}deg)` }}
              >
                {tab.label}
                <span className={`ml-2 font-hand text-xl ${active ? 'text-amethyst' : 'text-lavender'}`}>{tab.count}</span>
              </button>
            )
          })}
        </div>

        <motion.div layout className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {visible.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} onOpen={onOpen} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
