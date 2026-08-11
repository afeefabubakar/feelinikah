import React from 'react'
import VendorRegistration from '@/components/sections/VendorRegistration'

export const metadata = {
  title: 'Vendor Registration | Fee & Nikah',
  description: 'Vendor registration form for wedding logistics, vehicle details, schedule and PIC contact.',
}

export default function VendorPage() {
  return (
    <main className="min-h-screen text-white vendor-form-container flex flex-col items-center justify-center py-10 px-4 sm:px-6 relative">
      {/* Backdrop matching cards modal */}
      <div className="fixed inset-0 bg-black/40 -z-10" />

      <div className="w-full max-w-2xl z-10">
        <VendorRegistration />
      </div>
    </main>
  )
}
