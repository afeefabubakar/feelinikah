'use client'

import React from 'react'
import { Upload } from 'lucide-react'

// Placeholder for the Wishlist modal content
export function WishlistModal() {
  return (
    <div className="space-y-6">
      <p className="text-stone-600">
        This is where the registry items will appear.
      </p>
      
      {/* Example Item */}
      <div className="border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="font-medium text-stone-800 text-lg">Espresso Machine</h3>
          <p className="text-stone-500 text-sm mt-1">2 guests looking into it</p>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <button className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-sm font-medium hover:bg-stone-200 transition-colors flex-1 sm:flex-none">
            I'm looking into it
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 flex-1 sm:flex-none shadow-sm">
            <Upload className="w-4 h-4" />
            Upload Receipt
          </button>
        </div>
      </div>
    </div>
  )
}
