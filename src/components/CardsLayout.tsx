'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { RSVPThankYou } from '@/components/rsvp/RSVPThankYou'
import { RSVPThankYouToast } from '@/components/rsvp/RSVPThankYouToast'

// Import Section Components
import About from './sections/About'
import DateDay from './sections/DateDay'
import Venue from './sections/Venue'
import RSVP from './sections/RSVP'
import Dresscode from './sections/Dresscode'
import Tentative from './sections/Tentative'
import Wishlist from './sections/Wishlist'

const sections = [
  {
    id: 'about',
    number: '01',
    title: 'About Us',
    color: '#260303', // Burgundy
    text: '#fff',
  },
  {
    id: 'date',
    number: '02',
    title: 'Date & Day',
    color: '#6D544A', // Dark Brown
    text: '#fff',
  },
  {
    id: 'venue',
    number: '03',
    title: 'Venue',
    color: '#6D544A', // Dark Brown
    text: '#fff',
  },
  {
    id: 'rsvp',
    number: '04',
    title: 'RSVP',
    color: '#6D544A', // Dark Brown
    text: '#fff',
  },
  {
    id: 'dresscode',
    number: '05',
    title: 'Dresscode',
    color: 'white', // Pastel Terracotta
    text: '#4a3c36',
  },
  {
    id: 'tentative',
    number: '06',
    title: 'Tentative',
    color: '#6D544A', // Dark Brown
    text: '#fff',
  },
  {
    id: 'wishlist',
    number: '07',
    title: 'Our Wishlist',
    color: '#6D544A', // Dark Brown
    text: '#fff',
  },
]

type CardRect = { top: number; left: number; width: number; height: number }

// Highly optimized GPU-accelerated smooth handwriting-like text reveal component
function HandwritingText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.h2
      initial={{ maskPosition: '100% 0%' }}
      animate={{ maskPosition: '0% 0%' }}
      className="cursor-pointer text-5xl sm:text-7xl"
      transition={{
        delay: delay,
        duration: 1, // Slightly faster sweep duration for a highly responsive calligraphic feel
        ease: [0.45, 0.05, 0.25, 1.0], // Beautiful S-curve handwriting sweep
      }}
      style={{
        // 300% width mask: Left 33.3% is solid black, Middle 33.3% is feathered transition, Right 33.3% is solid transparent.
        // This mathematically guarantees 100% hidden start (at 100% pos) and 100% visible end (at 0% pos) with no cuts or leaks.
        maskImage: 'linear-gradient(to right, black 35%, transparent 65%)',
        WebkitMaskImage: 'linear-gradient(to right, black 35%, transparent 65%)',
        maskSize: '300% 100%',
        WebkitMaskSize: '300% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        display: 'inline-block',
      }}
    >
      {text}
    </motion.h2>
  )
}

// TODO: smaller menu font size

