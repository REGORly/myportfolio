import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type PointerEvent } from 'react'
import { profile } from '../data/profile'
import { marqueeItems } from '../data/skills'
import { PointerContext } from '../lib/parallax'
import Float from '../components/Float'
import Polaroid from '../components/Polaroid'
import FilmStrip from '../components/FilmStrip'
import Marquee from '../components/Marquee'
import { CurlArrow, Spark, Star } from '../components/Doodles'

const letterClass = ['text-pearl', 'text-outline', 'text-gradient', '', 'text-orchid']
const letters = ['R', 'E', 'G', 'O', 'R']

/** The "O": a lit 3D sphere with an orbiting ring, a nod to Blender. */
function Sphere({ reduce }: { reduce: boolean | null }) {
  return (
    <span className="relative mx-[0.02em] mb-[0.05em] inline-block h-[0.66em] w-[0.66em] [perspective:900px]">
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, #F1EDF7 0 4%, #E6BFF3 11%, #C686DD 32%, #4B1F6F 70%, #2A123F 100%)',
          boxShadow: '0 0 90px 8px rgba(198,134,221,.38), inset -0.06em -0.08em 0.2em rgba(42,18,63,.65)',
        }}
      />
      <motion.span
        className="absolute -inset-[16%] rounded-full border-[0.018em] border-pearl/50"
        style={{ rotateX: 74 }}
        animate={reduce ? undefined : { rotateZ: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <span className="absolute -bottom-[0.1em] left-[10%] h-[0.09em] w-4/5 rounded-[50%] bg-black/40 blur-md" />
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 150])
  const floatsY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110])

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const words = profile.tagline.split(' ')

  return (
    <PointerContext.Provider value={{ mx, my }}>
      <section
        id="home"
        ref={ref}
        onPointerMove={onMove}
        className="relative flex min-h-[100svh] flex-col overflow-hidden bg-imperial pt-24 sm:pt-28"
      >
        {/* atmosphere */}
        <div aria-hidden className="dot-grid absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-amethyst/70 blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute -left-48 bottom-10 h-[34rem] w-[34rem] rounded-full bg-orchid/20 blur-[120px]" />

        {/* floating scrapbook pieces (desktop) */}
        <motion.div style={{ y: floatsY }} aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden sm:block">
          <Float depth={34} bob={12} sway={2} className="absolute right-[4%] top-[14%] w-[clamp(150px,17vw,270px)]">
            <Polaroid kind="3d" seed={0} caption="render test" rotate={6} />
          </Float>
          <Float depth={18} bob={9} sway={3} duration={8} delay={1} className="absolute bottom-[19%] right-[17%] hidden w-[clamp(120px,12vw,190px)] lg:block">
            <Polaroid kind="film" seed={1} caption="frame 24" rotate={-8} />
          </Float>
          <Float depth={40} bob={14} sway={4} duration={9} className="absolute bottom-[22%] left-[2.5%] hidden xl:block">
            <FilmStrip className="rotate-[8deg]" />
          </Float>
          <Float depth={26} bob={8} sway={3} duration={6} className="absolute left-[6%] top-[22%] hidden md:block">
            <div className="-rotate-6 bg-orchid px-5 py-3 font-hand text-2xl leading-tight text-imperial shadow-ink">
              Based in
              <br />
              {profile.location}
            </div>
          </Float>
          <Float depth={46} bob={16} sway={10} duration={10} className="absolute right-[40%] top-[17%] hidden lg:block">
            <Spark className="h-10 w-10 text-orchid" />
          </Float>
          <Float depth={30} bob={10} sway={12} duration={7} delay={2} className="absolute bottom-[13%] right-[6%] hidden md:block">
            <Star className="h-9 w-9 text-lavender" />
          </Float>
        </motion.div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-center px-5 pb-12 sm:px-8">
          <motion.div style={{ y: titleY }} className="relative w-fit">
            <h1
              aria-label={profile.name}
              className="condensed flex select-none items-end text-[clamp(6rem,27vw,25rem)] font-extrabold leading-[0.8] tracking-[-0.035em]"
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="inline-block"
                  initial={reduce ? false : { y: 90, opacity: 0, rotate: i % 2 ? -9 : 9 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 13, delay: 0.1 + i * 0.09 }}
                  whileHover={reduce ? undefined : { y: -16, rotate: i % 2 ? -4 : 4 }}
                >
                  {i === 3 ? <Sphere reduce={reduce} /> : <span className={letterClass[i]}>{letter}</span>}
                </motion.span>
              ))}
            </h1>

            <motion.div
              aria-hidden
              className="absolute -bottom-14 left-[47%] hidden items-start gap-2 text-orchid md:flex"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <CurlArrow className="mt-[-1.4rem] h-14 w-14 -scale-x-100 rotate-[-30deg]" />
              <span className="mt-4 -rotate-3 font-hand text-2xl leading-none">psst, that O is a sphere</span>
            </motion.div>
          </motion.div>

          <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-end md:gap-14">
            <p className="max-w-[16ch] text-[clamp(1.9rem,4.4vw,3.9rem)] font-semibold leading-[1.04] tracking-tight">
              {words.map((word, i) => (
                <span key={i} className="mb-[-0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom pr-[0.25em]">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1], delay: 0.95 + i * 0.07 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </p>

            <motion.div
              className="max-w-md"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7 }}
            >
              <p className="text-lg leading-relaxed text-pearl/80">{profile.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#work"
                  data-cursor="Go"
                  className="rounded-full bg-orchid px-6 py-3 font-semibold text-imperial transition-transform hover:-translate-y-0.5 hover:-rotate-1"
                >
                  See my work
                </a>
                <a
                  href="#contact"
                  data-cursor="Hi"
                  className="rounded-full border border-pearl/35 px-6 py-3 font-semibold text-pearl transition-colors hover:border-orchid hover:text-orchid"
                >
                  Say hello
                </a>
              </div>
            </motion.div>
          </div>

          {/* mobile scrapbook strip */}
          <div aria-hidden className="relative mt-10 flex h-40 justify-center sm:hidden">
            <Polaroid kind="3d" seed={0} caption="render test" rotate={-6} className="absolute left-[8%] top-0 w-32" />
            <Polaroid kind="film" seed={1} caption="frame 24" rotate={7} className="absolute right-[8%] top-3 w-28" />
          </div>
        </div>

        <div className="relative z-10 -mx-4 mb-6 mt-2 -rotate-[1.4deg] bg-orchid py-3 text-xl font-semibold text-imperial shadow-ink sm:mb-8">
          <Marquee items={marqueeItems} />
        </div>
      </section>
    </PointerContext.Provider>
  )
}
