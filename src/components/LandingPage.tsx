'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardsLayout } from '@/components/CardsLayout'
import Image from 'next/image'
import { useAudio } from '@/app/(frontend)/providers'

export function LandingPage() {
  const [stage, setStage] = useState<'lil-us' | 'menu'>('lil-us')
  const { play } = useAudio()

  const handleEnter = () => {
    play()
    setStage('menu')
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {stage === 'lil-us' && (
          <motion.div
            key="lil-us"
            onClick={handleEnter}
            className="fixed inset-0 bg-[#21140f] flex items-center justify-center z-40 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div className="relative w-[95%] h-[95%] sm:w-[80%] sm:h-[80%]">
              <Image
                src="/image/welcome.png"
                alt="Welcome"
                fill
                className="object-contain select-none pointer-events-none"
                priority
              />
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


