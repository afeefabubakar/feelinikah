'use client'

import Image from 'next/image'

export default function About() {
  return (
    <div className="flex flex-col gap-8 items-center text-white">
      {/* Clip-masked Image Container */}
      <Image src="/image/lil-us.png" alt="" width={700} height={875} className="h-auto w-full" />

      <div className="flex-1 space-y-6 text-lg leading-relaxed text-white/85">
        <p className="italic text-white/60 border-l-2 border-white/20 pl-4 mb-4 text-xl"></p>
        <p>
          We were separated by the ocean and 987km away for 10,501 days before our eyes first met.
          Allah SWT said what is meant for us, will find us.
        </p>
        <p>Facts (some maybe fun):</p>
        <ul className="list-disc ml-8">
          <li>Alin is 10 moons wiser than Afeef.</li>
          <li>Alin is more outdoorsy and Afeef is more homebody.</li>
          <li>Alin loves her personal space and Afeef also loves Alin's personal space.</li>
          <li>Alin is a deep thinker and Afeef is a what-makes-sense-for-me thinker.</li>
          <li>Alin eats more vegetables than Afeef.</li>
          <li>
            Alin knows how to navigate underwater, and doesn’t need to use use Waze when driving
            while Afeef is always so impressed by that.
          </li>
        </ul>
        <p>
          We found out we both are two completely different individuals who rest in each other's
          presence.
        </p>
        <p>
          Ultimate fact?
          <br />
          Afeef is in love with Alin.
        </p>
        <p>
          What to know more? Subscribe to our Youtube channel, just kidding. See you at our
          solemnisation!
        </p>
        <p>Love, FEELIN.</p>
      </div>
    </div>
  )
}
