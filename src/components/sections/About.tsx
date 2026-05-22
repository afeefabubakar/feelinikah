'use client'

import React from 'react'

export default function About() {
  return (
    <div className="flex flex-col gap-8 items-center text-stone-800 h-full">
      {/* Clip-masked Image Container */}
      <div className="relative shrink-0 w-[240px] h-[260px] ">
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <clipPath id="about-brush-mask" clipPathUnits="objectBoundingBox">
              <path
                d="M0.703112 0.705272 C1.014261 0.664218 0.959470 0.467897 0.771536 0.421973 C1.009790 0.316710 0.990013 0.153558 0.700642 0.182986 C0.712681 -0.065811 0.468789 -0.014981 0.435795 0.102729 C0.310393 -0.098666 0.066362 0.104986 0.245030 0.337943 C-0.034760 0.140740 0.020466 0.359551 0.016453 0.415730 C0.040530 0.554173 0.062600 0.704655 0.180979 0.821027 C0.235153 0.885233 0.367576 0.963483 0.449840 0.969502 C0.541055 0.996975 0.886776 1.053155 0.700642 0.704655 L0.698790 0.703112 Z"
                fill="black"
              />
            </clipPath>
          </defs>
        </svg>

        <div
          className="absolute inset-0 bg-stone-200"
          style={{ clipPath: 'url(#about-brush-mask)' }}
        >
          <div className="w-full h-full flex items-center justify-center bg-stone-300 text-stone-600 text-lg font-serif">
            Our Portrait
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: 'url(#about-brush-mask)',
            background:
              'radial-gradient(ellipse at 70% 25%, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="flex-1 space-y-6 text-base sm:text-lg leading-relaxed text-stone-300">
        <p className="italic text-stone-500 border-l-2 border-stone-300 pl-4 mb-4 text-xl"></p>
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
