'use client'

import React from 'react'
import { MapPin, Navigation, Car, Hotel } from 'lucide-react'

export default function Venue() {
  const address = '168, Jalan Imbi, Bukit Bintang, 55100 Kuala Lumpur, Malaysia'
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <div className="flex flex-col gap-8 text-stone-800 h-full overflow-y-auto pb-4">
      {/* Top Banner / Venue Summary */}
      <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <span className="text-xs font-sans tracking-widest text-stone-500 uppercase flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            The Location
          </span>
          <h2 className="text-3xl font-serif text-stone-800 mt-2 font-semibold">Grand Ballroom</h2>
          <p className="text-lg font-serif text-stone-600 mt-1">The Ritz-Carlton, Kuala Lumpur</p>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 bg-amber-700 hover:bg-amber-800 text-stone-100 rounded-2xl text-sm font-medium tracking-wide uppercase shadow-md flex items-center gap-2 transition-colors self-stretch md:self-auto justify-center"
        >
          <Navigation className="w-4 h-4" />
          Navigate with Maps
        </a>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Driving & Parking Card */}
        <div className="bg-stone-50/50 border border-stone-200/60 rounded-3xl p-6 space-y-4">
          <h3 className="text-xl font-serif text-stone-800 font-medium flex items-center gap-2">
            <Car className="w-5 h-5 text-stone-500" />
            Parking & Directions
          </h3>
          <p className="text-sm text-stone-600 font-serif leading-relaxed">
            Guests can park directly inside the hotel's secure underground parking. Flat-rate parking validation is available at the reception desk inside the ballroom lobby. 
          </p>
          <p className="text-sm text-stone-600 font-serif leading-relaxed">
            If you are traveling by ride-sharing services (e.g. Grab), set your drop-off location to <strong>The Ritz-Carlton Lobby, Kuala Lumpur</strong>.
          </p>
        </div>

        {/* Accommodations Card */}
        <div className="bg-stone-50/50 border border-stone-200/60 rounded-3xl p-6 space-y-4">
          <h3 className="text-xl font-serif text-stone-800 font-medium flex items-center gap-2">
            <Hotel className="w-5 h-5 text-stone-500" />
            Accommodations
          </h3>
          <p className="text-sm text-stone-600 font-serif leading-relaxed">
            For guests wishing to stay overnight, we have arranged a special block of discounted rooms at the hotel. Please mention our wedding when booking directly with reservations.
          </p>
          <p className="text-sm text-stone-600 font-serif leading-relaxed">
            Other nearby hotels within a 3-minute walking distance include the JW Marriott and The Westin Kuala Lumpur.
          </p>
        </div>
      </div>
    </div>
  )
}
