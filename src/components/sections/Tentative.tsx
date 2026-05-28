'use client'

import Image from 'next/image'

export default function Tentative() {
  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pb-4">
      {/* Schedule overview image */}
      <div className="rounded-2xl">
        <Image
          src="/image/tentative-v2.png"
          alt="Wedding day schedule overview"
          width={800}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  )
}
