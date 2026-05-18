'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Calendar, MapPin, Shirt, Mail, ListTodo, Gift, Heart } from 'lucide-react'

const cards = [
  {
    id: 'about',
    title: 'About Us',
    color: '#4d5530',
    text: '#cd9e3f',
    span: 'col-span-2 md:col-span-1 md:row-span-2',
    icon: Heart,
  },
  {
    id: 'date',
    title: 'Date & Day',
    color: '#cad4b1',
    text: '#4d5530',
    span: 'col-span-1',
    icon: Calendar,
  },
  {
    id: 'venue',
    title: 'Venue',
    color: '#aab588',
    text: '#ffffff',
    span: 'col-span-1',
    icon: MapPin,
  },
  {
    id: 'rsvp',
    title: 'RSVP',
    color: '#ddacaa',
    text: '#ffffff',
    span: 'col-span-1',
    icon: Mail,
  },
  {
    id: 'dresscode',
    title: 'Dresscode',
    color: '#d9beb3',
    text: '#5c4e48',
    span: 'col-span-1',
    icon: Shirt,
  },
  {
    id: 'tentative',
    title: 'Tentative',
    color: '#77655d',
    text: '#ffffff',
    span: 'col-span-1',
    icon: ListTodo,
  },
  {
    id: 'wishlist',
    title: 'Our Wishlist',
    color: '#9c6065',
    text: '#ffffff',
    span: 'col-span-1',
    icon: Gift,
  },
]

type CardRect = { top: number; left: number; width: number; height: number }

