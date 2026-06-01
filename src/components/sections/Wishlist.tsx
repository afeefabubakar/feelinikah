'use client'

import React, { useState, useEffect } from 'react'
import { Gift, Loader2, Upload, Lock, Check, ExternalLink, Sparkles } from 'lucide-react'
import { Button } from '@/components/Button'
import Image from 'next/image'
import { storage } from '@/lib/storage'

type RegistryItem = {
  id: string
  title: string
  description?: string
  link?: string
  image?:
    | {
        url: string
      }
    | string
    | null
  interested: number
  isClaimed: boolean
  proofOfPurchase?:
    | {
        url: string
      }
    | string
    | null
}

export default function Wishlist() {
  const [items, setItems] = useState<RegistryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadingItemId, setUploadingItemId] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [claimedItemName, setClaimedItemName] = useState('')
  const [trackedGiftIds, setTrackedGiftIds] = useState<string[]>([])

  // ── Fetch Wishlist items dynamically from Payload API ────────────────────
  useEffect(() => {
    fetch('/api/wishlist?limit=50&sort=createdAt')
      .then((res) => res.json())
      .then((data) => {
        setItems(data?.docs || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load wishlist:', err)
        setLoading(false)
      })

    // Load tracked gifts from local storage
    setTrackedGiftIds(storage.getTrackedGifts())
  }, [])

  const getImageUrl = (imageField: any) => {
    if (!imageField) return null
    if (typeof imageField === 'object' && imageField.url) return imageField.url
    return null
  }

  // ── handleLooking PATCH request (Toggles track/untrack locally & updates DB) ──
  async function handleLooking(id: string) {
    const item = items.find((i) => i.id === id)
    if (!item || item.isClaimed) return

    const isTracking = trackedGiftIds.includes(id)
    const newCount = isTracking
      ? Math.max(0, (item.interested || 0) - 1)
      : (item.interested || 0) + 1

    try {
      const res = await fetch(`/api/wishlist/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interested: newCount }),
      })
      if (res.ok) {
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, interested: newCount } : i)))
        if (isTracking) {
          storage.untrackGift(id)
          setTrackedGiftIds((prev) => prev.filter((x) => x !== id))
        } else {
          storage.trackGift(id)
          setTrackedGiftIds((prev) => [...prev, id])
        }
      }
    } catch (err) {
      console.error('Failed to update interest:', err)
    }
  }

  // ── handleFileUpload PATCH request ────────────────────────────────────────
  async function handleFileUpload(id: string, file: File) {
    setUploadingItemId(id)
    try {
      const targetItem = items.find((item) => item.id === id)
      if (!targetItem) return

      // 1. Upload proof of purchase receipt to Payload's Media endpoint
      const formData = new FormData()
      formData.append('alt', `Receipt proof for ${targetItem.title}`)
      formData.append('file', file)

      const uploadRes = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })

      console.log(await uploadRes.json())
      if (!uploadRes.ok) throw new Error('Failed to upload proof.')
      const uploadData = await uploadRes.json()
      const mediaId = uploadData.doc.id

      // 2. Mark item as purchased (isClaimed: true) and attach proof of purchase
      const patchRes = await fetch(`/api/wishlist/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isClaimed: true, proofOfPurchase: mediaId }),
      })

      if (!patchRes.ok) throw new Error('Failed to claim item.')

      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, isClaimed: true } : i)))

      // Clean up local tracked state since it is now claimed
      storage.untrackGift(id)
      setTrackedGiftIds((prev) => prev.filter((x) => x !== id))

      setClaimedItemName(targetItem.title)
      setShowToast(true)
    } catch (err: any) {
      console.error(err)
      alert(err.message || 'Failed to claim item. Please try again.')
    } finally {
      setUploadingItemId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
        <Loader2 className="w-10 h-10 text-white/30 animate-spin" />
        <p className="tracking-widest text-white/50 font-sans uppercase animate-pulse">
          Loading Registry…
        </p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-8 bg-white/5 border border-white/10 rounded-3xl gap-4 max-w-md mx-auto">
        <Gift className="w-12 h-12 text-white/20" />
        <div>
          <h3 className="font-sans font-semibold text-white">Registry is being prepared</h3>
          <p className="text-white/50 font-sans mt-1 leading-relaxed">
            We are currently compiling our list. Check back soon to see our wishlist!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative text-white flex flex-col justify-between pb-4">
      <div className="space-y-6">
        {/* Header — title removed, keeping the 'if you wish' text */}
        <p className="font-sans">
          If you wish to bless us with a wedding gift, here are some things we are currently looking
          into.
        </p>

        {/* Wishlist Items List */}
        <div className="space-y-4">
          {items.map((item) => {
            const imageUrl = getImageUrl(item.image)
            return (
              <div
                key={item.id}
                className={`border rounded-3xl p-5 flex flex-col gap-4 transition-all duration-300 ${
                  item.isClaimed
                    ? 'bg-emerald-950/40 border-emerald-800/40 shadow-sm opacity-90'
                    : 'bg-white/5 border-white/10 hover:border-amber-700/30'
                }`}
              >
                {/* Row 1: Image + Title + Viewing count */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Image */}
                  <div className="w-full h-auto sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        width={800}
                        height={800}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Gift className="w-8 h-8 text-white/20" />
                    )}
                  </div>

                  {/* Title + viewing count */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    {/* Title — clickable link if item.link exists */}
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-start sm:items-center gap-1.5 font-sans font-semibold hover:underline underline-offset-2 transition-colors ${
                          item.isClaimed
                            ? 'text-emerald-300 line-through'
                            : 'text-white hover:text-white/80'
                        }`}
                      >
                        <span>{item.title}</span>
                        <ExternalLink className="w-4 h-4 shrink-0 opacity-60 max-sm:mt-1" />
                      </a>
                    ) : (
                      <span
                        className={`font-sans font-semibold ${
                          item.isClaimed ? 'text-emerald-300 line-through' : 'text-white'
                        }`}
                      >
                        {item.title}
                      </span>
                    )}

                    {/* Claimed badge */}
                    {item.isClaimed && (
                      <span className="font-sans font-bold tracking-wider uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded-full inline-flex items-center gap-1 w-fit">
                        <Lock className="w-3 h-3" />
                        Gift Claimed
                      </span>
                    )}

                    {/* Viewing count */}
                    {!item.isClaimed && (
                      <p className="font-sans flex items-center gap-1 text-2xl">
                        {item.interested || 0}{' '}
                        {(item.interested || 0) === 1 ? 'guest is' : 'guests are'} looking into this
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
                  {!item.isClaimed ? (
                    <>
                      <Button
                        onClick={() => handleLooking(item.id)}
                        variant={trackedGiftIds.includes(item.id) ? 'primary' : 'outline'}
                        size="sm"
                        className="whitespace-nowrap"
                      >
                        {trackedGiftIds.includes(item.id) ? 'Interested ✓' : "I'm interested!"}
                      </Button>

                      <Button
                        as="label"
                        variant="primary"
                        size="sm"
                        className="flex items-center gap-1.5 whitespace-nowrap"
                      >
                        {uploadingItemId === item.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mb-2" />
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
                      </Button>
                    </>
                  ) : (
                    <span className="font-sans font-bold tracking-wider uppercase text-emerald-400 flex items-center gap-1">
                      <Check className="w-4 h-4 text-emerald-400" />
                      Thank You!
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Cutesy Gift Claimed Success Overlay Toast */}
      {showToast && (
        <div className="absolute inset-0 bg-[#6d544a]/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-emerald-950/80 border border-emerald-800/40 rounded-full flex items-center justify-center shadow-md animate-bounce">
              <Gift className="w-10 h-10 text-emerald-400" />
            </div>
            <span className="absolute -top-1 -right-1 text-2xl animate-ping opacity-60">🎁</span>
            <span className="absolute -bottom-2 -left-2 text-xl animate-pulse">🎉</span>
          </div>

          <h2 className="font-sans text-emerald-400 font-bold mb-2">Gift Registered!</h2>
          <p className="text-white/90 font-sans leading-relaxed max-w-[280px] mb-8">
            We are incredibly grateful for your warm generosity. <strong>{claimedItemName}</strong>{' '}
            has been registered on our list and locked!
          </p>

          <Button
            onClick={() => setShowToast(false)}
            variant="primary"
            className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
            size="sm"
          >
            <Check className="w-4 h-4" />
            Close
          </Button>
        </div>
      )}
    </div>
  )
}
