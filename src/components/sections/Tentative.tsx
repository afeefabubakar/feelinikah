'use client'

import Image from 'next/image'

export default function Tentative() {
  return (
    <div className="flex flex-col gap-6 pb-4 text-4xl sm:text-7xl tracking-wide font-light">
      {/* Schedule overview image */}
      <div className="rounded-2xl mt-8">
        <Image
          src="/image/tentative-v4.png"
          alt="Wedding day schedule overview"
          width={800}
          height={600}
          className="w-full sm:w-full sm:mx-auto h-auto object-contain"
          priority
        />
      </div>
    </div>
  )
}
