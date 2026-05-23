'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardsLayout } from '@/components/CardsLayout'
import Image from 'next/image'

export function LandingPage() {
  const [stage, setStage] = useState<'welcome' | 'lil-us' | 'menu'>('welcome')

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none">
      <AnimatePresence>
        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            onClick={() => setStage('lil-us')}
            className="fixed inset-0 flex flex-col items-center justify-center p-6 z-40 cursor-pointer"
            style={{
              fontFamily: 'var(--font-imperial)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center justify-center gap-2 md:gap-4 text-center">
              {/* Line 1: Welcome */}
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
            onClick={() => setStage('menu')}
            className="fixed inset-0 bg-[#260303] flex items-center justify-center p-6 z-40 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeInOut' },
              exit: { duration: 0.4, ease: 'easeIn' },
            }}
          >
            <motion.div
              className="relative w-[60vw] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1.08, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -15 }}
              transition={{
                opacity: { duration: 1.0, ease: 'easeOut' },
                y: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 12.0, ease: 'linear' }, // Super long, slow continuous scale zoom-in
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
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <CardsLayout />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
