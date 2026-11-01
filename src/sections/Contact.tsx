import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import Drop from '../components/Drop'
import Tape from '../components/Tape'
import TornEdge from '../components/TornEdge'
import { ArrowUpRight, PinIcon } from '../components/Icons'
import { Star } from '../components/Doodles'

interface LinkRow {
  label: string
  value: string
  placeholder: string
  href?: string
}

/** Strips the protocol so URLs read like handles. */
const pretty = (value: string) => value.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

function buildRows(): LinkRow[] {
  const { email, instagram, linkedin, behance } = profile.links
  return [
    { label: 'Email', value: email, placeholder: 'your@email.com', href: email ? `mailto:${email}` : undefined },
    { label: 'Instagram', value: pretty(instagram), placeholder: 'instagram.com/yourhandle', href: instagram || undefined },
    { label: 'LinkedIn', value: pretty(linkedin), placeholder: 'linkedin.com/in/yourname', href: linkedin || undefined },
    { label: 'Behance', value: pretty(behance), placeholder: 'behance.net/yourname', href: behance || undefined },
  ]
}

function Postmark() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 text-amethyst/70" aria-hidden>
      <defs>
        <path id="postmark-circle" d="M60,60 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
      </defs>
      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
      <text fontSize="13" fontWeight="700" fill="currentColor" letterSpacing="2.5" fontFamily="Bricolage Grotesque, sans-serif">
        <textPath href="#postmark-circle" startOffset="0">
          PUNE · INDIA · PUNE · INDIA ·
        </textPath>
      </text>
      <path d="M44 62 Q52 54 60 62 T76 62" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Contact() {
  const rows = buildRows()
  const year = new Date().getFullYear()

  return (
    <section id="contact" className="relative overflow-hidden bg-amethyst pt-28 sm:pt-36">
      <TornEdge fill="#9C8CB9" seed={12} />
      <div aria-hidden className="dot-grid absolute inset-0 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-orchid/25 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-16 px-5 pb-24 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20">
        <div>
          <h2 className="condensed text-[clamp(3.6rem,10vw,9rem)] font-extrabold leading-[0.84] tracking-[-0.035em] text-pearl">
            Got an idea?
            <br />
            <span className="text-outline">Let’s give it a shape.</span>
          </h2>
          <p className="mt-8 max-w-md text-xl leading-relaxed text-pearl/80">
            Tell me what you’re making, or what you wish existed.
          </p>
          <p className="mt-6 flex items-center gap-2 text-lg text-lavender">
            <PinIcon className="h-5 w-5 shrink-0 text-orchid" />
            {profile.location}
          </p>
        </div>

        <Drop rotate={2}>
          <div className="relative bg-pearl p-6 pb-8 text-imperial shadow-ink sm:p-9">
            <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" tone="orchid" />

            <div className="flex items-start justify-between gap-4">
              <p className="pt-2 font-hand text-4xl font-bold leading-none text-amethyst">Dear you,</p>
              <div className="relative -mr-1 -mt-1 flex items-center justify-center">
                <div className="border-[3px] border-dashed border-amethyst/60 p-1.5">
                  <div className="flex h-20 w-16 flex-col items-center justify-center bg-amethyst text-pearl">
                    <Star className="h-6 w-6 text-orchid" />
                    <span className="mt-1 text-sm font-bold">Pune</span>
                  </div>
                </div>
                <span className="absolute -left-14 top-3 -rotate-12 opacity-80">
                  <Postmark />
                </span>
              </div>
            </div>

            <ul className="mt-6 divide-y-2 divide-dashed divide-lavender/60">
              {rows.map((row) => {
                const content = (
                  <>
                    <span className="font-hand text-3xl font-bold leading-none text-amethyst">{row.label}</span>
                    <span className="ml-auto flex min-w-0 items-center gap-2">
                      <span className={`truncate text-lg font-semibold ${row.href ? '' : 'text-imperial/40'}`}>
                        {row.value || row.placeholder}
                      </span>
                      {row.href ? (
                        <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      ) : (
                        <span className="shrink-0 font-hand text-xl text-amethyst/70">add yours</span>
                      )}
                    </span>
                  </>
                )
                return (
                  <li key={row.label}>
                    {row.href ? (
                      <motion.a
                        href={row.href}
                        target={row.label === 'Email' ? undefined : '_blank'}
                        rel={row.label === 'Email' ? undefined : 'noreferrer noopener'}
                        data-cursor="Open"
                        className="group flex items-center gap-4 py-4 transition-colors hover:text-amethyst"
                        whileHover={{ x: 6 }}
                      >
                        {content}
                      </motion.a>
                    ) : (
                      <div className="flex items-center gap-4 py-4">{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>

            <p className="mt-5 font-hand text-2xl text-amethyst/80">from {profile.location}</p>
          </div>
        </Drop>
      </div>

      <div aria-hidden className="condensed pointer-events-none relative -mb-[0.2em] select-none text-center text-[34vw] font-extrabold leading-[0.8] tracking-[-0.04em] text-outline opacity-25">
        REGOR
      </div>

      <footer className="relative flex flex-col items-center justify-between gap-3 bg-imperial px-5 py-6 text-sm text-lavender sm:flex-row sm:px-8">
        <p>© {year} {profile.name}. All work shown belongs to its creator.</p>
        <a href="#home" data-cursor="Top" className="font-hand text-2xl text-orchid transition-colors hover:text-pearl">
          back to the top
        </a>
      </footer>
    </section>
  )
}
