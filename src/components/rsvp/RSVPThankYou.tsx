'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CalendarPlus, ChevronUp } from 'lucide-react'
import { Button } from '@/components/Button'

interface RSVPThankYouProps {
  name: string
  isAttending: boolean
  onClose: () => void
}

export function RSVPThankYou({ name, isAttending, onClose }: RSVPThankYouProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const icsApiPath = '/api/calendar'
  const webcalUrl =
    typeof window !== 'undefined'
      ? `webcal://${window.location.host}${icsApiPath}`
      : `webcal://feelinikah.com${icsApiPath}`

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Alin and Afeef's Solemnization & Intimate Breakfast Wedding 💍")}&dates=20260926T080000%2F20260926T120000&details=${encodeURIComponent('Join us to celebrate our wedding day!')}&location=${encodeURIComponent('Carpe Diem Orchard Home, Serendah')}`

  const outlookDownload = () => {
    const a = document.createElement('a')
    a.href = icsApiPath
    a.download = 'feelinikah-save-the-date.ics'
    a.click()
    setDropdownOpen(false)
  }

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
            <div ref={dropdownRef} className="relative w-full">
              {/* Dropdown Options */}
              <div
                className={`absolute z-10 bottom-full left-0 right-0 mb-2 rounded-xl overflow-hidden border border-black/10 bg-white shadow-xl transition-all duration-200 origin-bottom ${
                  dropdownOpen
                    ? 'opacity-100 scale-y-100 pointer-events-auto'
                    : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
              >
                {/* Google Calendar */}
                <Button
                  as="a"
                  variant="ghost"
                  size="lg"
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full justify-start gap-4 text-black hover:bg-black/5 rounded-none border-b border-black/5"
                >
                  <span className="text-lg font-sans">Google Calendar</span>
                </Button>

                {/* Apple Calendar */}
                <Button
                  as="a"
                  variant="ghost"
                  size="lg"
                  href={webcalUrl}
                  onClick={() => setDropdownOpen(false)}
                  className="w-full justify-start gap-4 text-black hover:bg-black/5 rounded-none border-b border-black/5"
                >
                  <span className="text-lg font-sans">Apple Calendar</span>
                </Button>

                {/* Outlook */}
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={outlookDownload}
                  className="w-full justify-start gap-4 text-black hover:bg-black/5 rounded-none"
                >
                  <span className="text-lg font-sans">Outlook</span>
                </Button>
              </div>

              {/* Main Save the Date Trigger Button */}
              <Button
                onClick={() => setDropdownOpen((o) => !o)}
                variant="blue-gradient"
                size="lg"
                className="mt-2 flex items-center justify-center gap-2"
                fullWidth
              >
                <CalendarPlus className="mb-2 w-4 h-4" />
                <span>Save the Date</span>
              </Button>
            </div>
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
