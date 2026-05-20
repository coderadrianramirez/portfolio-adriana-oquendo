import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/* ── EQ bars background (producer side) ─────────────────── */
function EQBars() {
  const bars = Array.from({ length: 24 }, (_, i) => i)
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-[3px] px-8 pb-0 pointer-events-none overflow-hidden opacity-10">
      {bars.map((i) => {
        const delay = (Math.random() * 0.8).toFixed(2)
        const dur   = (0.4 + Math.random() * 0.7).toFixed(2)
        const h     = (20 + Math.random() * 55).toFixed(0)
        return (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-[#FF0033] to-transparent"
            style={{
              height: `${h}%`,
              transformOrigin: 'bottom',
              animation: `eq-bar ${dur}s ease-in-out ${delay}s infinite alternate`,
            }}
          />
        )
      })}
    </div>
  )
}

/* ── BPM dot-grid background (drummer side) ─────────────── */
function BPMGrid() {
  const dots = Array.from({ length: 64 }, (_, i) => i)
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
      <div className="grid grid-cols-8 gap-4 md:gap-6">
        {dots.map((i) => {
          const delay = ((i % 8) * 0.125 + Math.floor(i / 8) * 0.06).toFixed(3)
          return (
            <div
              key={i}
              className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#FF0033]"
              style={{
                animation: `bpm-dot 0.5s ease-in-out ${delay}s infinite`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function SplitScreen({ onEnterWorld }) {
  const containerRef = useRef(null)
  const leftRef      = useRef(null)
  const rightRef     = useRef(null)
  const dividerRef   = useRef(null)
  const [active, setActive] = useState(null)

  /* entrance animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current,    { x: '-100%', duration: 1.1, ease: 'expo.out', delay: 0.1 })
      gsap.from(rightRef.current,   { x: '100%',  duration: 1.1, ease: 'expo.out', delay: 0.1 })
      gsap.from(dividerRef.current, { scaleY: 0,  duration: 0.9, ease: 'expo.out', delay: 0.5 })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const expand = (side) => {
    setActive(side)
    if (side === 'producer') {
      gsap.to(leftRef.current,  { flexBasis: '63%', duration: 0.55, ease: 'power3.out' })
      gsap.to(rightRef.current, { flexBasis: '37%', duration: 0.55, ease: 'power3.out' })
    } else {
      gsap.to(leftRef.current,  { flexBasis: '37%', duration: 0.55, ease: 'power3.out' })
      gsap.to(rightRef.current, { flexBasis: '63%', duration: 0.55, ease: 'power3.out' })
    }
  }

  const reset = () => {
    setActive(null)
    gsap.to([leftRef.current, rightRef.current], { flexBasis: '50%', duration: 0.55, ease: 'power3.out' })
  }

  const enter = (world) => {
    const tl = gsap.timeline({ onComplete: () => onEnterWorld(world) })
    if (world === 'producer') {
      tl.to(rightRef.current, { x: '100%', opacity: 0, duration: 0.45, ease: 'power3.in' })
        .to(dividerRef.current, { opacity: 0, duration: 0.2 }, '<')
        .to(leftRef.current,  { x: '-100%', opacity: 0, duration: 0.35, ease: 'power2.in' }, '-=0.15')
    } else {
      tl.to(leftRef.current,  { x: '-100%', opacity: 0, duration: 0.45, ease: 'power3.in' })
        .to(dividerRef.current, { opacity: 0, duration: 0.2 }, '<')
        .to(rightRef.current, { x: '100%',  opacity: 0, duration: 0.35, ease: 'power2.in' }, '-=0.15')
    }
  }

  const panelBase =
    'relative flex flex-col items-center justify-center overflow-hidden transition-colors duration-300'

  return (
    <div ref={containerRef} className="fixed inset-0 flex bg-black overflow-hidden">

      {/* ── SVG distortion filters ── */}
      <svg className="absolute w-0 h-0" aria-hidden>
        <defs>
          <filter id="wave-distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05"
              numOctaves="2" seed="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise"
              scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ── LEFT — PRODUCER ── */}
      <div
        ref={leftRef}
        className={panelBase}
        style={{ flexBasis: '50%', minWidth: 0 }}
        onMouseEnter={() => expand('producer')}
        onMouseLeave={reset}
        onClick={() => enter('producer')}
        data-cursor="ENTER"
        role="button"
        tabIndex={0}
        aria-label="Enter The Sonic World"
        onKeyDown={e => e.key === 'Enter' && enter('producer')}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#080001] to-[#0d0003]" />
        <EQBars />

        {/* distortion overlay on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: active === 'producer' ? 1 : 0,
            filter: 'url(#wave-distort)',
            background: 'radial-gradient(ellipse at 30% 60%, rgba(255,0,51,0.06) 0%, transparent 70%)',
          }}
        />

        {/* vertical world label */}
        <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10 md:h-14 bg-[#FF0033]" />
          <span className="font-mono text-[8px] text-white/25 tracking-[0.35em] uppercase writing-vertical rotate-180">
            WORLD I
          </span>
        </div>

        {/* Main label */}
        <div className="relative z-10 text-center px-10 md:px-14">
          <span className="font-mono text-[#FF0033] text-[9px] md:text-[10px] tracking-[0.55em] uppercase block mb-3 md:mb-5">
            THE SONIC WORLD
          </span>
          <h2
            className="font-bebas text-white leading-[0.88]"
            style={{ fontSize: 'clamp(38px, 7vw, 110px)' }}
          >
            PRODUCER<br />&amp; SOUND<br />DESIGNER
          </h2>

          <div
            className="mt-6 flex items-center gap-3 justify-center transition-all duration-300"
            style={{
              opacity: active === 'producer' ? 1 : 0,
              transform: active === 'producer' ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            <div className="w-6 h-px bg-[#FF0033]" />
            <span className="font-mono text-white/50 text-[9px] tracking-[0.4em] uppercase">Enter</span>
            <div className="w-6 h-px bg-[#FF0033]" />
          </div>
        </div>

        {/* corner index */}
        <span className="absolute bottom-5 right-5 font-mono text-[8px] text-white/15 tracking-widest">01</span>
      </div>

      {/* ── DIVIDER ── */}
      <div
        ref={dividerRef}
        className="absolute top-0 bottom-0 z-10"
        style={{
          left: '50%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15) 20%, rgba(255,0,51,0.6) 50%, rgba(255,255,255,0.15) 80%, transparent)',
          transform: 'translateX(-0.5px)',
        }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{ animation: 'redpulse 2s ease-in-out infinite' }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF0033]" />
        </div>
      </div>

      {/* ── RIGHT — DRUMMER ── */}
      <div
        ref={rightRef}
        className={panelBase}
        style={{ flexBasis: '50%', minWidth: 0 }}
        onMouseEnter={() => expand('drummer')}
        onMouseLeave={reset}
        onClick={() => enter('drummer')}
        data-cursor="ENTER"
        role="button"
        tabIndex={0}
        aria-label="Enter The Kinetic World"
        onKeyDown={e => e.key === 'Enter' && enter('drummer')}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-[#080001] to-[#0d0003]" />
        <BPMGrid />

        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: active === 'drummer' ? 1 : 0,
            background: 'radial-gradient(ellipse at 70% 40%, rgba(255,0,51,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Main label */}
        <div className="relative z-10 text-center px-10 md:px-14">
          <span className="font-mono text-[#FF0033] text-[9px] md:text-[10px] tracking-[0.55em] uppercase block mb-3 md:mb-5">
            THE KINETIC WORLD
          </span>
          <h2
            className="font-bebas text-white leading-[0.88]"
            style={{ fontSize: 'clamp(38px, 7vw, 110px)' }}
          >
            DRUMMER<br />&amp; LIVE<br />PERFORMER
          </h2>

          <div
            className="mt-6 flex items-center gap-3 justify-center transition-all duration-300"
            style={{
              opacity: active === 'drummer' ? 1 : 0,
              transform: active === 'drummer' ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            <div className="w-6 h-px bg-[#FF0033]" />
            <span className="font-mono text-white/50 text-[9px] tracking-[0.4em] uppercase">Enter</span>
            <div className="w-6 h-px bg-[#FF0033]" />
          </div>
        </div>

        {/* vertical world label */}
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[8px] text-white/25 tracking-[0.35em] uppercase writing-vertical">
            WORLD II
          </span>
          <div className="w-px h-10 md:h-14 bg-[#FF0033]" />
        </div>

        <span className="absolute bottom-5 left-5 font-mono text-[8px] text-white/15 tracking-widest">02</span>
      </div>

      {/* ── Bottom hint ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-20">
        <span className="font-mono text-[7px] text-white/15 tracking-[0.4em] uppercase">
          CHOOSE YOUR WORLD
        </span>
        <div className="w-px h-6 bg-white/10" />
      </div>
    </div>
  )
}
