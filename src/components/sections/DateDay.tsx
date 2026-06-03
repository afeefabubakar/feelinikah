'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Heart, CalendarPlus, ChevronUp } from 'lucide-react'
import { Button } from '@/components/Button'

export default function DateDay() {
  const weddingDate = new Date('2026-09-26T08:00:00')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [hasMounted, setHasMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // webcal:// tells macOS & iOS to open the URL directly in Calendar.app
  // We point it at our own API route so it's a stable hosted URL
  const icsApiPath = '/api/calendar'
  const webcalUrl =
    typeof window !== 'undefined'
      ? `webcal://${window.location.host}${icsApiPath}`
      : `webcal://feelinikah.com${icsApiPath}`

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Alin and Afeef's Solemnization & Intimate Breakfast Wedding 💍")}&dates=20260926T080000%2F20260926T120000&details=${encodeURIComponent('Join us to celebrate our wedding day!')}&location=${encodeURIComponent('Carpe Diem Orchard Home, Serendah')}`

  // Outlook / Windows: direct HTTPS download of the ICS file from the API route
  const outlookDownload = () => {
    const a = document.createElement('a')
    a.href = icsApiPath
    a.download = 'feelinikah-save-the-date.ics'
    a.click()
    setDropdownOpen(false)
  }

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  // September 2026 starts on a Tuesday (1 empty slot when starting week on Monday)
  const calendarDays = [
    null, // Empty slot
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
    <div className="flex flex-col items-center text-white h-full select-none overflow-hidden">
      <h2 className="mb-3 mt-4 max-sm:text-[2.6rem] text-[3.5rem]">26 September 2026</h2>

      {/* Countdown */}
      {hasMounted && (
        <div className="grid grid-cols-4 gap-4 text-center border-b border-white pb-2 mb-3 w-full max-w-sm">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tabular-nums">{timeLeft.days}</span>
            <span className="text-lg tracking-widest text-white/70 font-semibold uppercase font-sans -mt-1">
              Days
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tabular-nums">{timeLeft.hours}</span>
            <span className="text-lg tracking-widest text-white/70 font-semibold uppercase font-sans -mt-1">
              Hours
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tabular-nums">{timeLeft.minutes}</span>
            <span className="text-lg tracking-widest text-white/70 font-semibold uppercase font-sans -mt-1">
              Mins
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tabular-nums">{timeLeft.seconds}</span>
            <span className="text-lg tracking-widest text-white/70 font-semibold uppercase font-sans -mt-1">
              Secs
            </span>
          </div>
        </div>
      )}

      {/* Calendar Grid Container */}
      <div className="flex w-full justify-center">
        <div className="bg-white px-4 py-5 rounded-xl max-w-sm w-full">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
            <h5 className="font-semibold text-[#260303] tracking-wide text-[34px] leading-tight">
              September 2026
            </h5>
          </div>

          {/* Weekday Initials */}
          <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center mb-2 sm:mb-4">
            {daysOfWeek.map((day, idx) => (
              <span key={idx} className="text-[#6d544a] text-lg sm:text-xl uppercase">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center items-center">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} />
              }

              const isWeddingDay = day === 26

              return (
                <div
                  key={day}
                  className="relative w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mx-auto"
                >
                  {isWeddingDay ? (
                    <>
                      {/* Pulsing Love Shaped Heart behind the number 26 */}
                      <div className="absolute z-1 w-fit h-fit top-[45%] left-[49%] -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center animate-pulse duration-3000">
                        <Heart className="w-10 h-10 sm:w-11 sm:h-11 stroke-rose-500 drop-shadow-[0_2px_6px_rgba(225,29,72,0.4)]" />
                      </div>
                      <span className="relative z-1  text-black font-bold text-2xl">{day}</span>
                    </>
                  ) : (
                    <span className="text-black text-xl aspect-square sm:text-2xl hover:bg-amber-900/5 hover:rounded-full cursor-default w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-200">
                      {day}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Save the Date — dropdown button */}
      <div ref={dropdownRef} className="relative w-full mt-3">
        {/* Dropdown options — rendered above the button */}
        <div
          className={`absolute z-10 bottom-full left-0 right-0 mb-2 rounded-xl overflow-hidden border border-white/20 bg-black/80 backdrop-blur-md shadow-xl transition-all duration-200 origin-bottom ${
            dropdownOpen
              ? 'opacity-100 scale-y-100 pointer-events-auto'
              : 'opacity-0 scale-y-95 pointer-events-none'
          }`}
        >
          {/* Google Calendar */}
          <Button
            id="save-google-calendar-btn"
            as="a"
            variant="ghost"
            size="lg"
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setDropdownOpen(false)}
            className="w-full justify-start gap-4 text-white hover:bg-white/10 hover:text-white rounded-none border-b border-white/10"
          >
            <span className="text-xl font-sans">Google Calendar</span>
          </Button>

          {/* Apple Calendar — webcal:// opens Calendar.app directly on macOS & iOS */}
          <Button
            id="save-apple-calendar-btn"
            as="a"
            variant="ghost"
            size="lg"
            href={webcalUrl}
            onClick={() => setDropdownOpen(false)}
            className="w-full justify-start gap-4 text-white hover:bg-white/10 hover:text-white rounded-none border-b border-white/10"
          >
            <span className="text-xl font-sans">Apple Calendar</span>
          </Button>

          {/* Outlook — downloads the .ics from the API route */}
          <Button
            id="save-outlook-btn"
            variant="ghost"
            size="lg"
            onClick={outlookDownload}
            className="w-full justify-start gap-4 text-white hover:bg-white/10 hover:text-white rounded-none"
          >
            <span className="text-xl font-sans">Outlook</span>
          </Button>
        </div>

        {/* Main trigger button */}
        <Button
          id="save-the-date-btn"
          variant="outline"
          fullWidth
          onClick={() => setDropdownOpen((o) => !o)}
          className="gap-3 text-2xl rounded-xl"
        >
          <CalendarPlus className="w-6 h-6 shrink-0" />
          <span className="-mb-2">Save the Date</span>
          <ChevronUp
            className={`w-5 h-5 ml-auto shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>
    </div>
  )
}
