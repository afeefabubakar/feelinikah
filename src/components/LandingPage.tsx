'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardsLayout } from '@/components/CardsLayout'
import Image from 'next/image'

export function LandingPage() {
  const [stage, setStage] = useState<'welcome' | 'lil-us' | 'menu'>('welcome')

  useEffect(() => {
    if (stage === 'welcome') {
      const timer = setTimeout(() => {
        setStage('lil-us')
      }, 4600) // 4.6s to allow all three lines to draw sequentially and pause briefly
      return () => clearTimeout(timer)
    } else if (stage === 'lil-us') {
      const timer = setTimeout(() => {
        setStage('menu')
      }, 3600) // 3.6s to display the centered illustration
      return () => clearTimeout(timer)
    }
  }, [stage])

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none">
      <AnimatePresence>
        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            className="fixed inset-0 flex flex-col items-center justify-center p-6 z-40"
            style={{
              fontFamily: 'var(--font-imperial)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center justify-center gap-2 md:gap-4 text-center">
              {/* Line 1: welcome */}
              <motion.h1
                className="text-5xl md:text-7xl text-amber-900/90 tracking-wide"
                initial={{ clipPath: 'inset(-50px 100% -50px -20px)' }}
                animate={{ clipPath: 'inset(-50px -20px -50px -20px)' }}
                transition={{
                  delay: 0.4,
                  duration: 1.0,
                  ease: 'easeInOut',
                }}
              >
                Welcome
              </motion.h1>

              {/* Line 2: to */}
              <motion.h1
                className="text-4xl md:text-5xl text-amber-900/80 tracking-wide"
                initial={{ clipPath: 'inset(-50px 100% -50px -20px)' }}
                animate={{ clipPath: 'inset(-50px -20px -50px -20px)' }}
                transition={{
                  delay: 1.5,
                  duration: 0.6,
                  ease: 'easeInOut',
                }}
              >
                to
              </motion.h1>

              {/* Line 3: wedding of */}
              <motion.h1
                className="text-5xl md:text-7xl text-amber-900/90 tracking-wide font-light"
                initial={{ clipPath: 'inset(-60px 100% -60px -25px)' }}
                animate={{ clipPath: 'inset(-60px -25px -60px -25px)' }}
                transition={{
                  delay: 1.9,
                  duration: 1.2,
                  ease: 'easeInOut',
                }}
              >
                the wedding of
              </motion.h1>
            </div>
          </motion.div>
        )}

        {stage === 'lil-us' && (
          <motion.div
            key="lil-us"
            className="fixed inset-0 bg-[#260303] flex items-center justify-center p-6 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeInOut' },
            }}
          >
            <motion.div
              className="relative w-[60vw] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1.06, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, y: -15 }}
              transition={{
                opacity: { duration: 1.0, ease: 'easeOut' },
                y: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 4.5, ease: 'linear' }, // Continuous slow cinematic zoom-in
              }}
            >
              <Image
                src="/image/lil-us.png"
                alt="Illustration of little Afeef & Partner"
                width={1200}
                height={1500}
                className="h-auto w-full object-contain select-none pointer-events-none drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>
        )}

        {stage === 'menu' && (
          <motion.div
            key="menu"
            className="min-h-screen w-full z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }} // Snappier fade-in for cards layout
          >
            <CardsLayout />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
