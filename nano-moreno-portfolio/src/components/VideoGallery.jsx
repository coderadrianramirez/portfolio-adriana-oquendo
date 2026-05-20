import { useState } from 'react'

function VideoCard({ perf, i }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="PLAY"
    >
      {/* thumbnail */}
      <div className="relative aspect-video overflow-hidden border border-white/5 group-hover:border-[#FF0033]/30 transition-colors duration-300">
        {/* fake thumbnail */}
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{
            background: `linear-gradient(${135 + i * 30}deg, #0a0002 0%, #000 60%, #0d0003 100%)`,
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        {/* grid lines overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,0,51,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.6) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* scan stripe */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'rgba(255,0,51,0.4)',
            opacity: hovered ? 1 : 0,
            animation: hovered ? 'scanline 2s linear infinite' : 'none',
            top: 0,
            transition: 'opacity 0.3s',
          }}
        />

        {/* play button */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0.3 }}
        >
          <div className="w-12 h-12 md:w-14 md:h-14 border border-[#FF0033] flex items-center justify-center group-hover:bg-[#FF0033]/15 transition-colors">
            <span
              className="border-l-[11px] border-l-white border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent"
              style={{ marginLeft: '3px' }}
            />
          </div>
        </div>

        {/* duration */}
        <span className="absolute top-2.5 right-2.5 font-mono text-[8px] text-white/40 bg-black/60 px-2 py-0.5 tracking-wider">
          {perf.duration}
        </span>

        {/* hover tint */}
        <div
          className="absolute inset-0 bg-[#FF0033]/4 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: hovered ? 1 : 0 }}
        />
      </div>

      {/* info */}
      <div className="mt-2.5 px-0.5">
        <h3
          className="font-bebas text-white text-lg md:text-xl leading-tight transition-colors duration-200 group-hover:text-[#FF0033]"
        >
          {perf.title}
        </h3>
        <span className="font-mono text-white/25 text-[9px] tracking-wider">{perf.year}</span>
      </div>
    </div>
  )
}

export default function VideoGallery({ performances }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {performances.map((perf, i) => (
        <div key={perf.title} className="reveal-up">
          <VideoCard perf={perf} i={i} />
        </div>
      ))}
    </div>
  )
}
