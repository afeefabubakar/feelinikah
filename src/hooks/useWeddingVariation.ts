import { useState, useEffect } from 'react'

export type WeddingVariation = 'groom' | 'bride' | 'friends'

/**
 * Custom hook to detect the wedding side variation based on the hostname/subdomain.
 * - 'groom' -> For hostnames containing "groom" (e.g. groom.example.com)
 * - 'bride' -> For hostnames containing "bride" (e.g. bride.example.com)
 * - 'friends' -> Default for other domains/subdomains
 * 
 * Returns `null` during server-side rendering (SSR) and initialization to prevent hydration mismatch.
 */
export function useWeddingVariation() {
  const [variation, setVariation] = useState<WeddingVariation | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname.toLowerCase()
      if (hostname.includes('groom')) {
        setVariation('groom')
      } else if (hostname.includes('bride')) {
        setVariation('bride')
      } else {
        setVariation('friends')
      }
    }
  }, [])

  return variation
}
