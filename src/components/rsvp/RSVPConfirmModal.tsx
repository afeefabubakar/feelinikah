'use client'

import { motion } from 'framer-motion'
import { MessageSquareHeart, X } from 'lucide-react'
import { Button } from '@/components/Button'

interface RSVPConfirmModalProps {
  name: string
  isAttending: boolean
  onWriteMessage: () => void
  onSkip: () => void
}

export function RSVPConfirmModal({
  name,
  isAttending,
  onWriteMessage,
  onSkip,
}: RSVPConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Scrim */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onSkip}
      />

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: 'var(--color-parchment)' }}
        initial={{ opacity: 0, y: 48, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.95 }}
        transition={{ type: 'spring', damping: 22, stiffness: 180 }}
      >
        {/* Close */}
        <Button
          onClick={onSkip}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="px-8 pt-10 pb-8 flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-1"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #f9a8a8, #c0392b)',
              boxShadow: '0 6px 20px rgba(180,30,30,0.25)',
            }}
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: 'spring', damping: 14, stiffness: 200 }}
          >
            <MessageSquareHeart className="w-7 h-7 text-rose-50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl text-[#260303] font-semibold">
              {isAttending ? `See you there, ${name}! 🎉` : `We'll miss you, ${name} 🥹`}
            </h3>
            <p className="text-lg text-amber-900/70 font-sans mt-2 leading-relaxed">
              Would you like to leave a heartfelt message for the couple?
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-2.5 w-full mt-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
          >
            <Button
              onClick={onWriteMessage}
              variant="gold-gradient"
              size="lg"
              fullWidth
              className="py-3 text-lg font-medium normal-case"
            >
              Yes, write a message ✍️
            </Button>
            <Button
              onClick={onSkip}
              variant="outline-amber"
              size="lg"
              fullWidth
              className="py-3 text-lg font-medium normal-case"
            >
              No thanks, skip
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
