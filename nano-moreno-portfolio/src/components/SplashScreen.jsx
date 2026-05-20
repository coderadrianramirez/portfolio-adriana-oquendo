import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const BOOT = [
  'INITIALIZING AUDIO ENGINE...',
  'LOADING SOUND BANKS...',
  'CALIBRATING PERCUSSION MODULES...',
  'CONNECTING TO THE UNDERGROUND...',
  'SYSTEM READY.',
]

export default function SplashScreen({ onComplete }) {
  const rootRef    = useRef(null)
  const nRefs      = useRef([])
  const mRefs      = useRef([])
  const lineRef    = useRef(null)
  const tagRef     = useRef(null)
  const loaderRef  = useRef(null)
  const scanRef    = useRef(null)
  const [bootIdx, setBootIdx] = useState(0)

  /* boot text cycle */
  useEffect(() => {
    const id = setInterval(() => setBootIdx(i => (i + 1) % BOOT.length), 700)
    return () => clearInterval(id)
  }, [])

  /* main GSAP timeline */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([...nRefs.current, ...mRefs.current], { opacity: 0, y: 90, skewX: -12 })
      gsap.set(lineRef.current,   { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(tagRef.current,    { opacity: 0, y: 16 })
      gsap.set(loaderRef.current, { scaleX: 0, transformOrigin: 'left center' })

      const tl = gsap.timeline({ delay: 0.4 })

      /* scanline entrance */
      tl.fromTo(scanRef.current,
        { top: '-4px' },
        { top: '100%', duration: 0.8, ease: 'none' }
      )

      /* NANO letters */
      tl.to(nRefs.current, {
        opacity: 1, y: 0, skewX: 0,
        stagger: 0.07, duration: 0.65, ease: 'power3.out',
      }, '-=0.2')

      /* MORENO letters */
      tl.to(mRefs.current, {
        opacity: 1, y: 0, skewX: 0,
        stagger: 0.07, duration: 0.65, ease: 'power3.out',
      }, '-=0.45')

      /* red line */
      tl.to(lineRef.current, { scaleX: 1, duration: 0.7, ease: 'expo.inOut' }, '-=0.2')

      /* tagline */
      tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })

      /* loader bar */
      tl.to(loaderRef.current, { scaleX: 1, duration: 1.6, ease: 'power1.inOut' })

      /* glitch flash then exit */
      tl.to(rootRef.current, {
        filter: 'brightness(4) saturate(0)',
        duration: 0.08, ease: 'none',
        yoyo: true, repeat: 1,
      })
      tl.to(rootRef.current, {
        opacity: 0, duration: 0.4, ease: 'power2.in',
        onComplete,
      }, '+=0.1')
    }, rootRef)

    return () => ctx.revert()
  }, [onComplete])

  const nanoLetters   = 'NANO'.split('')
  const morenoLetters = 'MORENO'.split('')

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,0,51,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Scanline */}
      <div
        ref={scanRef}
        className="absolute left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,0,51,0.8) 40%, rgba(255,0,51,0.8) 60%, transparent)',
          top: '-4px',
        }}
      />

      {/* Letters */}
      <div className="relative select-none text-center">
        {/* NANO */}
        <div className="flex justify-center">
          {nanoLetters.map((l, i) => (
            <span
              key={i}
              ref={el => (nRefs.current[i] = el)}
              className="font-bebas text-white leading-[0.9]"
              style={{ fontSize: 'clamp(64px, 16vw, 200px)' }}
            >
              {l}
            </span>
          ))}
        </div>

        {/* MORENO */}
        <div className="flex justify-center -mt-2 md:-mt-4">
          {morenoLetters.map((l, i) => (
            <span
              key={i}
              ref={el => (mRefs.current[i] = el)}
              className="font-bebas text-[#FF0033] leading-[0.9]"
              style={{ fontSize: 'clamp(64px, 16vw, 200px)' }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Red separator */}
      <div
        ref={lineRef}
        className="w-full max-w-xs md:max-w-md h-px bg-[#FF0033] my-5 md:my-7"
      />

      {/* Tagline */}
      <p
        ref={tagRef}
        className="font-mono text-[10px] md:text-xs tracking-[0.45em] text-white/35 uppercase"
      >
        PRODUCER&nbsp;&nbsp;·&nbsp;&nbsp;SOUND DESIGNER&nbsp;&nbsp;·&nbsp;&nbsp;DRUMMER
      </p>

      {/* Loader */}
      <div className="relative w-full max-w-xs md:max-w-sm h-px bg-white/8 mt-10 overflow-hidden">
        <div ref={loaderRef} className="absolute inset-0 bg-[#FF0033]" />
      </div>

      {/* Boot line */}
      <p className="font-mono text-[9px] text-white/18 mt-3 tracking-widest uppercase">
        {BOOT[bootIdx]}
      </p>
    </div>
  )
}
