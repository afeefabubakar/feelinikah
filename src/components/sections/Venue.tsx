'use client'

import React from 'react'
import { MapPin, Navigation, Car, Hotel } from 'lucide-react'
import Image from 'next/image'

export default function Venue() {
  const address = '168, Jalan Imbi, Bukit Bintang, 55100 Kuala Lumpur, Malaysia'
  const mapsUrl = `https://maps.app.goo.gl/AH7XjQerzDpo7kTN7`

  return (
    <div className="flex flex-col gap-8 text-white h-full overflow-y-auto pb-4">
      {/* Top Banner / Venue Summary */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <div className="font-sans flex items-center gap-1.5">
            <MapPin className="w-4 h-4 mb-2" />
            <span className="text-2xl">The Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl text-white mt-2 font-semibold">
            Carpe Diem
            <br className="sm:hidden" /> Orchard Home
          </h2>
          <p className="text-white/70 mt-1">Serendah</p>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-2xl font-medium tracking-wide uppercase shadow-md flex items-center gap-2 transition-colors self-stretch md:self-auto justify-center"
        >
          <Navigation className="w-4 h-4" />
          Navigate with Maps
        </a>
      </div>

      <div className="rounded-2xl">
        <Image
          src="/image/venue.jpg"
          alt="Carpe Diem Orchard Home venue map"
          width={1280}
          height={914}
          className="w-full h-auto rounded-2xl object-contain"
          priority
        />
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
