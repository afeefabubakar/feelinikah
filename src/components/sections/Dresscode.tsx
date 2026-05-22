'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, Check } from 'lucide-react'

type Variation = 'groom' | 'bride' | 'public'

export default function Dresscode() {
  const [variation, setVariation] = useState<Variation>('public')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname.toLowerCase()
      if (hostname.includes('groom')) {
        setVariation('groom')
      } else if (hostname.includes('bride')) {
        setVariation('bride')
      } else {
        setVariation('public')
      }
    }
  }, [])

  // Themes and colors
  const themes = {
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
    },
    public: {
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
    },
  }

  const currentTheme = themes[variation]

  return (
    <div className="flex flex-col gap-6 text-stone-800 h-full overflow-y-auto pb-4">
      {/* Dynamic Variation Switcher (Tabs) for testing / fallback */}
      <div className="flex bg-stone-100 border border-stone-200 p-1.5 rounded-2xl self-center max-w-full overflow-x-auto gap-1">
        {(['groom', 'bride', 'public'] as Variation[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariation(v)}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold tracking-wider uppercase transition-all ${
              variation === v
                ? 'bg-amber-700 text-stone-100 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {v === 'public' ? 'Public' : `${v}-side`}
          </button>
        ))}
      </div>

      {/* Main Theme Header */}
      <div className="text-center space-y-2 mt-2">
        <span className="text-xs font-sans tracking-widest text-stone-500 uppercase flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Dresscode & Tone
        </span>
        <h2 className="text-3xl font-serif text-stone-800 font-semibold">{currentTheme.title}</h2>
        <p className="text-sm font-sans text-stone-500 max-w-[320px] mx-auto leading-relaxed">
          {currentTheme.desc}
        </p>
      </div>

      {/* Color Palette Mood Board */}
      <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 shadow-inner space-y-4">
        <h3 className="text-base font-sans tracking-wider uppercase font-semibold text-stone-500 text-center">
          Color Palette: {currentTheme.themeName}
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center pt-2">
          {currentTheme.colors.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
              <div
                className="w-16 h-16 rounded-full shadow-md group-hover:scale-105 border border-black/5 transition-transform flex items-center justify-center"
                style={{ backgroundColor: c.hex }}
              >
                <Check className={`w-5 h-5 opacity-0 group-hover:opacity-60 transition-opacity ${c.text === 'light' ? 'text-white' : 'text-stone-800'}`} />
              </div>
              <span className="text-xs font-sans font-bold text-stone-700">{c.name}</span>
              <span className="text-[10px] font-mono text-stone-400">{c.hex}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines Bullet List */}
      <div className="bg-stone-50/50 border border-stone-200/60 rounded-3xl p-6 space-y-3">
        <h3 className="text-lg font-serif text-stone-800 font-medium mb-1">Style Guidelines</h3>
        <ul className="space-y-2.5">
          {currentTheme.guidelines.map((g, i) => (
            <li key={i} className="text-sm text-stone-600 font-serif leading-relaxed flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 bg-amber-700/80 rounded-full mt-1.5 shrink-0" />
              {g}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
