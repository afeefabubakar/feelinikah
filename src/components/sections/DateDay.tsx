'use client'

import React, { useState, useEffect } from 'react'

export default function DateDay() {
  const weddingDate = new Date('2026-05-24T10:00:00') // Adjust to your actual wedding date/time
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function updateCountdown() {
      const now = new Date()
      const diff = weddingDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  // Generate calendar grid for May 2026
  // May 1, 2026 is a Friday (so 5 empty slots before it)
  const daysInMay = 31
  const startDayOffset = 5 // Friday
  const calendarCells = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startDayOffset + 1
    if (dayNumber > 0 && dayNumber <= daysInMay) {
      return dayNumber
    }
    return null
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-stone-800 h-full overflow-y-auto pb-4">
      {/* Calendar Card */}
      <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 shadow-inner flex flex-col items-center">
        <h3 className="text-2xl font-serif text-stone-700 mb-4 tracking-wide">May 2026</h3>
        <div className="grid grid-cols-7 gap-y-2 gap-x-3 text-center text-sm font-sans w-full max-w-[280px]">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i} className="font-semibold text-stone-400">
              {d}
            </span>
          ))}
          {calendarCells.map((cell, i) => {
            const isWeddingDay = cell === 24
            return (
              <span
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-base font-serif transition-all ${
                  cell ? 'text-stone-700' : 'text-transparent'
                } ${
                  isWeddingDay
                    ? 'bg-amber-700 text-stone-100 font-bold scale-110 shadow-md ring-4 ring-amber-100'
                    : ''
                }`}
              >
                {cell}
              </span>
            )
          })}
        </div>
        <p className="text-sm font-sans tracking-widest text-stone-500 uppercase mt-6 text-center">
          Sunday, May 24, 2026
        </p>
      </div>

      {/* Countdown Card */}
      <div className="flex flex-col justify-center items-center md:items-start space-y-6">
        <div className="text-center md:text-left">
          <h4 className="text-lg font-sans tracking-widest text-stone-500 uppercase">Save the Date</h4>
          <h2 className="text-4xl font-serif text-stone-800 mt-2 leading-snug">
            Countdown to our <br className="hidden md:inline" />Special Day
          </h2>
        </div>

        {/* Timer Numbers */}
        <div className="grid grid-cols-4 gap-4 text-center max-w-[320px]">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Mins' },
            { value: timeLeft.seconds, label: 'Secs' },
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-stone-50 border border-stone-100 rounded-2xl p-3 flex flex-col justify-center shadow-sm w-16 sm:w-20"
            >
              <span className="text-2xl sm:text-3xl font-serif text-amber-700 font-bold tracking-tight">
                {String(t.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-wider uppercase text-stone-400 mt-1">
                {t.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-base text-stone-600 font-serif leading-relaxed text-center md:text-left mt-2">
          Join us as we step into our forever. The celebration begins at 10:00 AM. We can’t wait to count down the final moments with you!
        </p>
      </div>
    </div>
  )
}