export function CardsLayout() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [fromRect, setFromRect] = useState<CardRect | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const linkRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [rsvpResult, setRsvpResult] = useState<{ name: string; isAttending: boolean } | null>(null)
  const [showThankYou, setShowThankYou] = useState(false)

  // Calculate typewriter typing delays for a slightly faster, stately sequential line-by-line reveal
  const typewriterDelays = useMemo(() => {
    const startDelay = 0.4
    const step = 0.4 // Slightly faster step delay between lines starting (1.0s stagger)
    return sections.map((_, i) => startDelay + i * step)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedId ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedId])

  function handleOpen(id: string) {
    const el = linkRefs.current[id]
    if (!el) return
    const rect = el.getBoundingClientRect()
    setFromRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })
    setSelectedId(id)
    setIsClosing(false)
  }

  function handleClose() {
    setIsClosing(true)
  }

  function handleRsvpComplete(name: string, isAttending: boolean) {
    setRsvpResult({ name, isAttending })
    setIsClosing(true) // close the card
  }

  const selected = sections.find((s) => s.id === selectedId)

  const getModalTarget = useCallback((): CardRect => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const w = Math.min(vw * 0.92, 768)
    const h = vh * 0.85
    return { top: (vh - h) / 2, left: (vw - w) / 2, width: w, height: h }
  }, [])

  return (
    <div className="flex items-center min-h-dvh justify-center font-sans overflow-x-hidden p-6 md:p-12">
      {/* Center Layout for Text Menu */}
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-8 w-full max-w-lg mx-auto2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            ref={(el) => {
              linkRefs.current[section.id] = el
            }}
            onClick={() => !selectedId && handleOpen(section.id)}
            disabled={selectedId !== null}
            className="group relative flex items-center justify-center py-3 text-center border-b border-transparent focus:outline-none transition-all duration-300 w-full"
            style={{
              opacity: selectedId === section.id ? 0 : 1,
              pointerEvents: selectedId ? 'none' : 'auto',
            }}
          >
            {/* Section Title */}
            <span className="transition-all duration-300 text-black group-hover:text-yellow-800 group-hover:scale-105">
              <HandwritingText text={section.title} delay={typewriterDelays[index]} />
            </span>
          </button>
        ))}
      </div>

      {/* The 3D Y-Axis Flip Flying Card Portal */}
      <AnimatePresence
        onExitComplete={() => {
          setSelectedId(null)
          setFromRect(null)
          setIsClosing(false)
          // Show thank-you after card has fully exited
          if (rsvpResult) setShowThankYou(true)
        }}
      >
        {selectedId && selected && fromRect && !isClosing && (
          <>
            {/* Dark Blurred Backdrop behind the active card */}
            <motion.div
              className="fixed inset-0 z-40 w-screen h-screen bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* 3D Flip Transition Portal */}
            <motion.div
              key="flying-card"
              className="fixed z-50 overflow-hidden shadow-2xl border border-white/10"
              style={{
                backgroundColor: selected.color,
                transformPerspective: 1400,
                transformOrigin: 'center center',
                borderRadius: '2rem',
              }}
              initial={{
                top: fromRect.top,
                left: fromRect.left,
                width: fromRect.width,
                height: fromRect.height,
                rotateY: 0,
                opacity: 0,
                scale: 0.85,
              }}
              animate={(() => {
                const t = getModalTarget()
                return {
                  top: t.top,
                  left: t.left,
                  width: t.width,
                  height: t.height,
                  rotateY: 180,
                  opacity: 1,
                  scale: 1,
                  borderRadius: '3rem',
                }
              })()}
              exit={{
                top: fromRect.top,
                left: fromRect.left,
                width: fromRect.width,
                height: fromRect.height,
                rotateY: 0,
                opacity: 0,
                scale: 0.85,
                borderRadius: '2rem',
                transition: { ease: [0.7, 0, 0.84, 0], duration: 0.45 },
              }}
              transition={{
                ease: [0.16, 1, 0.3, 1], // Expo-out curve
                duration: 0.7,
              }}
            >
              {/* Soft Paper Grain Texture Overlay */}
              <div className="card-grain opacity-80" />

              {/* Close Button - Fades in gently after 3D card settles */}
              <motion.button
                onClick={handleClose}
                className="absolute top-6 left-6 p-2.5 bg-black/5 hover:bg-black/10 rounded-full transition-colors z-20 focus:outline-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.2 }}
              >
                <X className="w-5 h-5" style={{ color: selected.text }} />
              </motion.button>

              {/* Inner Content - Fades in post-flip, Rotated 180deg to adjust for the Y-axis card rotation */}
              <motion.div
                className="p-8 sm:p-12 h-full flex flex-col justify-start z-10 relative scrollbar-none"
                style={{ transform: 'rotateY(180deg)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05, delay: 0 } }}
                transition={{ delay: 0.45, duration: 0.25 }}
              >
                {/* Header Title */}
                <h2
                  className="text-4xl sm:text-5xl font-sans font-medium tracking-wide mb-8 border-b border-black/5 pb-6"
                  style={{ color: selected.text, fontFamily: 'var(--font-sans), serif' }}
                >
                  {selected.title}
                </h2>

                {/* Dynamically Render Componentized Section Contents */}
                <div className="overflow-y-auto scrollbar-none">
                  {selectedId === 'about' && <About />}
                  {selectedId === 'date' && <DateDay />}
                  {selectedId === 'venue' && <Venue />}
                  {selectedId === 'rsvp' && <RSVP onComplete={handleRsvpComplete} />}
                  {selectedId === 'dresscode' && <Dresscode />}
                  {selectedId === 'tentative' && <Tentative />}
                  {selectedId === 'wishlist' && <Wishlist />}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Post-RSVP: thank-you modal + floating toast (outside card transform) ── */}
      <AnimatePresence onExitComplete={() => setRsvpResult(null)}>
        {showThankYou && rsvpResult && (
          <>
            <RSVPThankYou
              name={rsvpResult.name}
              isAttending={rsvpResult.isAttending}
              onClose={() => setShowThankYou(false)}
            />
            <RSVPThankYouToast onDone={() => {}} />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
