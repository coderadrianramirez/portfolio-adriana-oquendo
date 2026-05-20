import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)
  const labelRef  = useRef(null)
  const mouse     = useRef({ x: -100, y: -100 })
  const ring      = useRef({ x: -100, y: -100 })
  const rafRef    = useRef(null)
  const hovering  = useRef(false)
  const curLabel  = useRef('')

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = (e) => {
      const el = e.target.closest('a, button, [data-cursor], [data-cursor-hover]')
      if (!el) return
      hovering.current = true
      curLabel.current = el.dataset.cursor || ''
      if (labelRef.current) labelRef.current.textContent = curLabel.current
    }

    const onLeave = (e) => {
      const el = e.target.closest('a, button, [data-cursor], [data-cursor-hover]')
      if (!el) return
      hovering.current = false
      curLabel.current = ''
      if (labelRef.current) labelRef.current.textContent = ''
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    const lerp = (a, b, t) => a + (b - a) * t

    const loop = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`
      }
      if (ringRef.current) {
        const scale = hovering.current ? 2.4 : 1
        ringRef.current.style.transform =
          `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px) scale(${scale})`
        ringRef.current.style.borderColor = hovering.current ? '#FF0033' : 'rgba(255,255,255,0.5)'
        ringRef.current.style.mixBlendMode = hovering.current ? 'normal' : 'difference'
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()

    /* hide on touch devices */
    const onTouch = () => {
      if (dotRef.current)  dotRef.current.style.display  = 'none'
      if (ringRef.current) ringRef.current.style.display = 'none'
    }
    window.addEventListener('touchstart', onTouch, { once: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#FF0033',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none will-change-transform flex items-center justify-center"
        style={{
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.5)',
          transition: 'transform 0.08s linear, border-color 0.2s, mix-blend-mode 0.2s',
        }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[7px] tracking-widest uppercase text-white whitespace-nowrap"
        />
      </div>
    </>
  )
}
