// Define keys to prevent typos and enable strict typing
export const STORAGE_KEYS = {
  RSVP_ID: 'feelinikah_rsvp_id',
  GUEST_NAME: 'feelinikah_guest_name',
  TRACKED_GIFTS: 'feelinikah_tracked_gifts', // List of gift IDs the user has expressed interest in
} as const

// Safe wrapper that won't crash during Next.js SSR (Server-Side Rendering)
const isBrowser = typeof window !== 'undefined'

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (!isBrowser) return defaultValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  },

  set: <T>(key: string, value: T): void => {
    if (!isBrowser) return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  },

  remove: (key: string): void => {
    if (!isBrowser) return
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  },

  // ── Custom Wedding Domain Helpers ──────────────────────────────────────────

  getRSVP: () => {
    const id = storage.get<string | null>(STORAGE_KEYS.RSVP_ID, null)
    const name = storage.get<string | null>(STORAGE_KEYS.GUEST_NAME, null)
    return id ? { id, name } : null
  },

  setRSVP: (id: string, name: string) => {
    storage.set(STORAGE_KEYS.RSVP_ID, id)
    storage.set(STORAGE_KEYS.GUEST_NAME, name)
  },

  clearRSVP: () => {
    storage.remove(STORAGE_KEYS.RSVP_ID)
    storage.remove(STORAGE_KEYS.GUEST_NAME)
  },

  getTrackedGifts: (): string[] => {
    return storage.get<string[]>(STORAGE_KEYS.TRACKED_GIFTS, [])
  },

  trackGift: (giftId: string): void => {
    const gifts = storage.getTrackedGifts()
    if (!gifts.includes(giftId)) {
      gifts.push(giftId)
      storage.set(STORAGE_KEYS.TRACKED_GIFTS, gifts)
    }
  },

  untrackGift: (giftId: string): void => {
    const gifts = storage.getTrackedGifts()
    const updated = gifts.filter((id) => id !== giftId)
    storage.set(STORAGE_KEYS.TRACKED_GIFTS, updated)
  },

  isTrackingGift: (giftId: string): boolean => {
    return storage.getTrackedGifts().includes(giftId)
  },
}
