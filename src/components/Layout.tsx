import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from '../lib/gsap'
import { useLenis } from '../hooks/useLenis'
import Loader from './Loader'
import Cursor from './Cursor'
import Header from './Header'
import Footer from './Footer'

export interface LayoutContext { loaded: boolean }

/** Chrome shared by every page: loader (first visit to home only), cursor, header, footer curtain. */
export default function Layout() {
  const { pathname, hash } = useLocation()
  const [loaded, setLoaded] = useState(pathname !== '/')
  const lenis = useLenis()
  const mainRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  // Lock scrolling until the preloader finishes.
  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden'
    if (loaded) lenis?.start()
    else lenis?.stop()
  }, [loaded, lenis])

  // New page → top (or to its #hash once the page has laid out).
  useEffect(() => {
    const jump = () => {
      const el = hash ? document.querySelector<HTMLElement>(hash) : null
      if (el) lenis ? lenis.scrollTo(el, { immediate: true }) : el.scrollIntoView()
      else lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
    }
    jump()
    const t = window.setTimeout(() => { ScrollTrigger.refresh(); if (hash) jump() }, 200)
    return () => window.clearTimeout(t)
  }, [pathname, hash, lenis])

  // Reserve space under <main> so the fixed footer is revealed at the end (desktop only).
  useEffect(() => {
    const footer = footerRef.current!
    const main = mainRef.current!
    const size = () => {
      main.style.marginBottom = window.innerWidth > 900 ? `${footer.offsetHeight}px` : '0px'
      ScrollTrigger.refresh()
    }
    const ro = new ResizeObserver(size)
    ro.observe(footer)
    window.addEventListener('load', size)
    return () => { ro.disconnect(); window.removeEventListener('load', size) }
  }, [])

  // Per-page scroll effects shared by all pages. Re-runs on navigation (children have mounted by then).
  useGSAP(() => {
    if (reduceMotion) return
    gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
      gsap.from(el, { autoAlpha: 0, y: 20, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
    })
    // Page background drifts ivory → slate approaching the events section, then back after it.
    if (document.querySelector('#events')) {
      const tint = (from: string, to: string, start: string, end: string) =>
        gsap.fromTo(mainRef.current, { backgroundColor: from }, {
          backgroundColor: to, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: '#events', start, end, scrub: true },
        })
      tint('#f8f5ef', '#6b6a7a', 'top 85%', 'top 15%')
      tint('#6b6a7a', '#f8f5ef', 'bottom 85%', 'bottom 15%')
    }
    gsap.from('.ft-inner > *', {
      y: 80, autoAlpha: 0, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: '#contact', start: 'bottom bottom', end: () => `+=${footerRef.current?.offsetHeight ?? 0}`, scrub: true },
    })
  }, { scope: mainRef, dependencies: [pathname], revertOnUpdate: true })

  const ctx: LayoutContext = { loaded }
  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Cursor />
      <Header visible={loaded} />
      <main id="top" ref={mainRef} className="relative z-10 bg-ivory">
        <Outlet context={ctx} />
      </main>
      <Footer ref={footerRef} />
    </>
  )
}
