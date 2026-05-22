'use client'

import React, { useState, useEffect } from 'react'
import { Clock, Calendar } from 'lucide-react'

type Variation = 'groom' | 'bride' | 'public'

export default function Tentative() {
  const [variation, setVariation] = useState<Variation>('public')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname.toLowerCase()
      if (hostname.includes('groom')) {
        setVariation('groom')
      } else if (hostname.includes('bride')) {
        setVariation('bride')
      } else {
        setVariation('public')
      }
    }
  }, [])

  const itineraries = {
    groom: [
      { time: '08:30 AM', event: 'Groom Convoy Assembly', desc: 'Family and friends assemble at the designated convoy start point.' },
      { time: '09:00 AM', event: 'Arrival at Solemnization Venue', desc: 'Convoy arrives with wedding gifts (hantaran).' },
      { time: '10:00 AM', event: 'Akad Nikah (Solemnization)', desc: 'The official solemnization ceremony begins.' },
      { time: '11:30 AM', event: 'Photography & Lunch', desc: 'Photoshoot with family and lunch is served.' },
    ],
    bride: [
      { time: '08:00 AM', event: 'Bride Prep & Makeup', desc: 'Final preparations and dressing.' },
      { time: '09:30 AM', event: 'Welcoming the Groom', desc: 'Groom convoy arrives and is welcomed by the bride’s family.' },
      { time: '10:00 AM', event: 'Akad Nikah (Solemnization)', desc: 'The official solemnization ceremony begins.' },
      { time: '12:00 PM', event: 'Bridal Photoshoot', desc: 'Outdoors photoshoot at the hotel gardens.' },
    ],
    public: [
      { time: '10:30 AM', event: 'Guest Arrival & Reception', desc: 'Welcoming of guests. Light refreshments served at the foyer.' },
      { time: '11:00 AM', event: 'Grand Entrance of the Couple', desc: 'Bride and groom enter the grand ballroom.' },
      { time: '11:15 AM', event: 'Blessings & Speeches', desc: 'Congratulatory speeches and prayers (Doa selamat).' },
      { time: '11:30 AM', event: 'Wedding Feast & Music', desc: 'Lunch is served with live instrumental music.' },
      { time: '01:00 PM', event: 'Cake Cutting & Photos', desc: 'Wedding cake-cutting ceremony followed by photography.' },
      { time: '02:00 PM', event: 'Send-off', desc: 'End of celebration. Farewell and thank-you gift collection.' },
    ],
  }

  const currentTimeline = itineraries[variation]

  return (
    <div className="flex flex-col gap-6 text-stone-800 h-full overflow-y-auto pb-4">
      {/* Variation Switcher Tabs */}
      <div className="flex bg-stone-100 border border-stone-200 p-1.5 rounded-2xl self-center max-w-full overflow-x-auto gap-1">
        {(['groom', 'bride', 'public'] as Variation[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariation(v)}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold tracking-wider uppercase transition-all ${
              variation === v
                ? 'bg-amber-700 text-stone-100 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {v === 'public' ? 'Public' : `${v}-side`}
          </button>
        ))}
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-sans tracking-widest text-stone-500 uppercase flex items-center justify-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          Itinerary
        </span>
        <h2 className="text-3xl font-serif text-stone-800 font-semibold">Tentative Schedule</h2>
      </div>

      {/* Itinerary Timeline list */}
      <div className="relative border-l border-stone-200 ml-4 md:ml-6 pl-6 space-y-6 py-2">
        {currentTimeline.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-stone-50 border border-stone-300 transition-colors group-hover:bg-amber-700 group-hover:border-amber-700 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-stone-50" />
            </div>

            {/* Time Badge */}
            <span className="text-xs font-sans font-bold tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 flex items-center gap-1.5 w-fit">
              <Clock className="w-3 h-3" />
              {item.time}
            </span>

            {/* Event Name */}
            <h3 className="text-lg font-serif font-semibold text-stone-800 mt-2">
              {item.event}
            </h3>

            {/* Description */}
            <p className="text-sm text-stone-500 font-serif leading-relaxed mt-1 max-w-xl">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