export function CardsLayout() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [fromRect, setFromRect] = useState<CardRect | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    document.body.style.overflow = selectedId ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedId])

  function handleOpen(id: string) {
    const el = cardRefs.current[id]
    if (!el) return
    const rect = el.getBoundingClientRect()
    setFromRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })
    setSelectedId(id)
    setIsClosing(false)
  }

  function handleClose() {
    setIsClosing(true)
  }

  const selected = cards.find((c) => c.id === selectedId)

  const getModalTarget = useCallback((): CardRect => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const w = Math.min(vw * 0.92, 768)
    const h = vh * 0.85
    return { top: (vh - h) / 2, left: (vw - w) / 2, width: w, height: h }
  }, [])

  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center font-sans overflow-x-hidden pt-12 md:pt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-4 sm:gap-6 w-full max-w-6xl mx-auto h-auto md:h-[80vh] min-h-[600px]">
        {cards.map((card) => {
          // Render "About Us" specifically as an image + text (no card background)
          if (card.id === 'about') {
            return (
              <div
                key={card.id}
                className={`${card.span} flex flex-col items-center justify-center cursor-pointer group relative`}
                onClick={() => !selectedId && handleOpen(card.id)}
                ref={(el) => {
                  cardRefs.current[card.id] = el
                }}
                style={{
                  opacity: selectedId === card.id ? 0 : 1,
                  transition: 'opacity 0.05s',
                  pointerEvents: selectedId ? 'none' : 'auto',
                }}
              >
                {/* Brush-stroke clipped image */}
                <div
                  className="relative mb-4 transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{ width: '220px', height: '240px' }}
                >
                  {/* Hidden SVG — custom brush-stroke clip path by user */}
                  <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                      <clipPath id="brush-stroke-mask" clipPathUnits="objectBoundingBox">
                        <path
                          d="M0.703112 0.705272 C1.014261 0.664218 0.959470 0.467897 0.771536 0.421973 C1.009790 0.316710 0.990013 0.153558 0.700642 0.182986 C0.712681 -0.065811 0.468789 -0.014981 0.435795 0.102729 C0.310393 -0.098666 0.066362 0.104986 0.245030 0.337943 C-0.034760 0.140740 0.020466 0.359551 0.016453 0.415730 C0.040530 0.554173 0.062600 0.704655 0.180979 0.821027 C0.235153 0.885233 0.367576 0.963483 0.449840 0.969502 C0.541055 0.996975 0.886776 1.053155 0.700642 0.704655 L0.698790 0.703112 Z"
                          fill="black"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  {/* Image clipped by the brush-stroke path */}
                  <div className="absolute inset-0" style={{ clipPath: 'url(#brush-stroke-mask)' }}>
                    <div
                      className="w-full h-full flex items-center justify-center text-white/50 text-sm"
                      style={{ backgroundColor: card.color }}
                    >
                      Image
                    </div>
                  </div>

                  {/* Soft painterly edge overlay — subtle feathering effect */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath: 'url(#brush-stroke-mask)',
                      background:
                        'radial-gradient(ellipse at 70% 25%, rgba(255,255,255,0.12) 0%, transparent 65%)',
                    }}
                  />
                </div>

                <h1 className="text-4xl sm:text-5xl font-display" style={{ color: card.text }}>
                  {card.title}
                </h1>
              </div>
            )
          }

          // Render normal cards
          return (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[card.id] = el
              }}
              onClick={() => !selectedId && handleOpen(card.id)}
              className={`${card.span} relative rounded-4xl p-6 cursor-pointer shadow-lg hover:scale-[1.02] transition-transform flex flex-col items-center justify-between overflow-hidden`}
              style={{
                backgroundColor: card.color,
                opacity: selectedId === card.id ? 0 : 1,
                transition: 'opacity 0.05s',
                pointerEvents: selectedId ? 'none' : 'auto',
              }}
            >
              <div className="card-grain" />
              <div className="absolute top-4 right-4 bg-white/20 rounded-full p-1 z-10">
                <Plus className="w-5 h-5" style={{ color: card.text }} />
              </div>
              <div className="grow flex items-center justify-center w-full">
                <card.icon
                  className="w-16 h-16 sm:w-24 sm:h-24 opacity-80"
                  strokeWidth={1.5}
                  style={{ color: card.text }}
                />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-display text-center z-10"
                style={{ color: card.text }}
              >
                {card.title}
              </h2>
            </div>
          )
        })}
      </div>

      {/* The "flying card" — renders in a portal-like fixed layer, IS the card */}
      <AnimatePresence
        onExitComplete={() => {
          setSelectedId(null)
          setFromRect(null)
          setIsClosing(false)
        }}
      >
        {selectedId && selected && fromRect && !isClosing && (
          <motion.div
            key="flying-card"
            className="fixed z-50 overflow-hidden"
            style={{
              backgroundColor: selected.color,
              transformPerspective: 1400,
              transformOrigin: 'center center',
              borderRadius: '2rem',
            }}
            initial={{
              top: fromRect.top,
              left: fromRect.left,
              width: fromRect.width,
              height: fromRect.height,
              rotateY: 0,
            }}
            animate={(() => {
              const t = getModalTarget()
              return {
                top: t.top,
                left: t.left,
                width: t.width,
                height: t.height,
                rotateY: 180,
                borderRadius: '3rem',
              }
            })()}
            exit={(() => {
              return {
                top: fromRect.top,
                left: fromRect.left,
                width: fromRect.width,
                height: fromRect.height,
                rotateY: 0,
                borderRadius: '2rem',
                transition: { ease: [0.7, 0, 0.84, 0], duration: 0.45 },
              }
            })()}
            transition={{
              // Apple-style: fast start, slow natural settle (ease-out expo)
              ease: [0.16, 1, 0.3, 1],
              duration: 0.65,
            }}
          >
            {/* Grain texture overlay on modal */}
            <div className="card-grain" />

            {/* Backdrop dimmer behind everything */}
            <motion.div
              className="fixed inset-0 -z-10 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ pointerEvents: 'none' }}
            />

            {/* Close button — only visible when modal has settled */}
            <motion.button
              onClick={handleClose}
              className="absolute top-6 left-6 p-2 bg-black/10 hover:bg-black/25 rounded-full transition-colors z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35, duration: 0.15 }}
            >
              <X className="w-6 h-6" style={{ color: selected.text }} />
            </motion.button>

            {/* Content: hidden during flip, fades in after arrival, fades out immediately on close */}
            <motion.div
              className="p-8 sm:p-12 h-full flex flex-col overflow-y-auto"
              style={{ transform: 'rotateY(180deg)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05, delay: 0 } }}
              transition={{ delay: 0.4, duration: 0.2 }}
            >
              <h2
                className="text-4xl sm:text-5xl font-display mb-8"
                style={{ color: selected.text }}
              >
                {selected.title}
              </h2>
              <div className="opacity-80 text-xl leading-relaxed" style={{ color: selected.text }}>
                <p>
                  Content for <strong>{selected.title}</strong> will go here.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
