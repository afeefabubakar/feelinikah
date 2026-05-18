'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardsLayout } from '@/components/CardsLayout'

export function LandingPage() {
  const [entered, setEntered] = useState(false)

  return (
    <AnimatePresence mode="wait">
      {!entered ? (
        <motion.div
          key="landing"
          className="fixed inset-0 flex flex-col items-center justify-center cursor-pointer select-none"
          onClick={() => setEntered(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Names */}
          <motion.h1
            className="font-display text-center leading-tight flex h-64 "
            style={{ color: '#443511' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-6xl sm:text-8xl md:text-9xl">Afeef</span>
            <span
              className="text-3xl sm:text-4xl md:text-8xl my-3 sm:my-5 mx-8 self-center"
              style={{ fontFamily: 'var(--font-imperial)' }}
            >
              +
            </span>
            <span className="text-6xl sm:text-8xl md:text-9xl self-end">Alin</span>
          </motion.h1>

          {/* Tap/click hint
          <motion.p
            className="mt-12 sm:mt-16 text-sm sm:text-base tracking-widest uppercase font-sans"
            style={{ color: '#7a6040' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 1.4, duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          >
            tap anywhere to enter
          </motion.p> */}
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <CardsLayout />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
