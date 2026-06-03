'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardsLayout } from '@/components/CardsLayout'
import Image from 'next/image'
import { useAudio } from '@/app/(frontend)/providers'

export function LandingPage() {
  const [stage, setStage] = useState<'lil-us' | 'menu'>('lil-us')
  const [imageLoaded, setImageLoaded] = useState(false)
  const { play } = useAudio()

  const handleEnter = () => {
    if (imageLoaded) {
      play()
      setStage('menu')
    }
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {stage === 'lil-us' && (
          <motion.div
            key="lil-us"
            onClick={handleEnter}
            className="fixed inset-0 bg-[#260303] flex items-center justify-center z-40 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Elegant central micro-loader while the high-res illustration loads */}
            <AnimatePresence>
              {!imageLoaded && (
                <motion.div
                  key="landing-loader"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-amber-700/25 border-t-amber-700 animate-spin" />
                    <span className="text-sm font-sans tracking-[0.15em] uppercase text-amber-700/60 animate-pulse">
                      Preparing celebration…
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-[90vw] sm:w-[70vw] flex flex-col items-center overflow-visible">
              {/* Text — handwriting reveal on mount */}
              <svg viewBox="0 0 1125 450" className="w-full" fill="none">
                <defs>
                  <mask id="text-reveal-mask">
                    <rect width="1125" height="450" fill="black" />
                    <motion.path
                      d="M 30,390 Q 720,-50 1125,450"
                      fill="none"
                      stroke="white"
                      strokeWidth="250"
                      strokeLinecap="butt"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: imageLoaded ? 1 : 0 }}
                      transition={{ delay: 0.4, duration: 1.4, ease: 'easeInOut' }}
                    />
                  </mask>
                </defs>
                <path id="textCurve" d="M 30,365 Q 800,-50 1125,450" fill="none" stroke="none" />
                <text
                  fill="#fff"
                  fontSize="108"
                  mask="url(#text-reveal-mask)"
                  style={{ fontFamily: 'var(--font-betris-daniel)' }}
                >
                  <textPath href="#textCurve" startOffset="45%" textAnchor="middle">
                    Welcome to the Wedding of
                  </textPath>
                </text>
              </svg>

              {/* Image — revealed from left to right at the same rate as the text */}
              <motion.div
                className="w-[80%] mt-[-20%] relative overflow-visible"
                initial={{
                  clipPath: 'inset(0% 100% 0% 0%)',
                  opacity: 0,
                }}
                animate={
                  imageLoaded
                    ? {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      }
                }
                transition={{
                  delay: 0.4,
                  duration: 1.4,
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src="/image/lil-us.png"
                  alt="Illustration of little Afeef & Partner"
                  width={2091}
                  height={2275}
                  onLoad={() => setImageLoaded(true)}
                  className="w-full h-auto pl-4 object-contain select-none pointer-events-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {stage === 'menu' && (
          <motion.div
            key="menu"
            className="w-full z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <CardsLayout />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
