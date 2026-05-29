'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

interface RSVPThankYouProps {
  name: string
  isAttending: boolean
  onClose: () => void
}

export function RSVPThankYou({ name, isAttending, onClose }: RSVPThankYouProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center text-center p-8 gap-4"
        style={{ background: '#fdf8f0' }}
        initial={{ opacity: 0, y: 48, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.95 }}
        transition={{ type: 'spring', damping: 22, stiffness: 180 }}
      >
        <div className="relative mb-2">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center shadow-md animate-bounce">
            <Sparkles className="w-10 h-10 text-white/70" />
          </div>
          <span className="absolute -top-1 -right-1 text-2xl animate-ping opacity-60">💖</span>
          <span className="absolute -bottom-2 -left-2 text-xl animate-pulse">✨</span>
        </div>

        <h2 className="text-3xl font-sans text-white font-bold">Thank You, {name}!</h2>
        <p className="text-white font-sans leading-relaxed max-w-[280px] text-base">
          {isAttending
            ? 'We are absolutely thrilled that you will be celebrating with us! Your wishes mean the world.'
            : 'We will truly miss you on our special day, but we are so grateful for your thoughts and love!'}
        </p>

        <button
          onClick={onClose}
          className="mt-2 px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white text-white rounded-2xl text-sm font-medium tracking-wide uppercase shadow-lg transition-colors flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          Close
        </button>
      </motion.div>
    </div>
  )
}
