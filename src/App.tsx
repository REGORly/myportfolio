import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Playground from './sections/Playground'
import Contact from './sections/Contact'
import CaseStudy from './sections/CaseStudy'
import { projects } from './data/projects'

/** Case studies live at #/work/<slug> so they can be linked to and closed with the back button. */
const readSlug = () => {
  const match = window.location.hash.match(/^#\/work\/(.+)$/)
  return match ? decodeURIComponent(match[1]) : null
}

export default function App() {
  const [slug, setSlug] = useState<string | null>(readSlug)

  useEffect(() => {
    const sync = () => setSlug(readSlug())
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  const open = useCallback((next: string) => {
    window.history.pushState(null, '', `#/work/${encodeURIComponent(next)}`)
    setSlug(next)
  }, [])

  const close = useCallback(() => {
    window.history.replaceState(null, '', '#work')
    setSlug(null)
  }, [])

  const project = slug ? projects.find((p) => p.slug === slug) : undefined

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-orchid focus:px-4 focus:py-2 focus:text-imperial"
      >
        Skip to work
      </a>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work onOpen={open} />
        <Playground />
        <Contact />
      </main>
      <AnimatePresence>
        {project && <CaseStudy key="case-study" project={project} onClose={close} onNavigate={open} />}
      </AnimatePresence>
    </>
  )
}
