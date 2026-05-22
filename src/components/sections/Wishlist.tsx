'use client'

import React, { useState } from 'react'
import { Gift, Loader2, Sparkles, Upload, Lock, Check } from 'lucide-react'

type RegistryItem = {
  id: string
  name: string
  desc: string
  lookingCount: number
  claimed: boolean
  receiptUrl?: string
}

export default function Wishlist() {
  const [items, setItems] = useState<RegistryItem[]>([
    {
      id: 'espresso',
      name: 'Breville Espresso Machine',
      desc: 'To fuel our early morning coffees and late-night talks.',
      lookingCount: 3,
      claimed: false,
    },
    {
      id: 'bedding',
      name: 'Premium Egyptian Cotton Bedding Set',
      desc: 'For comfortable rest after a long day of adventures.',
      lookingCount: 1,
      claimed: false,
    },
    {
      id: 'cookware',
      name: 'Le Creuset Signature Cast Iron Dutch Oven',
      desc: 'For cozy family dinners and sunday afternoon stews.',
      lookingCount: 5,
      claimed: false,
    },
  ])

  const [uploadingItemId, setUploadingItemId] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [claimedItemName, setClaimedItemName] = useState('')

  function handleLooking(id: string) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && !item.claimed) {
          return { ...item, lookingCount: item.lookingCount + 1 }
        }
        return item
      })
    )
  }

  async function handleFileUpload(id: string, file: File) {
    setUploadingItemId(id)

    try {
      // 1. Create a FormData and upload to Payload's Media endpoint
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt', `Receipt for ${items.find((item) => item.id === id)?.name || 'registry item'}`)

      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to upload receipt.')
      const data = await res.json()
      const uploadedFileUrl = data.doc.url

      // 2. Mark item as claimed and attach the receipt URL
      setItems((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            setClaimedItemName(item.name)
            return { ...item, claimed: true, receiptUrl: uploadedFileUrl }
          }
          return item
        })
      )

      setUploadingItemId(null)
      setShowToast(true)
    } catch (err) {
      console.error(err)
      alert('Failed to upload receipt. Please try again.')
      setUploadingItemId(null)
    }
  }

  return (
    <div className="relative text-stone-800 h-full flex flex-col justify-between overflow-y-auto pb-4">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-xl font-serif text-stone-800 font-semibold mb-1">Our Registry & Wishlist</h3>
          <p className="text-sm font-sans text-stone-500 leading-relaxed">
            If you wish to bless us with a wedding gift, here are some things we are currently looking into.
          </p>
        </div>

        {/* Wishlist Items List */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`border rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 ${
                item.claimed
                  ? 'bg-emerald-50/40 border-emerald-200 shadow-sm opacity-90'
                  : 'bg-stone-50/50 border-stone-200/80 hover:border-amber-700/30'
              }`}
            >
              {/* Item Info */}
              <div className="space-y-1.5 flex-1 pr-2">
                <div className="flex items-center gap-2">
                  <h4 className={`text-lg font-serif font-semibold ${item.claimed ? 'text-emerald-950 line-through' : 'text-stone-800'}`}>
                    {item.name}
                  </h4>
                  {item.claimed && (
                    <span className="text-[10px] font-sans font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <Lock className="w-2.5 h-2.5" />
                      Gift Claimed
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 font-serif leading-relaxed max-w-lg">{item.desc}</p>
                
                {/* Looking count */}
                {!item.claimed && (
                  <p className="text-[11px] font-sans font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-700/80" />
                    {item.lookingCount} {item.lookingCount === 1 ? 'guest is' : 'guests are'} looking into this
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-end">
                {!item.claimed ? (
                  <>
                    {/* Looking into it button */}
                    <button
                      onClick={() => handleLooking(item.id)}
                      className="px-4 py-2.5 border border-stone-200 hover:border-amber-700/20 text-stone-600 hover:bg-stone-100 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all"
                    >
                      Looking into it
                    </button>

                    {/* Upload Receipt / Claim Button */}
                    <label className="cursor-pointer px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-stone-100 rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-sm transition-colors">
                      {uploadingItemId === item.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          Claim Gift
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        disabled={uploadingItemId !== null}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(item.id, file)
                        }}
                        className="hidden"
                      />
                    </label>
                  </>
                ) : (
                  <span className="text-xs font-sans font-bold tracking-wider uppercase text-emerald-700 flex items-center gap-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Thank You!
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cutesy Gift Claimed Success Overlay Toast */}
      {showToast && (
        <div className="absolute inset-0 bg-stone-50/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center shadow-md animate-bounce">
              <Gift className="w-10 h-10 text-emerald-600" />
            </div>
            <span className="absolute -top-1 -right-1 text-2xl animate-ping opacity-60">🎁</span>
            <span className="absolute -bottom-2 -left-2 text-xl animate-pulse">🎉</span>
          </div>

          <h2 className="text-3xl font-serif text-emerald-900 font-bold mb-2">Gift Registered!</h2>
          <p className="text-stone-600 font-serif leading-relaxed max-w-[280px] mb-8 text-base">
            We are incredibly grateful for your warm generosity. <strong>{claimedItemName}</strong> has been registered on our list and locked!
          </p>

          <button
            onClick={() => setShowToast(false)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-medium tracking-wide uppercase shadow-lg transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Close
          </button>
        </div>
      )}
    </div>
  )
}
