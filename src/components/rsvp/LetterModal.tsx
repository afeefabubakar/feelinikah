'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PenLine, Loader2, X } from 'lucide-react'

interface LetterModalProps {
  name: string
  onSend: (message: string) => void
  onSkip: () => void
  submitting: boolean
  error: string | null
}

export function LetterModal({ name, onSend, onSkip, submitting, error }: LetterModalProps) {
  const [message, setMessage] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onSkip}
      />

      {/* Letter paper */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 60, rotate: -2, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.94 }}
        transition={{ type: 'spring', damping: 22, stiffness: 160 }}
      >
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'var(--color-parchment)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(180,150,100,0.15)',
          }}
        >
          {/* Ruled lines background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 31px, #6b4e1a 31px, #6b4e1a 32px)',
              backgroundPosition: '0 48px',
            }}
          />

          {/* Red margin line */}
          <div
            className="absolute top-0 bottom-0 left-[68px] w-px opacity-20"
            style={{ background: '#c0392b' }}
          />

          {/* Top crease */}
          <div
            className="absolute top-0 left-0 right-0 h-px opacity-20"
            style={{ background: 'linear-gradient(to right, transparent, #8b6914, transparent)' }}
          />

          {/* Header */}
          <div className="relative pl-20 pr-8 pt-8 pb-4">
            {/* Close */}
            <button
              onClick={onSkip}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-black/5 transition-colors text-amber-900/40 hover:text-amber-900/70 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p
                className="text-lg uppercase tracking-[0.25em] text-amber-900/40 mb-1"
                style={{ fontFamily: 'var(--font-sans), serif' }}
              >
                A letter from
              </p>
              <h3 className="text-3xl text-[#260303]" style={{ fontWeight: 400 }}>
                {name || 'You'}
              </h3>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-3 mt-4 mb-1">
              <div className="flex-1 h-px bg-amber-900/10" />
              <span className="text-amber-800/30 text-xs">✦</span>
              <div className="flex-1 h-px bg-amber-900/10" />
            </div>
          </div>

          {/* Body */}
          <motion.div
            className="pr-8 pl-20 pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg text-amber-900/40 mb-3 italic">Dear Alin &amp; Afeef,</p>

            {error && (
              <div className="mb-3 p-2.5 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-700">
                {error}
              </div>
            )}

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your wishes, blessings, or a heartfelt message here…"
              rows={6}
              autoFocus
              className="w-full bg-transparent resize-none text-[#260303] placeholder-amber-900/25 focus:outline-none leading-8 text-lg"
            />
          </motion.div>

          {/* Footer */}
          <motion.div
            className="pr-8 pl-20 pb-7 pt-3 flex gap-3"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <button
              type="button"
              onClick={onSkip}
              className="flex-1 py-2.5 border border-amber-900/10 text-amber-900/60 rounded-xl text-lg font-medium tracking-wide hover:bg-amber-900/5 transition-colors cursor-pointer"
            >
              Skip
            </button>
            <button
              type="button"
              disabled={submitting || !message.trim()}
              onClick={() => onSend(message)}
              className="flex-2 py-2.5 text-white rounded-xl text-lg font-medium tracking-wide shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              style={{
                background:
                  submitting || !message.trim()
                    ? 'rgba(109, 84, 74, 0.2)'
                    : 'linear-gradient(135deg, #b45309, #92400e)',
              }}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Sealing…
                </>
              ) : (
                <>
                  <PenLine className="w-3.5 h-3.5" />
                  Send Letter
                </>
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
