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
        className="h-auto sm:max-w-md mt-6 rounded-2xl"
      />

      <div className="flex-1 space-y-6 text-lg leading-relaxed text-white/85">
        <p className="italic text-white/60 border-l-2 border-white/20 pl-4 mb-4 text-xl"></p>
        <p>
          We were separated by the ocean and 987km away for 10,501 days before our eyes first met.
        </p>
        <p>Facts (some maybe fun):</p>
        <ul className="list-disc ml-8">
          <li>Alin is 10 moons wiser than Afeef.</li>
          <li>Alin is more outdoorsy and Afeef is more homebody.</li>
          <li>Alin is a deep thinker and Afeef is a what-makes-sense-for-me thinker.</li>
          <li>Alin loves her personal space and Afeef also loves Alin's personal space.</li>
          <li>Alin knows how to navigate underwater and Afeef is always so impressed by that.</li>
          <li>
            Alin is more operational-business minded and Afeef is more software-developing minded.
          </li>
        </ul>
        <p>
          We found out we both are two completely different individuals who rest in each other's
          presence.
        </p>
        <p>
          Ultimate fact?
          <br />
          We are deeply in love with each other.
        </p>
        <p>See you at our solemnization!</p>
        <p>Love, FEELIN.</p>
      </div>
    </div>
  )
}
