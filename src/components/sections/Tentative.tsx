'use client'

import Image from 'next/image'

export default function Tentative() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 pb-4 text-4xl sm:text-7xl tracking-wide font-light">
      {/* Schedule overview image */}
      <div className="mt-4 sm:mt-8 flex justify-center">
        <Image
          src="/image/tentative-v4.png"
          alt="Wedding day schedule overview"
          width={2067}
          height={2338}
          className="mx-auto w-auto max-w-full h-auto max-h-[calc(85dvh-140px)] sm:max-h-[calc(85dvh-210px)] object-contain rounded-2xl"
          priority
        />
      </div>
    </div>
  )
}
