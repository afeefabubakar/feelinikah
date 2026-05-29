'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardsLayout } from '@/components/CardsLayout'
import Image from 'next/image'

export function LandingPage() {
  const [stage, setStage] = useState<'lil-us' | 'menu'>('lil-us')

  return (
    <div className="relative ">
      <AnimatePresence>
        {stage === 'lil-us' && (
          <motion.div
            key="lil-us"
            onClick={() => setStage('menu')}
            className="fixed inset-0 bg-[#260303] flex items-center justify-center z-40 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
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
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 2.2, ease: 'easeInOut' }}
                    />
                  </mask>
                </defs>
                <path id="textCurve" d="M 30,390 Q 720,-50 1125,450" fill="none" stroke="none" />
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

              {/* Image — springs up from below */}
              <motion.div
                className="w-[80%] mt-[-20%]"
                initial={{ y: '60vh', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  y: { type: 'spring', damping: 26, stiffness: 70 },
                  opacity: { duration: 0.8 },
                }}
              >
                <Image
                  src="/image/lil-us.png"
                  alt="Illustration of little Afeef & Partner"
                  width={2091}
                  height={2275}
                  className="w-full h-auto pl-4 object-contain select-none pointer-events-none drop-shadow-2xl"
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
