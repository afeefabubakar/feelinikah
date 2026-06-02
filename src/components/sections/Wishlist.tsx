'use client'

import React, { useState, useEffect } from 'react'
import { Gift, Loader2, Upload, Lock, Check, ExternalLink, Sparkles } from 'lucide-react'
import { Button } from '@/components/Button'
import Image from 'next/image'
import { storage } from '@/lib/storage'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'

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
  const [uploadingItemId, setUploadingItemId] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [claimedItemName, setClaimedItemName] = useState('')
  const [trackedGiftIds, setTrackedGiftIds] = useState<string[]>([])
  const [loadingLookingId, setLoadingLookingId] = useState<string | null>(null)

  // ── Fetch Wishlist items dynamically using TanStack React Query ───────────
  const { data, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await fetch('/api/wishlist?limit=50&sort=createdAt')
      if (!res.ok) throw new Error('Failed to load wishlist')
      const result = await res.json()
      return result?.docs || []
    },
  })

  // Synchronize state with query cache
  useEffect(() => {
    if (data) {
      setItems(data)
    }
  }, [data])

  useEffect(() => {
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

    setLoadingLookingId(id)

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
    } finally {
      setLoadingLookingId(null)
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

  if (isLoading && items.length === 0) {
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
                className={`border rounded-3xl p-5 flex flex-col gap-4 transition-all duration-300 bg-white/5 border-white/10 ${
                  item.isClaimed ? 'opacity-40 grayscale shadow-sm' : 'hover:border-amber-700/30'
                }`}
              >
                {/* Row 1: Image + Title + Status */}
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

                  {/* Title + status */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    {/* Title — clickable link if item.link exists */}
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline underline-offset-2 transition-colors text-white hover:text-white/80"
                      >
                        <span>
                          {item.title}{' '}
                          <ExternalLink className="inline w-4 h-4 shrink-0 opacity-60 mb-1" />
                        </span>
                      </a>
                    ) : (
                      <span className="font-sans font-semibold text-white">{item.title}</span>
                    )}

                    {/* Bought / Viewing status */}
                    {item.isClaimed ? (
                      <span className="font-sans text-white/50">Gift has been bought</span>
                    ) : (
                      <p className="font-sans flex items-center gap-1 text-2xl">
                        {item.interested || 0}{' '}
                        {(item.interested || 0) === 1 ? 'guest is' : 'guests are'} looking into this
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Buttons / Thank You */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
                  {!item.isClaimed ? (
                    <>
                      <Button
                        onClick={() => handleLooking(item.id)}
                        variant={trackedGiftIds.includes(item.id) ? 'primary' : 'outline'}
                        size="sm"
                        disabled={loadingLookingId !== null || uploadingItemId !== null}
                        className="whitespace-nowrap flex items-center justify-center gap-1.5"
                      >
                        {loadingLookingId === item.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1 mb-1" />
                            Updating...
                          </>
                        ) : trackedGiftIds.includes(item.id) ? (
                          'Interested ✓'
                        ) : (
                          "I'm interested!"
                        )}
                      </Button>

                      <Button
                        as="label"
                        variant="primary"
                        size="sm"
                        className={`flex items-center justify-center gap-1.5 whitespace-nowrap ${uploadingItemId !== null || loadingLookingId !== null ? 'opacity-50 pointer-events-none' : ''}`}
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
                          disabled={uploadingItemId !== null || loadingLookingId !== null}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(item.id, file)
                          }}
                          className="hidden"
                        />
                      </Button>
                    </>
                  ) : (
                    <span className="font-sans text-white/70 flex items-center gap-1">
                      <Check className="w-4 h-4 text-white/70 mb-1 mr-1" />
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
      <AnimatePresence>
        {showToast && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowToast(false)}
            />

            {/* Card */}
            <motion.div
              className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center text-center p-8 gap-4 bg-white"
              initial={{ opacity: 0, y: 48, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.95 }}
              transition={{ type: 'spring', damping: 22, stiffness: 180 }}
            >
              <h3 className="text-black font-bold">Gift Received!</h3>
              <p className="text-black/80 max-w-[280px]">
                We are incredibly grateful for your warm generosity.{' '}
                <strong>{claimedItemName}</strong> has been received on our list and locked!
              </p>

              <Button
                onClick={() => setShowToast(false)}
                variant="outline-dark"
                size="lg"
                className="w-full flex items-center justify-center gap-2 mt-2"
                fullWidth
              >
                Close
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
