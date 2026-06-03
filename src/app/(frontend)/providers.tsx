'use client'

import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always create a new query client per request to avoid data leaking
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // Cache queries for 5 minutes
          refetchOnWindowFocus: false, // Disable aggressive focus refetching
        },
      },
    })
  } else {
    // Browser: create a new query client if we don't already have one
    // This reuses the client across client-side renders/navigations
    if (!browserQueryClient) {
      browserQueryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
    }
    return browserQueryClient
  }
}

interface AudioContextType {
  play: () => void
  pause: () => void
  isPlaying: boolean
}

const AudioContext = createContext<AudioContextType | null>(null)

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) throw new Error('useAudio must be used within an AudioProvider')
  return context
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Retrieve the stable, singleton-safe query client
  const queryClient = getQueryClient()

  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05
    }
  }, [])

  const play = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback blocked/failed:', err))
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AudioContext.Provider value={{ play, pause, isPlaying }}>
        <audio ref={audioRef} src={'/audio/eternal-flame.mp3'} loop />
        {children}
      </AudioContext.Provider>
    </QueryClientProvider>
  )
}
