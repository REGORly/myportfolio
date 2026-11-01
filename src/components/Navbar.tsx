import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useActiveSection } from '../lib/hooks'
import { Squiggle } from './Doodles'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'playground', label: 'Playground' },
  { id: 'contact', label: 'Contact' },
]
const ids = links.map((l) => l.id)

export default function Navbar() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary"
        className="relative z-50 mx-auto flex max-w-5xl items-center justify-between rounded-full border border-pearl/10 bg-imperial/80 px-5 py-2.5 shadow-ink backdrop-blur-md"
      >
        <a href="#home" onClick={() => setOpen(false)} className="text-2xl font-extrabold leading-none tracking-tight text-pearl condensed" data-cursor="Top">
          REGOR<span className="text-orchid">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'page' : undefined}
                className={`relative block rounded-full px-4 py-1.5 text-[0.95rem] font-medium transition-colors ${
                  active === link.id ? 'text-pearl' : 'text-lavender hover:text-pearl'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span layoutId="nav-squiggle" className="absolute inset-x-4 -bottom-0.5 h-2 text-orchid">
                    <Squiggle className="h-full w-full" />
                  </motion.span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="relative -mr-2 flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-0.5 w-full rounded bg-pearl transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 h-0.5 w-full rounded bg-pearl transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-imperial px-8 md:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.25rem) 2.75rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.25rem) 2.75rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.25rem) 2.75rem)' }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
          >
            <div aria-hidden className="dot-grid absolute inset-0 opacity-70" />
            <ul className="relative flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={`block text-[3.2rem] font-extrabold leading-[1.05] tracking-tight condensed ${
                      active === link.id ? 'text-orchid' : 'text-pearl'
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="relative mt-10 font-hand text-2xl text-lavender">Pune, India</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
