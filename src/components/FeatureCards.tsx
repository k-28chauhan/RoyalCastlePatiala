import { useRef } from 'react'
import { gsap, useGSAP, reduceMotion } from '../lib/gsap'
import { Pill, SectionHead, type HeadingLine } from './ui'

export interface FeatureCard {
  title: string
  /** Small line above the title (guest count, type…). */
  tag: string
  img: string
  pos?: string
}

function Card({ card, flip }: { card: FeatureCard; flip: boolean }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (reduceMotion) return
    const st = { trigger: ref.current, start: 'top 80%' }
    gsap.fromTo('.fc-img', { clipPath: 'inset(20% 20% 20% 20%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', scrollTrigger: st })
    gsap.from('.fc-img img', { scale: 1.4, duration: 1.8, ease: 'expo.out', scrollTrigger: st })
    gsap.from('.fc-info', { autoAlpha: 0, y: 40, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 70%' } })
  }, { scope: ref })

  return (
    <article ref={ref} className="grid items-center gap-[clamp(24px,6vw,112px)] sm:grid-cols-2">
      <figure data-cursor="View" className={`fc-img group relative aspect-square overflow-hidden ${flip ? 'sm:order-2' : ''}`}>
        <img src={card.img} alt={card.title} style={{ objectPosition: card.pos }} className="transition-transform duration-1200 ease-lux group-hover:scale-108" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-[26px] border border-white/45" />
      </figure>
      <div className="fc-info flex flex-col items-center gap-5 text-center">
        <span className="text-[11px] tracking-[.3em] opacity-60">{card.tag}</span>
        <h3 className="font-serif text-[clamp(30px,3.4vw,58px)] font-normal leading-[1.15]">{card.title}</h3>
        <Pill href="#contact" className="mt-4 px-12 py-4">More</Pill>
      </div>
    </article>
  )
}

interface Props {
  marker: string
  eyebrow: string
  lines: HeadingLine[]
  cards: FeatureCard[]
}

/** Alternating photo / text rows. Each photo has a thin inset border. */
export default function FeatureCards({ marker, eyebrow, lines, cards }: Props) {
  return (
    <section id="cards" className="pt-[140px] pb-40">
      <SectionHead marker={marker} eyebrow={eyebrow} lines={lines} />
      <div className="mx-auto mt-[100px] grid max-w-[1460px] gap-y-[130px] px-gutter">
        {cards.map((c, i) => <Card key={c.title} card={c} flip={i % 2 === 1} />)}
      </div>
    </section>
  )
}
