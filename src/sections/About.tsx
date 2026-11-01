import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { interests, skills } from '../data/skills'
import Drop from '../components/Drop'
import Parallax from '../components/Parallax'
import Polaroid from '../components/Polaroid'
import Tape from '../components/Tape'
import TornEdge from '../components/TornEdge'
import { SkillIcon } from '../components/Icons'
import { Check, CurlArrow, Squiggle } from '../components/Doodles'

const tagTilts = [-3, 2, -1.5, 3.5, -2.5, 1.5, -3.5, 2.5]

export default function About() {
  return (
    <section id="about" className="paper-bg relative overflow-hidden pb-28 pt-28 text-imperial sm:pt-36">
      <TornEdge fill="#2A123F" seed={3} />

      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Story */}
        <div className="lg:col-span-5">
          <h2 className="condensed text-[clamp(3.6rem,9vw,8rem)] font-extrabold leading-[0.85] tracking-[-0.03em]">
            Hello, I’m REGOR.
          </h2>
          <Squiggle draw className="mt-3 h-3 w-48 text-orchid" />

          <div className="mt-8 max-w-[34rem] space-y-5 text-[1.15rem] leading-[1.7]">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-6 flex items-center gap-3 font-hand text-2xl text-amethyst">
            <CurlArrow className="h-10 w-10 shrink-0 -rotate-12" />
            placeholder story. Swap it for your own in src/data/profile.ts
          </p>

          <Parallax offset={36} className="relative mx-auto mt-14 w-[min(78%,340px)] lg:mx-0 lg:ml-6">
            <Drop rotate={-4}>
              <Polaroid kind="misc" seed={2} caption="your portrait here" tape className="w-full" />
            </Drop>
          </Parallax>
        </div>

        {/* Notebook page */}
        <div className="lg:col-span-7">
          <Drop rotate={1.2}>
            <div className="relative ml-0 sm:ml-6">
              <Tape className="-top-3 left-12 -rotate-6" tone="lavender" />
              <div className="relative grid grid-cols-[2.4rem_1fr] overflow-hidden rounded-[6px] shadow-ink sm:grid-cols-[3.2rem_1fr]">
                <div aria-hidden className="spiral bg-amethyst/15" />
                <div className="notebook-page py-9 pl-5 pr-5 sm:pl-8 sm:pr-10">
                  <h3 className="font-hand text-4xl font-bold leading-none text-amethyst">things I make</h3>

                  <ul className="mt-6 space-y-[0.4rem]">
                    {skills.map((skill, i) => (
                      <motion.li
                        key={skill.title}
                        className="group flex items-start gap-4 py-1.5"
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amethyst text-pearl transition-transform group-hover:-rotate-12 group-hover:scale-110">
                          <SkillIcon name={skill.icon} className="h-6 w-6" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[1.12rem] font-semibold leading-snug">{skill.title}</span>
                          <span className="block text-[0.97rem] leading-snug text-imperial/70">{skill.note}</span>
                        </span>
                        <Check className={`ml-auto mt-2 hidden h-6 w-6 shrink-0 text-orchid sm:block ${i % 2 ? 'rotate-6' : '-rotate-3'}`} />
                      </motion.li>
                    ))}
                  </ul>

                  <h3 className="mt-10 font-hand text-4xl font-bold leading-none text-amethyst">software</h3>
                  <ul className="mt-5 flex flex-wrap gap-3">
                    {profile.software.map((tool, i) => (
                      <li
                        key={tool}
                        className="border-2 border-dashed border-amethyst px-4 py-1.5 text-lg font-semibold"
                        style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }}
                      >
                        {tool}
                      </li>
                    ))}
                    <li className="px-1 py-1.5 font-hand text-2xl text-amethyst/80">add the rest in src/data/profile.ts</li>
                  </ul>
                </div>
              </div>
            </div>
          </Drop>

          <div className="mt-12 sm:ml-6">
            <h3 className="font-hand text-4xl font-bold leading-none text-amethyst">what pulls me in</h3>
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-4">
              {interests.map((interest, i) => (
                <li key={interest}>
                  <motion.span
                    className="inline-block cursor-default rounded-sm bg-amethyst px-4 py-2 font-hand text-2xl leading-none text-pearl shadow-ink"
                    style={{ rotate: tagTilts[i % tagTilts.length] }}
                    whileHover={{ rotate: 0, y: -4, backgroundColor: '#C686DD', color: '#2A123F' }}
                  >
                    {interest}
                  </motion.span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
