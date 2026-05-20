import { useState, useRef, useEffect, useCallback } from 'react'

function Waveform({ playing, progress }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const frame     = useRef(0)
  const barsRef   = useRef(
    Array.from({ length: 56 }, () => 0.08 + Math.random() * 0.85)
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx    = canvas.getContext('2d')

    const draw = () => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      const bars    = barsRef.current
      const n       = bars.length
      const gap     = 2
      const bw      = (W - gap * (n - 1)) / n

      bars.forEach((h, i) => {
        const animated = playing
          ? h * (0.45 + 0.55 * Math.abs(Math.sin(frame.current * 0.07 + i * 0.38)))
          : h * 0.25

        const barH   = animated * H
        const x      = i * (bw + gap)
        const y      = (H - barH) / 2
        const active = i / n < progress

        ctx.fillStyle = active ? '#FF0033' : 'rgba(255,255,255,0.1)'
        ctx.fillRect(x, y, bw, barH)
      })

      frame.current++
      if (playing) rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, progress])

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={44}
      className="flex-1 min-w-0 hidden sm:block"
    />
  )
}

export default function AudioPlayer({ track, index }) {
  const [playing,  setPlaying]  = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const DEMO_MS     = 8000 // 8-second demo loop

  const toggle = useCallback(() => {
    if (playing) {
      clearInterval(intervalRef.current)
      setPlaying(false)
    } else {
      setPlaying(true)
      const start = Date.now() - progress * DEMO_MS
      intervalRef.current = setInterval(() => {
        const p = ((Date.now() - start) % DEMO_MS) / DEMO_MS
        setProgress(p)
      }, 50)
    }
  }, [playing, progress])

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return (
    <div
      className="group flex items-center gap-3 md:gap-5 px-4 md:px-6 py-4 md:py-5 border border-white/5 hover:border-[#FF0033]/25 transition-all duration-300 bg-white/[0.015] hover:bg-[#FF0033]/[0.025]"
    >
      {/* index */}
      <span className="font-mono text-[#FF0033]/40 text-[10px] w-5 flex-shrink-0 tabular-nums">
        {String(index).padStart(2, '0')}
      </span>

      {/* play / pause */}
      <button
        onClick={toggle}
        className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-white/15 hover:border-[#FF0033] transition-colors"
        aria-label={playing ? 'Pause' : 'Play'}
        data-cursor-hover
      >
        {playing ? (
          <span className="flex gap-[3px]">
            <span className="w-[3px] h-[14px] bg-[#FF0033]" />
            <span className="w-[3px] h-[14px] bg-[#FF0033]" />
          </span>
        ) : (
          <span
            className="border-l-[9px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent"
            style={{ marginLeft: '2px' }}
          />
        )}
      </button>

      {/* track info */}
      <div className="flex-shrink-0 min-w-[100px] md:min-w-[140px]">
        <p className="font-bebas text-white text-base md:text-lg leading-tight tracking-wider">
          {track.title}
        </p>
        <p className="font-mono text-white/25 text-[9px] tracking-widest uppercase">
          {track.genre}
        </p>
      </div>

      {/* waveform */}
      <Waveform playing={playing} progress={progress} />

      {/* meta */}
      <div className="flex items-center gap-3 md:gap-5 flex-shrink-0 ml-auto">
        {track.bpm > 0 && (
          <span className="font-mono text-white/15 text-[9px] tracking-wider hidden md:block">
            {track.bpm} BPM
          </span>
        )}
        <span className="font-mono text-white/35 text-[10px] tabular-nums">{track.duration}</span>
      </div>
    </div>
  )
}
