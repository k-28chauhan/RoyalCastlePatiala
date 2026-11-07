import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { useScrollTo } from '../hooks/useLenis'

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

export function Crest({ className = 'size-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth=".6" />
      <path d="M18 42V27l4 3 4-7 6 6 6-6 4 7 4-3v15z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M18 46h28" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="32" cy="20" r="1.6" fill="currentColor" />
    </svg>
  )
}

export function Marker({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx('marker', 'reveal-up', className)}>{children}</span>
}

interface PillProps {
  href: string
  children: ReactNode
  variant?: 'default' | 'light' | 'dark'
  size?: 'md' | 'sm'
  className?: string
  cursor?: string
}

/** Rounded CTA with a fill-on-hover; in-page links smooth-scroll, `/paths` change page. */
export function Pill({ href, children, variant = 'default', size = 'md', className, cursor }: PillProps) {
  const scrollTo = useScrollTo()
  return (
    <a
      href={href}
      data-cursor={cursor}
      className={cx('pill', variant === 'light' && 'pill-light', variant === 'dark' && 'pill-dark', size === 'sm' && 'pill-sm', className)}
      onClick={(e) => {
        if (!href.startsWith('#') && !href.startsWith('/')) return
        e.preventDefault()
        scrollTo(href)
      }}
    >
      {children}
    </a>
  )
}

/** Splits a string into masked words (`.word`) for GSAP to animate. */
export function Words({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[.08em] align-top">
          <span className="word inline-block">{w}</span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </>
  )
}

/** Splits a string into characters (`.char`). */
export function Chars({ text }: { text: string }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span key={i} className="char inline-block">
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </>
  )
}

export interface HeadingLine { text: string; em?: boolean }

/** Section heading whose words rise out of a mask when scrolled into view. */
export function RevealHeading({ lines, className }: { lines: HeadingLine[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  useGSAP(() => {
    if (reduceMotion) return
    gsap.from('.word', {
      yPercent: 110, duration: 1.2, stagger: 0.06, ease: 'expo.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    })
  }, { scope: ref })
  return (
    <h2 ref={ref} className={cx('heading', className)}>
      {lines.map((l, i) => (
        <span key={i} className="block">
          {l.em ? <em><Words text={l.text} /></em> : <Words text={l.text} />}
        </span>
      ))}
    </h2>
  )
}

export function SectionHead({ marker, eyebrow, lines }: { marker: string; eyebrow?: string; lines: HeadingLine[] }) {
  return (
    <div className="flex flex-col items-center gap-[18px] px-gutter">
      <Marker>{marker}</Marker>
      {eyebrow && <span className="eyebrow reveal-up -mt-2 opacity-50">{eyebrow}</span>}
      <RevealHeading lines={lines} />
    </div>
  )
}
