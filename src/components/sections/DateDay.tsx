'use client'

import React, { useState, useEffect } from 'react'
import { Heart, Calendar } from 'lucide-react'

export default function DateDay() {
  const weddingDate = new Date('2026-09-26T08:00:00')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
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

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  // September 2026 starts on a Tuesday (2 empty slots: Sun, Mon)
  const calendarDays = [
    null,
    null, // Empty slots
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
  ]

  return (
    <div className="flex flex-col items-center text-white h-full select-none">
      <h2 className="my-4 sm:my-6 max-sm:text-4xl">26 September 2026</h2>
      {/* Countdown */}
      {hasMounted && (
        <div className="grid grid-cols-4 gap-4 text-center mb-8 border-b border-white pb-6 w-full max-w-sm">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tabular-nums">{timeLeft.days}</span>
            <span className="text-lg tracking-widest text-white/70 font-semibold uppercase font-sans mt-1">
              Days
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tabular-nums">{timeLeft.hours}</span>
            <span className="text-lg tracking-widest text-white/70 font-semibold uppercase font-sans mt-1">
              Hours
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tabular-nums">{timeLeft.minutes}</span>
            <span className="text-lg tracking-widest text-white/70 font-semibold uppercase font-sans mt-1">
              Mins
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tabular-nums">{timeLeft.seconds}</span>
            <span className="text-lg tracking-widest text-white/70 font-semibold uppercase font-sans mt-1">
              Secs
            </span>
          </div>
        </div>
      )}

      {/* Calendar Grid Container */}
      <div className="flex w-full justify-center">
        <div className="max-w-sm bg-white p-8 rounded-xl w-full">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-6 pb-4">
            <h3 className="text-xl font-semibold text-[#260303] tracking-wide">September 2026</h3>
          </div>

          {/* Weekday Initials */}
          <div className="grid grid-cols-7 gap-y-2 text-center mb-4">
            {daysOfWeek.map((day, idx) => (
              <span key={idx} className="tracking-widest text-[#6d544a] font-semibold uppercase">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center items-center">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="w-8 h-8 sm:w-10 sm:h-10" />
              }

              const isWeddingDay = day === 26

              return (
                <div
                  key={day}
                  className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mx-auto"
                >
                  {isWeddingDay ? (
                    <>
                      {/* Pulsing Love Shaped Heart behind the number 26 */}
                      <div className="absolute inset-0 flex items-center justify-center animate-pulse duration-3000">
                        <Heart className="w-9 h-9 sm:w-11 sm:h-11 stroke-rose-500 drop-shadow-[0_2px_6px_rgba(225,29,72,0.4)]" />
                      </div>
                      <span className="relative z-10 text-black font-bold text-xl">{day}</span>
                    </>
                  ) : (
                    <span className="text-[#6d544a] text-xl hover:bg-amber-900/5 hover:rounded-full cursor-default w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-200">
                      {day}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
