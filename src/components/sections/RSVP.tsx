'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { RSVPConfirmModal } from '@/components/rsvp/RSVPConfirmModal'
import { LetterModal } from '@/components/rsvp/LetterModal'


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
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (isAttending === null) { setError('Please select whether you are attending.'); return }

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
    <div className="relative text-stone-800 h-full flex flex-col overflow-y-auto pb-4">
      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <h3 className="text-xl font-serif text-stone-800 font-semibold mb-1">Join Our Celebration</h3>
          <p className="text-sm font-sans text-stone-500">Please RSVP by April 24, 2026</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-sm text-rose-700 font-serif">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-sans text-stone-600 font-medium">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Groom's Cousin or Alin's Friend"
            className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-serif text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-700 transition-all"
            required
          />
        </div>

        {/* Attendance */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-sans text-stone-600 font-medium">Will you be attending?</label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: true, label: 'Yes, happily!' },
              { value: false, label: 'Regretfully, no' },
            ].map(({ value, label }) => (
              <button
                key={String(value)}
                type="button"
                onClick={() => setIsAttending(value)}
                className={`py-3 rounded-2xl text-sm font-sans tracking-wide font-semibold border transition-all ${
                  isAttending === value
                    ? 'bg-amber-700/10 border-amber-700 text-amber-900 shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
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
              <label className="text-sm font-sans text-stone-600 font-medium">
                Number of attendees (including yourself)
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAttendeesCount((n) => Math.max(1, n - 1))}
                  className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-lg font-semibold hover:bg-stone-200 transition-colors flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-xl font-serif text-stone-800 w-6 text-center tabular-nums">
                  {attendeesCount}
                </span>
                <button
                  type="button"
                  onClick={() => setAttendeesCount((n) => n + 1)}
                  className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-lg font-semibold hover:bg-stone-200 transition-colors flex items-center justify-center"
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
          className="w-full py-3.5 bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 text-stone-100 rounded-2xl text-sm font-medium tracking-wide uppercase shadow-md flex items-center justify-center gap-2 transition-colors"
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
