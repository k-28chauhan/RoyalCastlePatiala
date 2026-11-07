import { useState, type FormEvent } from 'react'
import { Marker, RevealHeading } from './ui'

const field = 'border-0 border-b border-ink/30 bg-transparent py-2 text-ink outline-none focus:border-maroon'
const label = 'text-[10px] uppercase tracking-[.24em] text-muted'

// Draft only: the form doesn't send anywhere yet.
export default function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <section id="contact" className="flex flex-col items-center gap-[30px] px-gutter pt-[140px] pb-[180px] text-center">
      <Marker>VII</Marker>
      <RevealHeading lines={[{ text: 'Find your date' }, { text: "we'll do the rest", em: true }]} />
      <form onSubmit={submit} className="mt-10 grid w-full max-w-[860px] grid-cols-2 items-end gap-6 md:grid-cols-4">
        <label className="flex flex-col gap-1.5 text-left"><span className={label}>Name</span><input className={field} type="text" required /></label>
        <label className="flex flex-col gap-1.5 text-left"><span className={label}>Phone</span><input className={field} type="tel" required /></label>
        <label className="flex flex-col gap-1.5 text-left">
          <span className={label}>Event</span>
          <select className={field}><option>Wedding</option><option>Party</option><option>Room stay</option><option>Corporate</option></select>
        </label>
        <label className="flex flex-col gap-1.5 text-left"><span className={label}>Date</span><input className={field} type="date" /></label>
        <button type="submit" className="pill pill-dark col-span-full mt-5 cursor-pointer justify-self-center">
          {sent ? "Thank you, we'll call you back" : 'Send enquiry'}
        </button>
      </form>
    </section>
  )
}
