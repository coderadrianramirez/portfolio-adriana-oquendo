import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import KineticMarquee from './KineticMarquee'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  { name: 'INSTAGRAM',  href: 'https://instagram.com/nano.moreno' },
  { name: 'SPOTIFY',    href: '#' },
  { name: 'SOUNDCLOUD', href: '#' },
  { name: 'BANDCAMP',   href: '#' },
]

export default function Footer({ scroller }) {
  const nameRef   = useRef(null)
  const formRef   = useRef(null)
  const [form, setForm]   = useState({ name: '', email: '', message: '' })
  const [sent, setSent]   = useState(false)
  const [focus, setFocus] = useState(null)

  useEffect(() => {
    if (!nameRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nameRef.current,
        { x: '-4%', opacity: 0 },
        {
          x: '0%', opacity: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: {
            trigger: nameRef.current,
            scroller,
            start: 'top 92%',
          },
        }
      )

      gsap.utils.toArray(formRef.current?.querySelectorAll('.form-row') ?? []).forEach((el, i) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
          delay: i * 0.08,
          scrollTrigger: { trigger: el, scroller, start: 'top 95%' },
        })
      })
    })
    return () => ctx.revert()
  }, [scroller])

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 3500)
  }

  const inputClass =
    'w-full bg-transparent border-b pb-2.5 font-mono text-[11px] text-white tracking-widest placeholder-white/18 focus:outline-none transition-colors duration-200'

  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">

      {/* ── Kinetic name ── */}
      <div className="pt-16 md:pt-24 pb-4 px-6 md:px-10 overflow-hidden">
        <h2
          ref={nameRef}
          className="font-bebas text-white leading-none whitespace-nowrap will-change-transform select-none"
          style={{ fontSize: 'clamp(56px, 13vw, 210px)', opacity: 0 }}
        >
          NANO MORENO
        </h2>
      </div>

      {/* ── Marquee band ── */}
      <KineticMarquee
        items={['PRODUCER', 'SOUND DESIGNER', 'DRUMMER', 'PERFORMER', 'NANO MORENO']}
        speed={22}
        direction="left"
        className="border-t border-b border-white/5"
        textSize="text-2xl md:text-4xl"
      />

      {/* ── Contact grid ── */}
      <div className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* Left */}
          <div>
            <span className="font-mono text-[#FF0033] text-[9px] tracking-[0.5em] uppercase block mb-5">
              GET IN TOUCH
            </span>
            <h3
              className="font-bebas text-white leading-[0.9] mb-10"
              style={{ fontSize: 'clamp(40px, 7vw, 90px)' }}
            >
              LET'S BUILD<br />SOMETHING<br />DARK.
            </h3>

            <div className="space-y-5 mb-12">
              {[
                { label: 'BOOKING',        email: 'booking@nanomoreno.com' },
                { label: 'PRESS',          email: 'press@nanomoreno.com' },
                { label: 'COLLABORATIONS', email: 'collab@nanomoreno.com' },
              ].map(({ label, email }) => (
                <div key={label}>
                  <span className="font-mono text-white/18 text-[8px] tracking-[0.4em] uppercase">{label}</span>
                  <p className="font-display text-white/50 text-sm mt-0.5">{email}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-5">
              {SOCIALS.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[8px] text-white/25 hover:text-[#FF0033] transition-colors tracking-[0.35em] uppercase"
                  data-cursor-hover
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form ref={formRef} onSubmit={submit} className="flex flex-col gap-7">
            {[
              { key: 'name',    placeholder: 'YOUR NAME',    type: 'text' },
              { key: 'email',   placeholder: 'YOUR EMAIL',   type: 'email' },
            ].map(({ key, placeholder, type }) => (
              <div key={key} className="form-row">
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  required
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  onFocus={() => setFocus(key)}
                  onBlur={() => setFocus(null)}
                  className={`${inputClass} ${focus === key ? 'border-[#FF0033]' : 'border-white/10'}`}
                />
              </div>
            ))}

            <div className="form-row">
              <textarea
                placeholder="YOUR MESSAGE"
                rows={5}
                value={form.message}
                required
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                onFocus={() => setFocus('message')}
                onBlur={() => setFocus(null)}
                className={`${inputClass} resize-none ${focus === 'message' ? 'border-[#FF0033]' : 'border-white/10'}`}
              />
            </div>

            <div className="form-row pt-2">
              <button
                type="submit"
                className="flex items-center gap-4 group"
                data-cursor-hover
              >
                <span className="font-bebas text-2xl text-white group-hover:text-[#FF0033] transition-colors tracking-wider">
                  {sent ? 'MESSAGE SENT.' : 'SEND MESSAGE'}
                </span>
                <span className="w-10 h-px bg-[#FF0033] block transition-all duration-300 group-hover:w-20" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/5 px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
        <span className="font-mono text-white/15 text-[8px] tracking-widest uppercase">
          © {new Date().getFullYear()} NANO MORENO — ALL RIGHTS RESERVED
        </span>
        <span className="font-mono text-white/8 text-[8px] tracking-widest uppercase">
          DESIGNED &amp; BUILT WITH DARK INTENT
        </span>
      </div>
    </footer>
  )
}
