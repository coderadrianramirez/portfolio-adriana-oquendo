import { useState } from 'react'

export default function GlitchText({
  text,
  as: Tag = 'span',
  className = '',
  style = {},
  glitchOnHover = true,
  alwaysGlitch = false,
}) {
  const [on, setOn] = useState(alwaysGlitch)

  return (
    <Tag
      className={`relative inline-block select-none ${className}`}
      style={style}
      onMouseEnter={() => glitchOnHover && setOn(true)}
      onMouseLeave={() => glitchOnHover && !alwaysGlitch && setOn(false)}
      aria-label={text}
    >
      {/* base */}
      <span className="relative z-10">{text}</span>

      {/* glitch layer 1 — red */}
      <span
        aria-hidden
        className="absolute inset-0 text-[#FF0033] z-20"
        style={{
          opacity: on ? 1 : 0,
          animation: on ? 'glitch-clip-1 0.25s steps(1) infinite' : 'none',
          transition: 'opacity 0.1s',
        }}
      >
        {text}
      </span>

      {/* glitch layer 2 — cyan */}
      <span
        aria-hidden
        className="absolute inset-0 text-cyan-400 z-20"
        style={{
          opacity: on ? 0.6 : 0,
          animation: on ? 'glitch-clip-2 0.25s steps(1) infinite' : 'none',
          transition: 'opacity 0.1s',
        }}
      >
        {text}
      </span>
    </Tag>
  )
}
