'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardsLayout } from '@/components/CardsLayout'
import Image from 'next/image'

export function LandingPage() {
  const [stage, setStage] = useState<'lil-us' | 'menu'>('lil-us')

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence>
        {stage === 'lil-us' && (
          <motion.div
            key="lil-us"
            onClick={() => setStage('menu')}
            className="fixed inset-0 bg-[#260303] flex items-center justify-center p-6 z-40 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeInOut' },
            }}
          >
            <motion.div
              className="relative w-[70vw] flex flex-col items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{
                opacity: 0,
                scale: 1.1,
                transition: {
                  opacity: { duration: 0.8, ease: 'easeOut' },
                  scale: { duration: 0.8, ease: 'easeOut' },
                },
              }}
              transition={{
                opacity: { duration: 1.0, ease: 'easeOut' },
                scale: { duration: 15.0, ease: 'linear' }, // Continuous cinematic zoom-in
              }}
            >
              {/* Arced Text Above the Image with handwriting mask animation */}
              <div className="w-full -mb-10 md:-mb-32 z-10">
                <svg
                  viewBox="0 0 500 120"
                  className="w-full select-none pointer-events-none filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.6)]"
                  fill="none"
                >
                  <defs>
                    {/* Dynamic mask that draws along the text curve to reveal it like handwriting */}
                    <mask id="text-reveal-mask">
                      {/* Starts completely black (hidden) */}
                      <rect width="500" height="120" fill="black" />

                      {/* Animated path matching textCurve */}
                      <motion.path
                        d="M 30,110 Q 250,10 470,110"
                        fill="none"
                        stroke="white"
                        strokeWidth="100" // Extra wide to fully cover font size 48
                        strokeLinecap="butt"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          delay: 1.1, // Starts as the image slide settles
                          duration: 2.0, // Stately handwriting reveal speed
                          ease: 'easeInOut',
                        }}
                      />
                    </mask>
                  </defs>

                  <path id="textCurve" d="M 30,110 Q 250,10 470,110" fill="none" stroke="none" />
                  <text
                    fill="#fff"
                    fontSize="40"
                    className="font-light tracking-wider -rotate-6 relative -translate-x-12 translate-y-8"
                    mask="url(#text-reveal-mask)"
                    style={{
                      fontFamily: 'var(--font-betris-daniel)',
                    }}
                  >
                    <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
                      Welcome to the Wedding of
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Couple illustration sliding dynamically from the bottom of the screen */}
              <motion.div
                className="w-full flex justify-center"
                initial={{ y: '80vh', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  y: { type: 'spring', damping: 26, stiffness: 70, restDelta: 0.001 },
                  opacity: { duration: 0.8 },
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
