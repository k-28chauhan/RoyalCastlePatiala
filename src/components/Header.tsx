import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { useLenis, useScrollTo } from '../hooks/useLenis'
import { media, menuLinks, navLinks, roman } from '../data/content'
import { Crest } from './ui'

export default function Header({ visible }: { visible: boolean }) {
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuTl = useRef<gsap.core.Timeline>(null)
  const lenis = useLenis()
  const scrollTo = useScrollTo()
  const { pathname } = useLocation()

  // Hide on scroll down, show on scroll up; go solid once past the hero.
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        setHidden(self.direction === 1 && y > 200)
        setSolid(y > window.innerHeight * 0.85)
      },
    })
    return () => st.kill()
  })

  useGSAP(() => {
    menuTl.current = gsap.timeline({ paused: true })
      .set(menuRef.current, { visibility: 'visible' })
      .to(menuRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'expo.inOut' })
      .from('.menu-link', { yPercent: 110, duration: 0.8, stagger: 0.05, ease: 'expo.out' }, '-=0.35')
      .from('.menu-img', { scale: 1.3, duration: 1.2, ease: 'expo.out' }, '<')
  }, { scope: menuRef })

  const toggle = (next = !open) => {
    setOpen(next)
    if (next) { menuTl.current?.timeScale(1).play(); lenis?.stop() }
    else { menuTl.current?.timeScale(1.6).reverse(); lenis?.start() }
  }

  // Logo: home page hero from anywhere (smooth to the top if already home)
  const goHome = (e: React.MouseEvent) => {
    e.preventDefault()
    if (open) toggle(false)
    scrollTo(pathname === '/' ? '#top' : '/')
  }

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (open) toggle(false)
    scrollTo(href)
  }

  const tone = open ? 'text-sand' : solid ? 'bg-ivory/92 text-ink backdrop-blur-md' : 'text-white'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,opacity,background-color,color] duration-600 ease-lux ${tone} ${
          hidden && !open ? '-translate-y-full' : ''
        } ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-gutter py-[18px]">
          <button onClick={() => toggle()} data-cursor="Menu" aria-label="Toggle menu" className="flex cursor-pointer items-center gap-3 justify-self-start text-[11px] uppercase tracking-[.2em]">
            <span className="grid w-[18px] gap-[5px]">
              <i className={`h-px bg-current transition-transform duration-400 ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
              <i className={`h-px bg-current transition-transform duration-400 ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </span>
            <span>{open ? 'Close' : 'Menu'}</span>
          </button>
          <a href="/" onClick={goHome} className="flex items-center gap-[18px]" aria-label="Royal Castle home">
            <span className="hidden text-[7px] tracking-[.4em] opacity-60 md:inline">✦ ✦ ✦ ✦</span>
            <Crest />
            <span className="hidden text-[7px] tracking-[.4em] opacity-60 md:inline">✦ ✦ ✦ ✦</span>
          </a>
          <a href="#contact" onClick={go('#contact')} className="justify-self-end text-[10px] uppercase tracking-[.2em] md:text-[11px]">
            Book now
          </a>
        </div>
        {!solid && !open && (
          <nav className="hidden justify-center gap-[clamp(16px,2.5vw,40px)] border-b border-white/20 px-gutter pt-1 pb-4 text-[10px] uppercase tracking-[.24em] lg:flex">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={go(l.href)} className="opacity-85 transition-opacity hover:opacity-100">{l.label}</a>
            ))}
          </nav>
        )}
      </header>

      <div ref={menuRef} aria-hidden={!open} className="invisible fixed inset-0 z-45 bg-maroon-deep text-sand [clip-path:inset(0_0_100%_0)]">
        <div className="grid h-full grid-cols-1 items-center gap-gutter px-gutter pt-[120px] pb-10 lg:grid-cols-[1.2fr_1fr]">
          <ul>
            {menuLinks.map((l, i) => (
              <li key={l.label} className="flex items-baseline gap-6 overflow-hidden">
                <span className="w-8 font-serif text-[13px] opacity-45">{roman[i]}</span>
                <a href={l.href} onClick={go(l.href)} className="menu-link inline-block font-serif text-[clamp(32px,5vw,64px)] font-light leading-[1.2] transition-[color,translate] duration-500 ease-lux hover:translate-x-3 hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden h-[70vh] overflow-hidden lg:block">
            <img className="menu-img" src={media.entrance} alt="Royal Castle entrance lit up at dusk" />
          </div>
        </div>
      </div>
    </>
  )
}
