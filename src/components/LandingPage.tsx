'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardsLayout } from '@/components/CardsLayout'
import Image from 'next/image'

export function LandingPage() {
  const [stage, setStage] = useState<'welcome' | 'lil-us' | 'menu'>('welcome')

  return (
    <div className="relative h-screen w-full overflow-hidden select-none">
      <AnimatePresence>
        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            onClick={() => setStage('lil-us')}
            className="flex flex-col items-center justify-center p-6 sm:p-20 mx-auto cursor-pointer h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={{ duration: 0.6 }}
          >
            {/* One super smooth, continuous diagonal paint brush stroke reveal */}
            <motion.div
              className="flex items-center justify-center h-full w-full"
              initial={{
                y: 35,
                scale: 0.96,
              }}
              animate={{
                y: 0,
                scale: 1.0,
              }}
              transition={{
                delay: 0.2,
                duration: 3.6, // Slowed down vertical rise and scale drift to synchronize with brush strokes
                ease: [0.45, 0.05, 0.25, 1.0], // slow, human-like deliberate S-curve
              }}
            >
              <svg
                viewBox="0 0 2000 1414"
                className="w-full h-auto max-h-[85vh] object-contain drop-shadow-2xl"
              >
                <defs>
                  {/* GPU-accelerated soft feathering filter (buttery smooth 120fps) */}
                  <filter id="brush-feather">
                    <feGaussianBlur stdDeviation="35" />
                  </filter>

                  <mask id="brush-mask">
                    {/* Starts completely black (hidden) */}
                    <rect width="2000" height="1414" fill="black" />

                    {/* Group all paths to apply the feathering blur to the entire brush stroke */}
                    <g filter="url(#brush-feather)">
                      {/* 1. Leading Bottom Flyaway Bristle (Starts furthest bottom-left, sweeps first) */}
                      <motion.path
                        d="M -960,3080 C 640,2280 2640,80 4240,-720"
                        fill="none"
                        stroke="white"
                        strokeWidth="350"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          delay: 0.1,
                          duration: 3.5, // Slowed down reveal
                          ease: [0.45, 0.05, 0.25, 1.0],
                        }}
                      />

                      {/* 2. Bottom-Right Offset Stroke (Covers bottom-right corner) */}
                      <motion.path
                        d="M -1200,2900 C 400,2100 2400,-100 4000,-900"
                        fill="none"
                        stroke="white"
                        strokeWidth="1400"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          delay: 0.15,
                          duration: 3.7, // Slowed down reveal
                          ease: [0.45, 0.05, 0.25, 1.0],
                        }}
                      />

                      {/* 3. Main Thick Core Stroke (Huge solid core body of the brush) */}
                      <motion.path
                        d="M -1600,2600 C 0,1800 2000,-400 3600,-1200"
                        fill="none"
                        stroke="white"
                        strokeWidth="2600"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          delay: 0.2,
                          duration: 3.9, // Slowed down reveal
                          ease: [0.45, 0.05, 0.25, 1.0],
                        }}
                      />

                      {/* 4. Top-Left Offset Stroke (Covers top-left corner) */}
                      <motion.path
                        d="M -2000,2300 C -400,1500 1600,-700 3200,-1500"
                        fill="none"
                        stroke="white"
                        strokeWidth="1400"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          delay: 0.25,
                          duration: 4.1, // Slowed down reveal
                          ease: [0.45, 0.05, 0.25, 1.0],
                        }}
                      />

                      {/* 5. Trailing Top Flyaway Bristle (Sweeps last along top-left edge) */}
                      <motion.path
                        d="M -2240,2120 C -640,1320 1360,-880 2960,-1680"
                        fill="none"
                        stroke="white"
                        strokeWidth="350"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          delay: 0.3,
                          duration: 4.3, // Slowed down reveal
                          ease: [0.45, 0.05, 0.25, 1.0],
                        }}
                      />
                    </g>
                  </mask>
                </defs>

                {/* The envelope image masked by our paint strokes */}
                <image
                  href="/image/welcome-envelope.png"
                  width="2000"
                  height="1414"
                  mask="url(#brush-mask)"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}

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
                  scale: { duration: 0.8, ease: 'easeOut' }
                }
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
                    className="font-light tracking-wider"
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
