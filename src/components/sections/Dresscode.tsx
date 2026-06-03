'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Check } from 'lucide-react'
import { useWeddingVariation } from '@/hooks/useWeddingVariation'

type Variation = 'groom' | 'bride' | 'friends'

// Each gender group can have one or more outfit images shown side-by-side inside one box
type OutfitGroup = { label: string; images: string[] }

const themes: Record<
  Variation,
  {
    colors?: { title: string; hex?: string }
    groups: OutfitGroup[]
  }
> = {
  groom: {
    colors: {
      title: 'Dark brown',
      hex: '#4a3932',
    },

    groups: [
      { label: 'Him', images: ['/image/groom-male.png'] },
      { label: 'Her', images: ['/image/groom-female.png'] },
    ],
  },
  bride: {
    colors: {
      title: 'Navy blue',
      hex: '#263453',
    },
    groups: [
      { label: 'Him', images: ['/image/bride-male.png'] },
      { label: 'Her', images: ['/image/bride-female.png'] },
    ],
  },
  friends: {
    colors: {
      title: 'Earthy',
    },
    groups: [
      // Both male options inside one "Him" box
      { label: 'Him', images: ['/image/guest-male-1.png'] },
      { label: 'Her', images: ['/image/guest-female.jpeg'] },
    ],
  },
}

export default function Dresscode() {
  const variation = useWeddingVariation()
  const [activeTab, setActiveTab] = useState<'Him' | 'Her'>('Him')
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  if (!variation) return null

  const theme = themes[variation]

  // Swipe detection parameters
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && activeTab === 'Him') {
      setActiveTab('Her')
    } else if (isRightSwipe && activeTab === 'Her') {
      setActiveTab('Him')
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <div className="flex flex-col text-[#260303] pb-4">
      {variation !== 'friends' && (
        <div className="flex gap-4 items-center justify-center mt-4">
          {theme.colors?.hex && (
            <span
              className="h-8 w-8 rounded-full aspect-square mb-3"
              style={{ backgroundColor: theme.colors?.hex }}
            ></span>
          )}
          <h4 className="text-center">{theme.colors?.title} </h4>
        </div>
      )}

      {/* Premium Swipeable Tab Switcher */}
      <div
        className={`flex border-b border-[#260303]/10 relative shrink-0 ${
          variation !== 'friends' ? 'mt-4' : 'mt-2'
        }`}
      >
        {(['Him', 'Her'] as const).map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-2 text-center transition-all relative cursor-pointer focus:outline-none ${
                isActive ? 'text-[#260303] font-bold' : 'text-[#6d544a]/60 hover:text-[#6d544a]'
              }`}
            >
              {tab}
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#92400e]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Swipeable Outfit Content */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'Him' ? -35 : 35 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'Him' ? 35 : -35 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="pb-2"
          >
            {theme.groups
              .filter((group) => group.label === activeTab)
              .map(({ label, images }) => (
                <div key={label} className="flex flex-col gap-2">
                  <div className="flex">
                    {images.map((src, i) => (
                      <Image
                        key={src}
                        src={src}
                        alt={`${theme.colors?.title} — ${label} option ${i + 1}`}
                        width={400}
                        height={600}
                        className="h-[300px] sm:h-[400px] w-auto max-w-full object-contain mx-auto mt-4"
                        priority
                      />
                    ))}
                  </div>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
