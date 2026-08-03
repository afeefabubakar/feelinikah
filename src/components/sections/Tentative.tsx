'use client'

import Image from 'next/image'

export default function Tentative() {
  return (
    <div className="flex flex-col">
      {/* Schedule overview image */}
      <div className="mt-3 sm:mt-4 flex justify-center">
        <Image
          src="/image/tentative.png"
          alt="Wedding day schedule overview"
          width={2067}
          height={2338}
          className="w-full h-auto object-contain rounded-2xl"
          priority
        />
      </div>
    </div>
  )
}
