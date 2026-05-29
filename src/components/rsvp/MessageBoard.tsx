'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface RSVPEntry {
  id: string
  name: string
  message: string
}

// Each note gets a stable slight tilt so they look hand-placed
const TILTS = [-2.5, 1.8, -1.2, 2.1, -0.8, 1.5, -2.0, 0.9, -1.6, 2.4]

// Warm paper tones — slightly varied per note
const PAPER_COLORS = [
  'var(--color-parchment)',
]

export function MessageBoard() {
  const [messages, setMessages] = useState<RSVPEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/rsvp?where[message][exists]=true&limit=50&sort=-createdAt')
      .then((r) => r.json())
      .then((data) => setMessages(data?.docs ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="mt-10 flex justify-center">
        <span className="text-xs text-white/50 font-sans animate-pulse">Loading messages…</span>
      </div>
    )
  }

  if (messages.length === 0) return null

  return (
    <div className="mt-10 px-4 text-white/70">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-white/10" />
        <p className="text-xs uppercase tracking-[0.2em] whitespace-nowrap text-white/60">Messages from Guests</p>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Notes grid */}
      <div className="flex flex-col gap-5">
        {messages.map((entry, i) => {
          const tilt = TILTS[i % TILTS.length]
          const paper = PAPER_COLORS[i % PAPER_COLORS.length]

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 16, rotate: tilt * 0.5 }}
              animate={{ opacity: 1, y: 0, rotate: tilt }}
              transition={{
                delay: i * 0.07,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
              className="relative cursor-default"
              style={{ transformOrigin: 'center top' }}
            >
              {/* Pin */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 shadow-md"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #e88, #c0392b)',
                  boxShadow: '0 2px 6px rgba(150,20,20,0.35)',
                }}
              />

              {/* Paper note */}
              <div
                className="rounded-sm px-5 pt-6 pb-5 shadow-md"
                style={{
                  background: paper,
                  boxShadow: '2px 4px 14px rgba(0,0,0,0.10), 0 0 0 1px rgba(180,150,80,0.08)',
                  // Subtle ruled lines
                  backgroundImage: `linear-gradient(${paper} 0px, ${paper} 0px)`,
                }}
              >
                {/* Ruled lines layer */}
                <div
                  className="absolute inset-0 rounded-sm pointer-events-none opacity-[0.07]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(transparent, transparent 23px, #6b4e1a 23px, #6b4e1a 24px)',
                    backgroundPosition: '0 38px',
                  }}
                />

                {/* Message text */}
                <p className="relative text-[#260303] leading-7 whitespace-pre-wrap wrap-break-word">
                  {entry.message}
                </p>

                {/* Signature */}
                <p className="relative text-right text-amber-900/60 mt-3 italic">— {entry.name}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
