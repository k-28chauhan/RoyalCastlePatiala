import { resortPanels } from '../data/content'
import { Pill } from './ui'

/** Three full-height panels; the hovered one widens and reveals its caption. */
export default function Resort() {
  return (
    <section id="resort" className="flex min-h-[560px] flex-col bg-ink md:h-screen md:flex-row">
      {resortPanels.map((p, i) => (
        <div
          key={p.title.join(' ')}
          data-cursor="Discover"
          className="group relative h-[60vh] flex-none overflow-hidden text-white transition-[flex-grow] duration-900 ease-lux after:absolute after:inset-0 after:bg-linear-to-b after:from-black/15 after:to-[#0a0606]/60 md:h-auto md:flex-1 md:hover:grow-[1.6]"
        >
          {p.video ? (
            <video src={p.video} autoPlay muted loop playsInline className="absolute inset-0 transition-transform duration-1400 ease-lux group-hover:scale-105" />
          ) : (
            <img src={p.img} alt="" style={{ objectPosition: p.pos }} className="absolute inset-0 transition-transform duration-1400 ease-lux group-hover:scale-105" />
          )}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center">
            {i === 1 && <span className="marker text-white opacity-80">IV</span>}
            <h3 className="font-serif text-[clamp(30px,3.4vw,52px)] font-light leading-none">
              {p.title[0]}<br />{p.title[1]}
            </h3>
            <p className="max-w-[240px] text-[13px] opacity-90 transition-[opacity,translate] duration-600 ease-lux md:translate-y-3.5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-90">
              {p.text}
            </p>
            {p.cta && <Pill href="#gallery" variant="light" size="sm">The resort</Pill>}
          </div>
        </div>
      ))}
    </section>
  )
}
