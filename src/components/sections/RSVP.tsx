'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { RSVPConfirmModal } from '@/components/rsvp/RSVPConfirmModal'
import { LetterModal } from '@/components/rsvp/LetterModal'
import { MessageBoard } from '@/components/rsvp/MessageBoard'

type Stage = 'form' | 'confirm' | 'letter'

interface RSVPProps {
  onComplete: (name: string, isAttending: boolean) => void
}

export default function RSVP({ onComplete }: RSVPProps) {
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
    <div className="relative text-white h-full flex flex-col overflow-y-auto pb-4 scrollbar-none">
      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <h3 className="text-xl font-semibold mb-1">Join Our Celebration</h3>
          <p className="text-sm font-sans text-white/60">Please RSVP by 1st August 2026</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/30 rounded-xl text-sm text-rose-200 font-sans">
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
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-sans text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:border-amber-700 transition-all"
            required
          />
        </div>

        {/* Attendance */}
        <div className="flex flex-col gap-2">
          <label className="font-sans font-medium text-white/95" htmlFor="attending">
            Will you be attending?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: true, label: 'Yes, happily!' },
              { value: false, label: 'Regretfully, no' },
            ].map(({ value, label }) => (
              <button
                key={String(value)}
                type="button"
                onClick={() => setIsAttending(value)}
                className={`py-3 rounded-2xl tracking-wide font-semibold border transition-all cursor-pointer ${
                  isAttending === value
                    ? 'bg-amber-700 border-amber-600 text-white shadow-sm'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {label}
              </button>
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
                <button
                  type="button"
                  onClick={() => setAttendeesCount((n) => Math.max(1, n - 1))}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white text-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
                >
                  −
                </button>
                <span className="text-xl font-sans text-white w-6 text-center tabular-nums">
                  {attendeesCount}
                </span>
                <button
                  type="button"
                  onClick={() => setAttendeesCount((n) => n + 1)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white text-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 cursor-pointer bg-amber-700 hover:bg-amber-800 disabled:bg-white/10 disabled:text-white/35 text-white rounded-2xl text-sm font-medium tracking-wide uppercase shadow-md flex items-center justify-center gap-2 transition-colors"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting…
            </>
          ) : (
            'Submit RSVP'
          )}
        </button>
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
