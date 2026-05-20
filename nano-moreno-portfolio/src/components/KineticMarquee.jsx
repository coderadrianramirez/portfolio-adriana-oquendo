export default function KineticMarquee({
  items = [],
  speed = 30,
  direction = 'left',
  className = '',
  textSize = 'text-3xl md:text-5xl',
}) {
  const doubled = [...items, ...items]
  const anim    = direction === 'right' ? 'marquee-reverse' : 'marquee'

  return (
    <div className={`overflow-hidden py-3 md:py-4 ${className}`}>
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: `${anim} ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 md:gap-6 mr-4 md:mr-6">
            <span
              className={`font-bebas tracking-widest uppercase text-white/15 ${textSize}`}
            >
              {item}
            </span>
            <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#FF0033] flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
