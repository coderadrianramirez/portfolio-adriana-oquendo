import { useEffect, useRef } from 'react'

export default function NoiseOverlay({ opacity = 0.04 }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = Math.ceil(window.innerWidth  / 2)
      canvas.height = Math.ceil(window.innerHeight / 2)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width, height } = canvas
      const img  = ctx.createImageData(width, height)
      const data = img.data
      for (let i = 0; i < data.length; i += 4) {
        const v     = (Math.random() * 255) | 0
        data[i]     = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
      style={{ opacity, mixBlendMode: 'screen' }}
    />
  )
}
