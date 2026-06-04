import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { storage } from '@/lib/storage'

/**
 * Custom hook to verify that the RSVP stored in localStorage still exists in the database.
 * If the RSVP has been deleted, it clears local storage and dispatches a global event.
 */
export function useRSVPVerification() {
  const [rsvpId, setRsvpId] = useState<string | null>(null)

  useEffect(() => {
    // Read on mount to initialize
    setRsvpId(storage.getRSVP()?.id ?? null)

    // Update if the user submits/updates RSVP in the current session
    const handleUpdated = () => {
      setRsvpId(storage.getRSVP()?.id ?? null)
    }
    window.addEventListener('rsvp-updated', handleUpdated)
    return () => window.removeEventListener('rsvp-updated', handleUpdated)
  }, [])

  const { data: rsvpExists } = useQuery({
    queryKey: ['rsvp-layout-check', rsvpId],
    queryFn: async () => {
      if (!rsvpId) return null
      try {
        const res = await fetch(`/api/rsvp/${rsvpId}`)
        if (res.status === 404) {
          return false
        }
        if (!res.ok) {
          throw new Error('Failed to verify RSVP')
        }
        return true
      } catch (err) {
        throw err
      }
    },
    enabled: !!rsvpId,
    refetchOnWindowFocus: true,
    staleTime: 0, // Ensure the query is always considered stale so refocus triggers a fetch
    refetchInterval: 30000, // Check every 30 seconds
    retry: 1,
  })

  useEffect(() => {
    if (rsvpExists === false) {
      storage.clearRSVP()
      setRsvpId(null)
      window.dispatchEvent(new Event('rsvp-cleared'))
    }
  }, [rsvpExists])
}
