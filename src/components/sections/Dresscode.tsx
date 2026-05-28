'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Sparkles, Check } from 'lucide-react'

type Variation = 'groom' | 'bride' | 'friends'

// Each gender group can have one or more outfit images shown side-by-side inside one box
type OutfitGroup = { label: string; images: string[] }

const themes: Record<
  Variation,
  {
    title: string
    desc: string
    themeName: string
    colors: { name: string; hex: string; text: 'dark' | 'light' }[]
    guidelines: string[]
    groups: OutfitGroup[]
  }
> = {
  groom: {
    title: 'Groom-Side Theme',
    desc: 'Please join us in matching the groom-side celebration palette.',
    themeName: 'Earthy Sage & Forest',
    colors: [
      { name: 'Sage Green', hex: '#879879', text: 'dark' },
      { name: 'Forest Green', hex: '#2d3b25', text: 'light' },
      { name: 'Olive Green', hex: '#5b6a48', text: 'light' },
      { name: 'Soft Cream', hex: '#fdf6e2', text: 'dark' },
    ],
    guidelines: [
      'Traditional Baju Melayu or elegant Smart Casual.',
      'Feel free to incorporate Sage, Olive, or Deep Forest tones.',
      'Please avoid pure white or ivory (reserved for the couple).',
    ],
    groups: [
      { label: 'Him', images: ['/image/groom-male.png'] },
      { label: 'Her', images: ['/image/groom-female.png'] },
    ],
  },
  bride: {
    title: 'Bride-Side Theme',
    desc: 'Please join us in matching the bride-side celebration palette.',
    themeName: 'Dusty Rose & Terracotta',
    colors: [
      { name: 'Dusty Rose', hex: '#c59593', text: 'dark' },
      { name: 'Terracotta', hex: '#c27d66', text: 'light' },
      { name: 'Soft Peach', hex: '#f0cdc2', text: 'dark' },
      { name: 'Warm Beige', hex: '#e8dcce', text: 'dark' },
    ],
    guidelines: [
      'Traditional Kurta, Baju Kurung, or elegant Semi-Formal attire.',
      'Incorporate soft, warm tones of Rose, Coral, and Warm Terracotta.',
      'Please avoid pure white or ivory (reserved for the couple).',
    ],
    groups: [
      { label: 'Him', images: ['/image/bride-male.png'] },
      { label: 'Her', images: ['/image/bride-female.png'] },
    ],
  },
  friends: {
    title: 'Friends & Family Theme',
    desc: 'We look forward to seeing your beautiful, festive styles!',
    themeName: 'Elegant Pastel & Neutrals',
    colors: [
      { name: 'Warm Cream', hex: '#f5ead2', text: 'dark' },
      { name: 'Gold Dust', hex: '#d4b785', text: 'dark' },
      { name: 'Taupe', hex: '#b0a090', text: 'light' },
      { name: 'Champagne', hex: '#e8dfcc', text: 'dark' },
    ],
    guidelines: [
      'Formal or Semi-Formal / Traditional attire.',
      'Warm, soft pastel colors and sophisticated neutral tones.',
      'Please avoid pure white or ivory (reserved for the couple).',
    ],
    groups: [
      // Both male options inside one "Him" box
      { label: 'Him', images: ['/image/guest-male-1.png', '/image/guest-male-2.png'] },
      { label: 'Her', images: ['/image/guest-female.png'] },
    ],
  },
}

export default function Dresscode() {
  const [variation, setVariation] = useState<Variation | null>(null)

  useEffect(() => {
    const hostname = window.location.hostname.toLowerCase()
    if (hostname.includes('groom')) setVariation('groom')
    else if (hostname.includes('bride')) setVariation('bride')
    else setVariation('friends')
  }, [])

  if (!variation) return null

  const theme = themes[variation]

  return (
    <div className="flex flex-col gap-6 text-stone-800 h-full overflow-y-auto pb-4">
      {/* Outfit groups — vertical stack (Him then Her) */}
      <div className="flex flex-col gap-4">
        {theme.groups.map(({ label, images }) => (
          <div key={label} className="flex flex-col gap-2">
            {/* Label */}
            <span className="font-semibold tracking-widest uppercase">{label}</span>

            {/* One box — images inside are side-by-side if multiple */}
            <div className="flex gap-2 rounded-2xl overflow-hidden">
              {images.map((src, i) => (
                <div key={i} className="flex-1 min-w-0">
                  <Image
                    src={src}
                    alt={`${theme.title} — ${label} option ${i + 1}`}
                    width={400}
                    height={600}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
