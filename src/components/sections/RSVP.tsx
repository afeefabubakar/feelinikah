'use client'

import React, { useState } from 'react'
import { Check, Loader2, Sparkles } from 'lucide-react'

export default function RSVP() {
  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState('')
  const [isAttending, setIsAttending] = useState<boolean | null>(null)
  const [dietary, setDietary] = useState('')
  const [message, setMessage] = useState('')
  
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [rsvpId, setRsvpId] = useState<string | null>(null)

  async function handleMainSubmit(e: React.FormEvent) {
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          isAttending,
          dietaryRequirements: dietary,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit RSVP.')
      const data = await res.json()
      
      setRsvpId(data.doc.id) // Save the ID to update the message next
      setSubmitting(false)
      
      if (isAttending) {
        // If attending, prompt them to write a nice message!
        setStep(2)
      } else {
        // If not attending, show the thank you toast directly
        setShowToast(true)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
      setSubmitting(false)
    }
  }

  async function handleMessageSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      if (rsvpId) {
        const res = await fetch(`/api/rsvp/${rsvpId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
          }),
        })

        if (!res.ok) throw new Error('Failed to submit message.')
      }
      setSubmitting(false)
      setShowToast(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
      setSubmitting(false)
    }
  }

  function resetForm() {
    setName('')
    setIsAttending(null)
    setDietary('')
    setMessage('')
    setStep(1)
    setShowToast(false)
    setRsvpId(null)
  }

  return (
    <div className="relative text-stone-800 h-full flex flex-col justify-between overflow-y-auto pb-4">
      {step === 1 ? (
        /* Step 1: Basic RSVP */
        <form onSubmit={handleMainSubmit} className="space-y-5">
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

          {/* Attendance Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-sans text-stone-600 font-medium">Will you be attending?</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setIsAttending(true)}
                className={`py-3 rounded-2xl text-sm font-sans tracking-wide font-semibold border transition-all ${
                  isAttending === true
                    ? 'bg-amber-700/10 border-amber-700 text-amber-900 shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                Yes, happily!
              </button>
              <button
                type="button"
                onClick={() => setIsAttending(false)}
                className={`py-3 rounded-2xl text-sm font-sans tracking-wide font-semibold border transition-all ${
                  isAttending === false
                    ? 'bg-amber-700/10 border-amber-700 text-amber-900 shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                Regretfully, no
              </button>
            </div>
          </div>

          {/* Dietary Requirements */}
          {isAttending === true && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-sans text-stone-600 font-medium">Dietary Requirements (Optional)</label>
              <textarea
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="e.g. Allergies, Vegetarian, Vegan, Halal, etc."
                rows={2}
                className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-serif text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-700 transition-all resize-none"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 text-stone-100 rounded-2xl text-sm font-medium tracking-wide uppercase shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit RSVP'
            )}
          </button>
        </form>
      ) : (
        /* Step 2: Personal Message */
        <form onSubmit={handleMessageSubmit} className="space-y-5">
          <div>
            <h3 className="text-xl font-serif text-stone-800 font-semibold mb-1">Leave a Wish for the Couple</h3>
            <p className="text-sm font-sans text-stone-500">We'd love to read your warm messages and blessings!</p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-sm text-rose-700 font-serif">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-sans text-stone-600 font-medium">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your wishes here..."
              rows={5}
              className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-serif text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-700 transition-all resize-none"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setShowToast(true)}
              className="flex-1 py-3.5 border border-stone-200 text-stone-600 rounded-2xl text-sm font-medium tracking-wide uppercase hover:bg-stone-50 transition-colors"
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3.5 bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 text-stone-100 rounded-2xl text-sm font-medium tracking-wide uppercase shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>
      )}

      {/* Custom Cutesy Thank You Dialog Box Overlay */}
      {showToast && (
        <div className="absolute inset-0 bg-stone-50/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          {/* Cutesy Rounded Badge with Soft Pink Background */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center shadow-md animate-bounce">
              <Sparkles className="w-10 h-10 text-rose-500" />
            </div>
            {/* Soft decorative elements */}
            <span className="absolute -top-1 -right-1 text-2xl animate-ping opacity-60">💖</span>
            <span className="absolute -bottom-2 -left-2 text-xl animate-pulse">✨</span>
          </div>

          <h2 className="text-3xl font-serif text-rose-900 font-bold mb-2">Thank You, {name}!</h2>
          <p className="text-stone-600 font-serif leading-relaxed max-w-[280px] mb-8 text-base">
            {isAttending
              ? "We are absolutely thrilled that you will be celebrating with us! Your wishes mean the world."
              : "We will truly miss you on our special day, but we are so grateful for your thoughts and love!"}
          </p>

          <button
            onClick={resetForm}
            className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-sm font-medium tracking-wide uppercase shadow-lg transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Close
          </button>
        </div>
      )}
    </div>
  )
}
