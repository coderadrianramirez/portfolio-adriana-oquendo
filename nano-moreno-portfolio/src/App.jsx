import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplashScreen  from './components/SplashScreen'
import CustomCursor  from './components/CustomCursor'
import SplitScreen   from './components/SplitScreen'
import ProducerWorld from './components/ProducerWorld'
import DrummerWorld  from './components/DrummerWorld'
import NoiseOverlay  from './components/NoiseOverlay'

/* A simple fade wrapper so AnimatePresence handles mounting correctly */
const Fade = ({ children, ...props }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35, ease: 'easeInOut' }}
    style={{ position: 'fixed', inset: 0 }}
    {...props}
  >
    {children}
  </motion.div>
)

export default function App() {
  // 'splash' | 'split' | 'producer' | 'drummer'
  const [phase, setPhase] = useState('splash')

  const handleSplashDone  = useCallback(() => setPhase('split'),    [])
  const handleEnterWorld  = useCallback((w) => setPhase(w),          [])
  const handleBack        = useCallback(() => setPhase('split'),    [])

  return (
    <div className="bg-black min-h-screen">
      {/* Persistent overlays */}
      <CustomCursor />
      <NoiseOverlay opacity={0.035} />

      <AnimatePresence mode="wait">
        {phase === 'splash' && (
          <Fade key="splash">
            <SplashScreen onComplete={handleSplashDone} />
          </Fade>
        )}

        {phase === 'split' && (
          <Fade key="split">
            <SplitScreen onEnterWorld={handleEnterWorld} />
          </Fade>
        )}

        {phase === 'producer' && (
          <Fade key="producer">
            <ProducerWorld onBack={handleBack} />
          </Fade>
        )}

        {phase === 'drummer' && (
          <Fade key="drummer">
            <DrummerWorld onBack={handleBack} />
          </Fade>
        )}
      </AnimatePresence>
    </div>
  )
}
