import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { categoryById, projects, showSampleTags, type Project } from '../data/projects'
import PlaceholderImage, { type ArtKind } from '../components/PlaceholderImage'
import Tape from '../components/Tape'
import { ArrowLeft, ArrowRight, CloseIcon } from '../components/Icons'
import { Squiggle } from '../components/Doodles'

interface Props {
  project: Project
  onClose: () => void
  onNavigate: (slug: string) => void
}

const ratioClass: Record<Project['ratio'], string> = {
  portrait: 'aspect-[4/5] max-w-xl',
  landscape: 'aspect-[16/10] max-w-5xl',
  square: 'aspect-square max-w-2xl',
}

export default function CaseStudy({ project, onClose, onNavigate }: Props) {
  const category = categoryById[project.category]
  const kind = project.category as ArtKind
  const index = projects.findIndex((p) => p.slug === project.slug)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const tools = project.tools ?? category.tools

  const scroller = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // Focus handling, Escape to close, body scroll lock
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeButton.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    window.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [])

  // Jump back to the top when moving between case studies
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
  }, [project.slug])

  const meta = [
    { label: 'Category', value: category.label },
    { label: 'Year', value: project.year || 'Add year' },
    { label: 'Role', value: project.role || 'Add your role' },
    { label: 'Tools', value: tools.length ? tools.join(', ') : 'Add tools' },
  ]
  const gallerySeeds = [project.seed + 1, project.seed + 2, project.seed + 3]

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      className="fixed inset-0 z-[60] bg-imperial"
      initial={{ clipPath: 'inset(10% 8% 10% 8% round 28px)', opacity: 0, y: 50 }}
      animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1, y: 0 }}
      exit={{ clipPath: 'inset(10% 8% 10% 8% round 28px)', opacity: 0, y: 50 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div ref={scroller} className="h-full overflow-y-auto overscroll-contain">
        <div aria-hidden className="dot-grid pointer-events-none fixed inset-0" />
        <div aria-hidden className="pointer-events-none fixed -right-32 -top-32 h-[36rem] w-[36rem] rounded-full bg-amethyst/70 blur-[110px]" />

        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            data-cursor="Back"
            className="flex items-center gap-2 rounded-full border border-pearl/20 bg-imperial/80 px-4 py-2 font-semibold backdrop-blur-md transition-colors hover:border-orchid hover:text-orchid"
          >
            <ArrowLeft className="h-4 w-4" />
            All work
          </button>
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            data-cursor="Close"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-orchid text-imperial transition-transform hover:rotate-90"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <article className="relative mx-auto max-w-[1200px] px-5 pb-24 pt-6 sm:px-8">
          <p className="font-hand text-3xl text-orchid">{category.label}</p>
          <h2 className="condensed mt-2 text-[clamp(3rem,10vw,8.5rem)] font-extrabold leading-[0.88] tracking-[-0.03em]">
            {project.title}
          </h2>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-pearl/75">{project.summary}</p>

          <div className="relative mt-12">
            <div className={`relative mx-auto w-full bg-pearl p-3 shadow-ink sm:p-4 ${ratioClass[project.ratio].split(' ')[1]}`}>
              <Tape className="-top-3 left-1/4 -rotate-3" tone="orchid" />
              <Tape className="-top-3 right-1/4 rotate-3" tone="lavender" />
              <div className={`overflow-hidden bg-amethyst ${ratioClass[project.ratio].split(' ')[0]}`}>
                <PlaceholderImage kind={kind} seed={project.seed} src={project.cover} alt={project.title} label="cover image" />
              </div>
            </div>
            {showSampleTags && !project.cover && (
              <p className="mt-4 text-center font-hand text-2xl text-lavender">
                placeholder cover. Set `cover` for this project in src/data/projects.ts
              </p>
            )}
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-pearl/15 md:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label} className="bg-imperial/90 p-5">
                <dt className="font-hand text-2xl leading-none text-orchid">{item.label}</dt>
                <dd className={`mt-2 text-lg font-semibold leading-snug ${item.value.startsWith('Add') ? 'text-lavender/70' : ''}`}>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-20 grid gap-14 md:grid-cols-2">
            <section>
              <h3 className="font-hand text-4xl font-bold text-orchid">The brief</h3>
              <p className="mt-4 max-w-[34rem] text-[1.15rem] leading-[1.75] text-pearl/85">{project.overview}</p>
            </section>
            <section>
              <h3 className="font-hand text-4xl font-bold text-orchid">The challenge</h3>
              <p className="mt-4 max-w-[34rem] text-[1.15rem] leading-[1.75] text-pearl/85">{project.challenge}</p>
            </section>
          </div>

          <section className="mt-24">
            <h3 className="font-hand text-4xl font-bold text-orchid">Process</h3>
            <Squiggle className="mt-2 h-3 w-36 text-orchid/70" />
            <ol className="relative mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {category.steps.map((step, i) => (
                <li key={step.title} className="relative">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-orchid font-hand text-3xl font-bold text-orchid">
                    {i + 1}
                  </span>
                  <h4 className="mt-4 text-xl font-bold leading-tight">{step.title}</h4>
                  <p className="mt-2 leading-relaxed text-pearl/70">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-24">
            <h3 className="font-hand text-4xl font-bold text-orchid">Gallery</h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {gallerySeeds.map((seed, i) => (
                <div
                  key={i}
                  className="bg-pearl p-2.5 shadow-ink transition-transform duration-500 hover:rotate-0"
                  style={{ transform: `rotate(${[-1.8, 1.4, -1][i]}deg)` }}
                >
                  <div className="aspect-[4/5] overflow-hidden bg-amethyst">
                    <PlaceholderImage
                      kind={kind}
                      seed={seed}
                      src={project.gallery?.[i]}
                      alt={`${project.title}, image ${i + 1}`}
                      label={`image ${i + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="relative mt-24 max-w-2xl rotate-[-1deg] bg-pearl p-8 pb-10 text-imperial shadow-ink">
            <Tape className="-top-3 left-10 -rotate-6" tone="orchid" />
            <h3 className="font-hand text-4xl font-bold text-amethyst">The outcome</h3>
            <p className="mt-3 text-[1.15rem] leading-[1.75]">{project.outcome}</p>
          </section>

          <nav aria-label="More case studies" className="mt-28 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onNavigate(prev.slug)}
              data-cursor="Prev"
              className="group flex items-center gap-4 border border-pearl/20 p-6 text-left transition-colors hover:border-orchid"
            >
              <ArrowLeft className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="block font-hand text-2xl leading-none text-orchid">Previous</span>
                <span className="mt-1 block text-xl font-bold">{prev.title}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(next.slug)}
              data-cursor="Next"
              className="group flex items-center justify-end gap-4 border border-pearl/20 p-6 text-right transition-colors hover:border-orchid"
            >
              <span>
                <span className="block font-hand text-2xl leading-none text-orchid">Next</span>
                <span className="mt-1 block text-xl font-bold">{next.title}</span>
              </span>
              <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" />
            </button>
          </nav>
        </article>
      </div>
    </motion.div>
  )
}
