import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoGallery from './VideoGallery'
import KineticMarquee from './KineticMarquee'
import GlitchText from './GlitchText'
import Footer from './Footer'

gsap.registerPlugin(ScrollTrigger)

const PERFORMANCES = [
  { title: 'RITUAL SESSIONS — Live at Fabric',    year: '2024', duration: '48:20' },
  { title: 'UNDERGROUND BROADCAST — Studio Set',  year: '2024', duration: '22:10' },
  { title: 'VOID FESTIVAL — Main Stage',          year: '2023', duration: '1:05:00' },
  { title: 'RESONANCE LAB — Drum Study #4',       year: '2023', duration: '18:40' },
  { title: 'RAW MECHANICS — Jam Session',         year: '2022', duration: '35:15' },
  { title: 'PERCUSSION COLLECTIVE',               year: '2022', duration: '41:05' },
]

const SKILLS = [
  { skill: 'ACOUSTIC DRUMMING',      level: 95 },
  { skill: 'ELECTRONIC PERCUSSION',  level: 90 },
  { skill: 'POLYRHYTHM',             level: 92 },
  { skill: 'LIVE TRIGGERING',        level: 88 },
  { skill: 'JAZZ IMPROVISATION',     level: 80 },
  { skill: 'LATIN RHYTHMS',          level: 85 },
]

const STATS = [
  { n: '10+',  label: 'Years Performing' },
  { n: '200+', label: 'Live Shows'       },
  { n: '15+',  label: 'Countries'        },
]

const KITS = [
  { category: 'ACOUSTIC KIT',   items: ['Pearl Masters Premium', 'Paiste 2002 Cymbals', 'Remo Ambassador Heads'] },
  { category: 'ELECTRONIC',     items: ['Roland V-Drums TD-50', 'Ableton Push 3', 'Native Instruments Maschine'] },
  { category: 'TRIGGERS',       items: ['Roland RT-30K', 'ddrum Chrome Elite', 'Sennheiser e604'] },
  { category: 'MONITORING',     items: ['In-Ear IEM Setup', 'Sennheiser HD 25', 'Custom Wedge Mix'] },
]

