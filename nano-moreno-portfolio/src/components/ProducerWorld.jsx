import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AudioPlayer from './AudioPlayer'
import KineticMarquee from './KineticMarquee'
import GlitchText from './GlitchText'
import Footer from './Footer'

gsap.registerPlugin(ScrollTrigger)

const TRACKS = [
  { title: 'VORTEX',              duration: '4:32', genre: 'Industrial Techno',   bpm: 138 },
  { title: 'CAVERN RESONANCE',    duration: '6:18', genre: 'Dark Ambient',        bpm: 0   },
  { title: 'PERCUSSION STUDY 7',  duration: '3:45', genre: 'Rhythmic Noise',      bpm: 160 },
  { title: 'SUBSURFACE',          duration: '5:20', genre: 'Dub Techno',          bpm: 128 },
  { title: 'BLACKSITE',           duration: '7:02', genre: 'Experimental',        bpm: 145 },
]

const CREDITS = [
  { project: 'OBSCURA — DEBUT EP',      role: 'Producer · Mix · Master',  year: '2024' },
  { project: 'VOID SESSIONS VOL.3',     role: 'Sound Designer',            year: '2024' },
  { project: 'RITUAL COLLECTIVE',       role: 'Live Arrangement',          year: '2023' },
  { project: 'UNDERGROUND BROADCAST',   role: 'Co-Producer',               year: '2023' },
  { project: 'SILENT MECHANICS',        role: 'Producer',                  year: '2022' },
  { project: 'RESONANCE FESTIVAL',      role: 'Sound Designer',            year: '2022' },
]

const GEAR = [
  { category: 'SYNTHESIS',   items: ['Roland TR-8S', 'Korg Minilogue XD', 'Arturia MicroFreak', 'Moog DFAM'] },
  { category: 'SOFTWARE',    items: ['Ableton Live 12', 'Max/MSP', 'Serum', 'Granulator III'] },
  { category: 'PROCESSING',  items: ['UAD Apollo Twin', 'Strymon BigSky', 'Empress Zoia'] },
  { category: 'MONITORING',  items: ['Focal Solo6', 'AKG K702', 'Auratone 5C'] },
]

const STATS = [
  { n: '50+',  label: 'Tracks Produced' },
  { n: '12+',  label: 'Sound Packs'     },
  { n: '8+',   label: 'Artist Credits'  },
]

export default function ProducerWorld({ onBack }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      /* slide in from left */
      gsap.from(el, { x: '-100%', duration: 0.75, ease: 'expo.out' })

      /* scroll-reveal elements */
      gsap.utils.toArray('.rev').forEach((node, i) => {
        gsap.from(node, {
          y: 55, opacity: 0, duration: 0.75, ease: 'power3.out',
          delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: node, scroller: el, start: 'top 88%' },
        })
      })

      /* skew on scroll velocity */
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
      {/* ── back button ── */}
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
        <span className="font-mono text-[8px] text-white/20 tracking-widest">WORLD I / II</span>
      </div>

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-14 lg:px-20 pt-24">
        <div className="max-w-7xl mx-auto w-full">
          <span className="font-mono text-[#FF0033] text-[9px] tracking-[0.55em] uppercase block mb-5">
            01 — THE SONIC WORLD
          </span>

          <GlitchText
            text="PRODUCER &"
            as="h1"
            className="font-bebas text-white leading-[0.88] block skew-el will-change-transform"
            style={{ fontSize: 'clamp(48px, 11vw, 155px)' }}
          />
          <GlitchText
            text="SOUND DESIGNER"
            as="h1"
            className="font-bebas text-[#FF0033] leading-[0.88] block skew-el will-change-transform"
            style={{ fontSize: 'clamp(48px, 11vw, 155px)' }}
          />

          <p className="mt-10 max-w-xl text-white/45 font-display text-[15px] leading-relaxed">
            Crafting sonic architectures at the intersection of industrial techno and
            ambient sound design. Each track is an immersive experience — built from
            layered textures, percussive brutality, and electronic depth.
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
        items={['INDUSTRIAL TECHNO', 'SOUND DESIGN', 'ABLETON LIVE', 'DARK AMBIENT', 'SYNTHESIS', 'MIXING', 'MASTERING', 'MODULAR']}
        speed={28}
        direction="left"
        className="border-y border-white/5"
      />
      <KineticMarquee
        items={['UNDERGROUND', 'ELECTRONIC', 'EXPERIMENTAL', 'NOISE', 'PERCUSSION', 'TEXTURE', 'DEPTH', 'FREQUENCY']}
        speed={34}
        direction="right"
        className="border-b border-white/5"
      />

      {/* ── AUDIO WORKS ── */}
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
                AUDIO WORKS
              </h2>
            </div>
          </div>

          <div className="space-y-2">
            {TRACKS.map((track, i) => (
              <div key={track.title} className="rev">
                <AudioPlayer track={track} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDITS ── */}
      <section className="py-20 md:py-28 px-6 md:px-14 lg:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end gap-4 mb-10 rev">
            <div className="w-px self-stretch bg-[#FF0033]" />
            <div>
              <span className="font-mono text-[#FF0033] text-[9px] tracking-[0.4em] uppercase">03</span>
              <h2
                className="font-bebas text-white leading-none"
                style={{ fontSize: 'clamp(36px, 7vw, 90px)' }}
              >
                CREDITS
              </h2>
            </div>
          </div>

          <div>
            {CREDITS.map((c, i) => (
              <div
                key={c.project}
                className="rev flex items-center justify-between py-4 md:py-5 border-b border-white/5 group hover:border-[#FF0033]/20 transition-colors"
              >
                <div className="flex items-center gap-4 md:gap-6 min-w-0">
                  <span className="font-mono text-[#FF0033]/35 text-[9px] w-5 flex-shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bebas text-white text-xl md:text-2xl leading-tight group-hover:text-[#FF0033] transition-colors truncate">
                      {c.project}
                    </h3>
                    <span className="font-mono text-white/25 text-[9px] tracking-wider uppercase">{c.role}</span>
                  </div>
                </div>
                <span className="font-mono text-white/18 text-xs flex-shrink-0 ml-4">{c.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH RIDER ── */}
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
                TECH RIDER
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {GEAR.map((g) => (
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
