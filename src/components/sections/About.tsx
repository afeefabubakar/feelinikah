'use client'

import Image from 'next/image'

export default function About() {
  return (
    <div className="flex flex-col gap-8 items-center text-white text-justify">
      {/* Clip-masked Image Container */}
      <Image
        src="/image/us.jpeg"
        alt="Picture of Alin and Afeef"
        width={700}
        height={875}
        className="w-[85%] h-auto mt-4 sm:mt-6 rounded-2xl"
      />

      {/* About Us Text Image */}
      <div className="w-full flex justify-center">
        <Image
          src="/image/about-us-text.png"
          alt="About Us"
          width={2114}
          height={3000}
          className="w-full h-auto object-contain rounded-2xl"
          priority
        />
      </div>
    </div>
  )
}