export default function DrummerWorld({ onBack }) {
  const rootRef   = useRef(null)
  const barsRef   = useRef([])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      /* slide in from right */
      gsap.from(el, { x: '100%', duration: 0.75, ease: 'expo.out' })

      /* reveal elements */
      gsap.utils.toArray('.rev').forEach((node, i) => {
        gsap.from(node, {
          y: 55, opacity: 0, duration: 0.75, ease: 'power3.out',
          delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: node, scroller: el, start: 'top 88%' },
        })
      })

      /* skill bar animations */
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        const targetW = bar.dataset.level + '%'
        gsap.from(bar, {
          scaleX: 0, transformOrigin: 'left',
          duration: 1.1, ease: 'expo.out',
          delay: i * 0.07,
          scrollTrigger: { trigger: bar, scroller: el, start: 'top 92%' },
        })
      })

      /* skew on scroll */
      ScrollTrigger.create({
        scroller: el,
        onUpdate: (self) => {
          const skew = Math.min(Math.abs(self.getVelocity() / 180), 7)
          gsap.to('.skew-el', { skewY: self.direction === 1 ? -skew : skew, ease: 'power3.out', overwrite: true })
          clearTimeout(el._skewT)
          el._skewT = setTimeout(() => gsap.to('.skew-el', { skewY: 0, ease: 'expo.out' }), 200)
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 bg-black overflow-y-auto overflow-x-hidden z-10"
    >
      {/* back */}
      <button
        onClick={onBack}
        className="fixed top-5 left-5 z-50 flex items-center gap-3 group"
        data-cursor-hover
      >
        <span className="w-8 h-px bg-[#FF0033] block transition-all duration-300 group-hover:w-3" />
        <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase group-hover:text-white transition-colors">
          BACK
        </span>
      </button>

      <div className="fixed top-5 right-5 z-50">
        <span className="font-mono text-[8px] text-white/20 tracking-widest">WORLD II / II</span>
      </div>

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-14 lg:px-20 pt-24">
        <div className="max-w-7xl mx-auto w-full">
          <span className="font-mono text-[#FF0033] text-[9px] tracking-[0.55em] uppercase block mb-5">
            02 — THE KINETIC WORLD
          </span>

          <GlitchText
            text="DRUMMER &"
            as="h1"
            className="font-bebas text-white leading-[0.88] block skew-el will-change-transform"
            style={{ fontSize: 'clamp(48px, 11vw, 155px)' }}
          />
          <GlitchText
            text="PERFORMER"
            as="h1"
            className="font-bebas text-[#FF0033] leading-[0.88] block skew-el will-change-transform"
            style={{ fontSize: 'clamp(48px, 11vw, 155px)' }}
          />

          <p className="mt-10 max-w-xl text-white/45 font-display text-[15px] leading-relaxed">
            Raw kinetic energy translated into rhythm. From intimate studio sessions to
            high-voltage festival stages — the drums are not an instrument, they are a
            language. Every hit, every silence, intentional.
          </p>

          <div className="mt-14 flex gap-10 md:gap-16">
            {STATS.map(({ n, label }) => (
              <div key={label} className="rev">
                <span className="font-bebas text-[#FF0033] text-5xl md:text-6xl leading-none">{n}</span>
                <p className="font-mono text-[8px] text-white/25 tracking-widest uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEES ── */}
      <KineticMarquee
        items={['LIVE PERFORMANCE', 'ACOUSTIC DRUMS', 'ELECTRONIC', 'RHYTHM', 'KINETIC', 'POWER', 'PRECISION', 'RAW']}
        speed={24}
        direction="left"
        className="border-y border-white/5"
      />
      <KineticMarquee
        items={['POLYRHYTHM', 'GROOVE', 'BPM', 'ANALOG', 'TRIGGER', 'HIT', 'VELOCITY', 'RESONANCE']}
        speed={32}
        direction="right"
        className="border-b border-white/5"
      />

      {/* ── VIDEO GALLERY ── */}
      <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end gap-4 mb-10 rev">
            <div className="w-px self-stretch bg-[#FF0033]" />
            <div>
              <span className="font-mono text-[#FF0033] text-[9px] tracking-[0.4em] uppercase">02</span>
              <h2
                className="font-bebas text-white leading-none"
                style={{ fontSize: 'clamp(36px, 7vw, 90px)' }}
              >
                LIVE SESSIONS
              </h2>
            </div>
          </div>

          <VideoGallery performances={PERFORMANCES} />
        </div>
      </section>

      {/* ── PERCUSSION MAP ── */}
      <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end gap-4 mb-12 rev">
            <div className="w-px self-stretch bg-[#FF0033]" />
            <div>
              <span className="font-mono text-[#FF0033] text-[9px] tracking-[0.4em] uppercase">03</span>
              <h2
                className="font-bebas text-white leading-none"
                style={{ fontSize: 'clamp(36px, 7vw, 90px)' }}
              >
                PERCUSSION MAP
              </h2>
            </div>
          </div>

          <div className="space-y-6 max-w-2xl">
            {SKILLS.map(({ skill, level }, i) => (
              <div key={skill} className="rev">
                <div className="flex justify-between mb-1.5">
                  <span className="font-mono text-white/40 text-[9px] tracking-widest uppercase">{skill}</span>
                  <span className="font-mono text-[#FF0033] text-[9px]">{level}%</span>
                </div>
                <div className="h-px bg-white/8 relative overflow-hidden">
                  <div
                    ref={el => (barsRef.current[i] = el)}
                    data-level={level}
                    className="absolute inset-0 bg-[#FF0033] will-change-transform"
                    style={{ width: `${level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KIT SPECS ── */}
      <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end gap-4 mb-12 rev">
            <div className="w-px self-stretch bg-[#FF0033]" />
            <div>
              <span className="font-mono text-[#FF0033] text-[9px] tracking-[0.4em] uppercase">04</span>
              <h2
                className="font-bebas text-white leading-none"
                style={{ fontSize: 'clamp(36px, 7vw, 90px)' }}
              >
                KIT SPECS
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {KITS.map((g) => (
              <div key={g.category} className="rev">
                <h3 className="font-mono text-[#FF0033] text-[8px] tracking-[0.4em] uppercase mb-4 pb-2 border-b border-[#FF0033]/15">
                  {g.category}
                </h3>
                <ul className="space-y-2">
                  {g.items.map(item => (
                    <li key={item} className="font-mono text-white/35 text-[10px] flex items-start gap-2">
                      <span className="w-1 h-1 bg-[#FF0033] rounded-full flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer scroller={rootRef.current} />
    </div>
  )
}
