'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

const MESSAGES = [
  'Alin thinks Afeef will cry first reading your message! 🥹',
  'Your message just made the wedding 10% more beautiful ✨',
  'Your well-wishes have been received with open hearts 💖',
]

interface RSVPThankYouToastProps {
  onDone: () => void
}

export function RSVPThankYouToast({ onDone }: RSVPThankYouToastProps) {
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]

  useEffect(() => {
    const t = setTimeout(onDone, 4200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="fixed bottom-10 right-6 z-[60] flex justify-end pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -60, scale: 0.94 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="relative w-72"
      >
        {/* Bubble */}
        <div
          className="px-5 py-4 rounded-3xl rounded-br-sm shadow-xl text-sm leading-relaxed text-[#260303]"
          style={{
            background: 'linear-gradient(135deg, var(--color-parchment), #fef3e2)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(180,140,80,0.12)',
          }}
        >
          {message}

          {/* Floating emojis */}
          <motion.span
            className="absolute -top-3 -right-2 text-lg"
            animate={{ y: [-2, -8, -2], rotate: [-5, 5, -5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            💌
          </motion.span>
        </div>

        {/* Bubble tail — points down-right */}
        <div
          className="absolute -bottom-2 right-5 w-4 h-4"
          style={{
            background: 'var(--color-parchment)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
            filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.08))',
          }}
        />

        {/* Shrinking progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 rounded-full opacity-30"
          style={{ background: 'var(--brand-highlight)', width: '100%', originX: 0 }}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 4.0, ease: 'linear' }}
        />
      </motion.div>
    </div>
  )
}
