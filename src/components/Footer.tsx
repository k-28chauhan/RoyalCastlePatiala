import { forwardRef } from 'react'
import { contact, menuLinks, roman } from '../data/content'
import { useScrollTo } from '../hooks/useLenis'
import { Crest, Pill } from './ui'

const stayLinks = ['Deluxe rooms', 'Suites', 'Royal Bridal Suite', 'Wedding packages']

/** Fixed behind <main> on desktop so the page lifts away to reveal it. */
const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  const scrollTo = useScrollTo()
  const go = (href: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollTo(href) }

  return (
    <footer ref={ref} className="relative inset-x-0 bottom-0 z-0 flex min-h-[70vh] flex-col bg-maroon-deep text-sand min-[901px]:fixed">
      <svg className="absolute -top-px left-0 h-[90px] w-full fill-ivory" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,60 C240,120 480,0 720,50 C960,100 1200,10 1440,60 L1440,0 L0,0 Z" />
      </svg>

      <div className="ft-inner grid flex-1 gap-gutter px-gutter pt-[120px] pb-10 min-[901px]:grid-cols-3 min-[901px]:pt-[140px]">
        <ul>
          {menuLinks.slice(0, 6).map((l, i) => (
            <li key={l.label} className="flex items-baseline gap-[22px]">
              <span className="w-6 font-serif text-[11px] opacity-40">{roman[i]}</span>
              <a href={l.href} onClick={go(l.href)} className="font-serif text-2xl leading-[1.7] transition-colors hover:text-white">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2.5 text-[13px]">
          <span className="eyebrow mb-2 opacity-60">More about stays</span>
          {stayLinks.map((s) => <a key={s} href="/rooms" onClick={go('/rooms')} className="opacity-75 hover:opacity-100">{s}</a>)}
        </div>
        <div className="flex flex-col items-start gap-[18px] font-serif text-[17px] min-[901px]:items-center min-[901px]:border-l min-[901px]:border-sand/15 min-[901px]:pl-(--gutter) min-[901px]:text-center">
          <Crest />
          <p>Royal Castle<br />Resort &amp; Marriage Palace</p>
          <p className="opacity-55">{contact.address[0]}<br />{contact.address[1]}</p>
          <p className="opacity-55">{contact.phone}<br />{contact.email}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-sand/12 px-gutter pt-5 pb-7 text-[11px] tracking-widest opacity-80">
        <span>© 2026 Royal Castle</span>
        <span className="flex items-center gap-4 font-serif text-lg tracking-normal">
          Find your stay <Pill href="#contact" variant="light" size="sm">Booking</Pill>
        </span>
        <span>Instagram · Facebook · YouTube</span>
      </div>
    </footer>
  )
})

export default Footer
