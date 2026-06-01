'use client'

import { motion } from 'framer-motion'
import { CalendarPlus } from 'lucide-react'
import { Button } from '@/components/Button'

interface RSVPThankYouProps {
  name: string
  isAttending: boolean
  onClose: () => void
}

export function RSVPThankYou({ name, isAttending, onClose }: RSVPThankYouProps) {
  const webcalUrl =
    typeof window !== 'undefined'
      ? `webcal://${window.location.host}/api/calendar`
      : 'webcal://feelinikah.com/api/calendar'
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-6">
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
        className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center text-center p-8 gap-4 bg-white"
        initial={{ opacity: 0, y: 48, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.95 }}
        transition={{ type: 'spring', damping: 22, stiffness: 180 }}
      >
        <div className="relative mb-2"></div>

        <h3 className="text-black font-bold">Thank You, {name}</h3>
        <p className="text-black max-w-[280px]">
          {isAttending
            ? 'We are absolutely thrilled that you will be celebrating with us! Your wishes mean the world to us.'
            : 'We will truly miss you on our special day, but we are so grateful for your thoughts and love!'}
        </p>

        <div className="w-full space-y-2">
          {isAttending && (
            <Button
              as="a"
              href={webcalUrl}
              variant="blue-gradient"
              size="lg"
              className="mt-2 flex items-center gap-2"
              fullWidth
            >
              <CalendarPlus className="mb-2 w-4 h-4" />
              Save the Date
            </Button>
          )}

          <Button
            onClick={onClose}
            variant="outline-dark"
            size="lg"
            className="flex items-center gap-2"
            fullWidth
          >
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
