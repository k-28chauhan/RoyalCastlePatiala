import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { useNavigate } from 'react-router-dom'
import { gsap, ScrollTrigger, reduceMotion } from '../lib/gsap'

const LenisContext = createContext<Lenis | null>(null)

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduceMotion) return
    const instance = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => instance.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)

/**
 * Navigate to an href: `#id` smooth-scrolls on the current page (or jumps home first if the
 * target lives there), `/path` changes page, anything else is left to the browser.
 */
export function useScrollTo() {
  const lenis = useLenis()
  const navigate = useNavigate()
  return (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector<HTMLElement>(href)
      if (!el) return navigate('/' + href)
      if (lenis) lenis.scrollTo(el, { duration: 1.6 })
      else el.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (href.startsWith('/')) return navigate(href)
    window.location.href = href
  }
}
