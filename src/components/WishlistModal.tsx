'use client'

import React from 'react'
import { Upload } from 'lucide-react'

// Placeholder for the Wishlist modal content
export function WishlistModal() {
  return (
    <div className="space-y-6">
      <p className="text-[#6d544a]">
        This is where the registry items will appear.
      </p>
      
      {/* Example Item */}
      <div className="border border-amber-900/15 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="font-medium text-[#260303] text-lg">Espresso Machine</h3>
          <p className="text-amber-900/60 text-sm mt-1">2 guests looking into it</p>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <button className="px-4 py-2 bg-[#6d544a]/10 text-[#6d544a] rounded-lg text-sm font-medium hover:bg-[#6d544a]/20 transition-colors flex-1 sm:flex-none cursor-pointer">
            I'm looking into it
          </button>
          <button className="px-4 py-2 bg-amber-700 text-white rounded-lg text-sm font-medium hover:bg-amber-800 transition-colors flex items-center justify-center gap-2 flex-1 sm:flex-none shadow-sm cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload Receipt
          </button>
        </div>
      </div>
    </div>
  )
}
