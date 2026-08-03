'use client'

import React from 'react'
import { MapPin, Navigation } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/Button'

export default function Venue() {
  const mapsUrl = `https://maps.app.goo.gl/AH7XjQerzDpo7kTN7`

  return (
    <div className="flex flex-col gap-3 items-center text-white w-full">
      {/* Top Banner / Venue Summary */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-col justify-between items-start text-left w-full">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 shrink-0 text-white mb-1.5" />
            <h2 className="text-3xl text-white tracking-wide leading-none">Carpe Diem</h2>
          </div>
          <p className="text-2xl text-white/90 leading-none mt-0">Orchard Home Serendah</p>
        </div>
        <Button
          as="a"
          variant="primary"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-stretch gap-2 whitespace-nowrap mt-2.5 py-1.5"
        >
          <Navigation className="w-4 h-4 mb-1" />
          <span className="text-lg sm:text-xl">Navigate with Maps</span>
        </Button>
      </div>

      <div className="flex flex-col items-center w-full">
        <Image
          src="/image/carpe-diem-pavilion-v2.png"
          alt="Carpe Diem Orchard Home pavilion"
          width={1280}
          height={914}
          className="w-full h-auto object-contain rounded-2xl border-2 border-white/10"
          onLoad={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('resize'))
            }
          }}
          priority
        />
        <div className="mt-2 text-center text-white/90">
          <p className="text-xl">Solemnization - Pavillion Hall</p>
          <p className="text-xl">Breakfast Wedding - Garden</p>
        </div>
      </div>

      {/* Details Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
      {/* Driving & Parking Card */}
      {/* <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
          <h3 className="text-xl font-sans text-white font-medium flex items-center gap-2">
            <Car className="w-5 h-5 text-white/50" />
            Parking & Directions
          </h3>
          <p className="text-sm text-white/70 font-sans leading-relaxed">
            Guests can park directly inside the hotel's secure underground parking. Flat-rate
            parking validation is available at the reception desk inside the ballroom lobby.
          </p>
          <p className="text-sm text-white/70 font-sans leading-relaxed">
            If you are traveling by ride-sharing services (e.g. Grab), set your drop-off location to{' '}
            <strong>The Ritz-Carlton Lobby, Kuala Lumpur</strong>.
          </p>
        </div>
      </div> */}
    </div>
  )
}
