'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { RSVPConfirmModal } from '@/components/rsvp/RSVPConfirmModal'
import { LetterModal } from '@/components/rsvp/LetterModal'
import { MessageBoard } from '@/components/rsvp/MessageBoard'
import { Button } from '@/components/Button'
import { useWeddingVariation } from '@/hooks/useWeddingVariation'

type Stage = 'form' | 'confirm' | 'letter'

interface RSVPProps {
  onComplete: (name: string, isAttending: boolean) => void
}

export default function RSVP({ onComplete }: RSVPProps) {
  const variation = useWeddingVariation()
  const maxAttendees = variation === 'bride' || variation === 'groom' ? 10 : 2

  const [name, setName] = useState('')
  const [isAttending, setIsAttending] = useState<boolean | null>(null)
  const [attendeesCount, setAttendeesCount] = useState(1)

  const [stage, setStage] = useState<Stage>('form')
  const [rsvpId, setRsvpId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ── Step 1: Submit RSVP ────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (isAttending === null) {
      setError('Please select whether you are attending.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          isAttending,
          attendeesCount: isAttending ? attendeesCount : 0,
        }),
      })
      if (!res.ok) throw new Error('Failed to submit RSVP.')
      const data = await res.json()
      setRsvpId(data.doc.id)
      setStage('confirm')
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Step 3 (optional): Send letter ─────────────────────────────────────────
  async function handleSendLetter(message: string) {
    setSubmitting(true)
    setError(null)
    try {
      if (rsvpId) {
        const res = await fetch(`/api/rsvp/${rsvpId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        })
        if (!res.ok) throw new Error('Failed to send message.')
      }
      onComplete(name, isAttending ?? false)
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleSkip() {
    onComplete(name, isAttending ?? false)
  }

  return (
    <div className="relative text-white h-full flex flex-col overflow-y-auto pb-4">
      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <h3 className="font-semibold mb-1 whitespace-nowrap">Join Our Celebration</h3>
          <p className="text-white">Please RSVP by 1st July 2026</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/30 rounded-xl text-sm text-rose-200">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans font-medium text-white/95" htmlFor="name">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:border-amber-900 transition-all"
            required
          />
        </div>

        {/* Attendance */}
        <div className="flex flex-col gap-2">
          <label className="text-white/95" htmlFor="attending">
            Will you be attending?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: true, label: 'Yes, happily!' },
              { value: false, label: 'Regretfully, no...' },
            ].map(({ value, label }) => (
              <Button
                key={String(value)}
                type="button"
                onClick={() => setIsAttending(value)}
                variant={isAttending === value ? 'primary' : 'outline'}
                className={`py-3 rounded-2xl border transition-all normal-case ${
                  isAttending === value ? 'border-amber-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Attendees count — only when attending */}
        <AnimatePresence>
          {isAttending === true && (
            <motion.div
              key="attendees"
              className="flex flex-col gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <label className="font-sans font-medium text-white/95" htmlFor="attendeesCount">
                Number of attendees (including yourself)
              </label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={() => setAttendeesCount((n) => Math.max(1, n - 1))}
                  variant="counter"
                  disabled={attendeesCount <= 1}
                >
                  −
                </Button>
                <span className="text-xl font-sans text-white w-6 text-center tabular-nums">
                  {attendeesCount}
                </span>
                <Button
                  type="button"
                  onClick={() => setAttendeesCount((n) => Math.min(maxAttendees, n + 1))}
                  variant="counter"
                  disabled={attendeesCount >= maxAttendees}
                >
                  +
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <Button
          type="submit"
          disabled={submitting}
          variant="primary"
          size="lg"
          fullWidth
          className="py-3.5 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting…
            </>
          ) : (
            'Submit RSVP'
          )}
        </Button>
      </form>

      {/* ── Guest messages board ── */}
      <MessageBoard />

      {/* ── Confirm modal (both flows) ── */}
      {stage === 'confirm' && isAttending !== null && (
        <RSVPConfirmModal
          name={name}
          isAttending={isAttending}
          onWriteMessage={() => setStage('letter')}
          onSkip={handleSkip}
        />
      )}

      {/* ── Letter modal ── */}
      {stage === 'letter' && (
        <LetterModal
          name={name}
          onSend={handleSendLetter}
          onSkip={handleSkip}
          submitting={submitting}
          error={error}
        />
      )}
    </div>
  )
}
