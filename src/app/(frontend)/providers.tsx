'use client'

import React, { useEffect, useRef } from 'react'
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

export function Providers({ children }: { children: React.ReactNode }) {
  // Retrieve the stable, singleton-safe query client
  const queryClient = getQueryClient()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <audio ref={audioRef} src={'/audio/eternal-flame.mp3'} autoPlay loop />
      {children}
    </QueryClientProvider>
  )
}
