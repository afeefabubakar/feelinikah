'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface VendorRegistrationProps {
  onSuccess?: () => void
  isCardView?: boolean
}

const SERVICE_OPTIONS = [
  { id: 'makeup', label: 'Makeup' },
  { id: 'pelamin', label: 'Pelamin' },
  { id: 'food', label: 'Food / Catering' },
  { id: 'tent', label: 'Tent / Canopy' },
  { id: 'other', label: 'Other Service' },
]

const VEHICLE_TYPES = [
  { value: 'lorry', label: 'Lorry / Truck' },
  { value: 'van', label: 'Van' },
  { value: 'car', label: 'Car / Sedan / SUV' },
  { value: 'pickup', label: '4x4 Pickup' },
  { value: 'motorcycle', label: 'Motorcycle' },
  { value: 'none', label: 'None / No Vehicle' },
  { value: 'other', label: 'Other' },
]

export default function VendorRegistration({
  onSuccess,
  isCardView = false,
}: VendorRegistrationProps) {
  const [service, setService] = useState<string>('makeup')
  const [customService, setCustomService] = useState('')
  const [companyName, setCompanyName] = useState('')

  const [vehicleType, setVehicleType] = useState('lorry')
  const [vehicleBrand, setVehicleBrand] = useState('')
  const [plateNumber, setPlateNumber] = useState('')

  const [arrivalDate, setArrivalDate] = useState('2026-08-15')
  const [arrivalTime, setArrivalTime] = useState('08:00 AM')
  const [serviceTime, setServiceTime] = useState('10:00 AM - 02:00 PM')
  const [serviceDuration, setServiceDuration] = useState('4 hours')

  const [numberOfWorkers, setNumberOfWorkers] = useState(2)
  const [picName, setPicName] = useState('')
  const [picPhone, setPicPhone] = useState('')
  const [notes, setNotes] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<any | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!service) {
      setError('Please select a service type.')
      return
    }
    if (service === 'other' && !customService.trim()) {
      setError('Please specify your service.')
      return
    }
    if (!companyName.trim()) {
      setError('Please enter your company or brand name.')
      return
    }
    if (!arrivalDate) {
      setError('Please provide the arrival date.')
      return
    }
    if (!arrivalTime.trim()) {
      setError('Please provide the arrival time.')
      return
    }
    if (!serviceTime.trim()) {
      setError('Please specify the service time.')
      return
    }
    if (!serviceDuration.trim()) {
      setError('Please specify the service duration.')
      return
    }
    if (!picName.trim()) {
      setError('Please enter the PIC name.')
      return
    }
    if (!picPhone.trim()) {
      setError('Please enter the PIC phone number.')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          customService,
          companyName,
          vehicleType,
          vehicleBrand,
          plateNumber,
          arrivalDate,
          arrivalTime,
          serviceTime,
          serviceDuration,
          numberOfWorkers,
          picName,
          picPhone,
          notes,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit registration.')
      }

      setSubmittedData(data.doc)
      if (onSuccess) onSuccess()
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const getServiceLabel = (serviceValue: string) => {
    if (serviceValue === 'other' && customService) return customService
    const found = SERVICE_OPTIONS.find((s) => s.id === serviceValue)
    return found ? found.label : serviceValue
  }

  const getVehicleLabel = (val: string) => {
    const found = VEHICLE_TYPES.find((v) => v.value === val)
    return found ? found.label : val
  }

  return (
    <div
      className={`w-full vendor-form-container text-white ${isCardView ? '' : 'max-w-2xl mx-auto py-2'}`}
    >
      {submittedData ? (
        <div className="bg-[#072c2e] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-4 text-white shadow-2xl overflow-hidden relative">
          <div className="card-grain opacity-80" />
          <div className="border-b border-white/15 pb-4 text-center z-10 relative">
            <div className="flex justify-center items-center w-full mb-3">
              <Image
                src="/image/writing-logo.svg"
                alt="Fee & Nikah Logo"
                width={500}
                height={160}
                className="w-[65%] max-w-sm sm:max-w-md h-auto mx-auto"
              />
            </div>
            <h3 className="text-xl font-semibold text-white">Registration Submitted</h3>
            <p className="text-sm text-white/80 mt-1">
              Your vendor collection details have been recorded.
            </p>
          </div>

          <div className="space-y-2 text-sm text-white z-10 relative">
            <div className="flex justify-between py-1.5 border-b border-white/15">
              <span className="text-white/70">Service</span>
              <span className="font-semibold text-white">
                {getServiceLabel(submittedData.service)}
              </span>
            </div>
            {submittedData.companyName && (
              <div className="flex justify-between py-1.5 border-b border-white/15">
                <span className="text-white/70">Company</span>
                <span className="font-medium text-white">{submittedData.companyName}</span>
              </div>
            )}
            <div className="flex justify-between py-1.5 border-b border-white/15">
              <span className="text-white/70">PIC Contact</span>
              <span className="font-medium text-white">
                {submittedData.picName} ({submittedData.picPhone})
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/15">
              <span className="text-white/70">Arrival Date & Time</span>
              <span className="font-medium text-white">
                {submittedData.arrivalDate} at {submittedData.arrivalTime}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/15">
              <span className="text-white/70">Service Time & Duration</span>
              <span className="font-medium text-white">
                {submittedData.serviceTime} ({submittedData.serviceDuration})
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/15">
              <span className="text-white/70">Vehicle</span>
              <span className="font-medium text-white">
                {getVehicleLabel(submittedData.vehicleType)}
                {submittedData.vehicleBrand ? ` (${submittedData.vehicleBrand})` : ''} -{' '}
                {submittedData.plateNumber || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-white/70">Workers Count</span>
              <span className="font-semibold text-white">{submittedData.numberOfWorkers}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSubmittedData(null)}
            className="w-full mt-4 py-2.5 px-4 bg-[#fdf8f0] hover:bg-[#f5ede0] text-[#260303] font-semibold rounded-lg text-sm transition-colors cursor-pointer shadow-sm z-10 relative"
          >
            Submit Another Entry
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#072c2e] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden relative"
        >
          <div className="card-grain opacity-80" />
          <div className="border-b border-white/15 pb-5 text-center z-10 relative">
            <div className="flex justify-center items-center w-full mb-4">
              <Image
                src="/image/writing-logo.svg"
                alt="Fee & Nikah Logo"
                width={500}
                height={160}
                className="w-[65%] max-w-sm sm:max-w-md h-auto mx-auto"
                priority
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Vendor Registration
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Please enter your service details, arrival schedule, vehicle info, and PIC contact
              details.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-[#260303] border border-rose-600/50 rounded-lg text-sm text-white">
              {error}
            </div>
          )}

          {/* Service Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-white">Service Provided *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SERVICE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setService(opt.id)}
                  className={`py-2.5 px-3 text-sm rounded-lg border text-left transition-all font-sans cursor-pointer ${
                    service === opt.id
                      ? 'bg-[#fdf8f0] text-[#260303] font-semibold border-transparent shadow-sm'
                      : 'bg-white/25 text-white border-white/10 hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {service === 'other' && (
              <div className="pt-2">
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Specify Service Type *
                </label>
                <input
                  type="text"
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  placeholder="e.g. Sound System / Photobooth"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50"
                  required
                />
              </div>
            )}

            <div className="pt-1">
              <label className="block text-xs font-medium text-white/80 mb-1">
                Company / Brand Name *
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company or Business Name"
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50"
                required
              />
            </div>
          </div>

          {/* Vehicle Section */}
          <div className="space-y-3 border-t border-white/15 pt-5">
            <h3 className="text-sm font-semibold text-white">Vehicle Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-white/80 mb-1">Vehicle Type *</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 cursor-pointer"
                >
                  {VEHICLE_TYPES.map((v) => (
                    <option key={v.value} value={v.value} className="bg-[#072c2e] text-white">
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/80 mb-1">Vehicle Brand</label>
                <input
                  type="text"
                  value={vehicleBrand}
                  onChange={(e) => setVehicleBrand(e.target.value)}
                  placeholder="e.g. Isuzu"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/80 mb-1">Plate Number</label>
                <input
                  type="text"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. ABC 1234"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 uppercase"
                />
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="space-y-3 border-t border-white/15 pt-5">
            <h3 className="text-sm font-semibold text-white">Schedule & Timing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/80 mb-1">Arrival Date *</label>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/80 mb-1">Arrival Time *</label>
                <input
                  type="text"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  placeholder="e.g. 08:30 AM"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/80 mb-1">Service Time *</label>
                <input
                  type="text"
                  value={serviceTime}
                  onChange={(e) => setServiceTime(e.target.value)}
                  placeholder="e.g. 10:00 AM - 02:00 PM"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/80 mb-1">Service Duration *</label>
                <input
                  type="text"
                  value={serviceDuration}
                  onChange={(e) => setServiceDuration(e.target.value)}
                  placeholder="e.g. 4 hours"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50"
                  required
                />
              </div>
            </div>
          </div>

          {/* Workers & Contact Section */}
          <div className="space-y-3 border-t border-white/15 pt-5">
            <h3 className="text-sm font-semibold text-white">PIC & Staff Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-white/80 mb-1">Number of Workers *</label>
                <input
                  type="number"
                  min={1}
                  value={numberOfWorkers}
                  onChange={(e) => setNumberOfWorkers(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/80 mb-1">PIC Name *</label>
                <input
                  type="text"
                  value={picName}
                  onChange={(e) => setPicName(e.target.value)}
                  placeholder="Contact person name"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/80 mb-1">PIC Phone *</label>
                <input
                  type="tel"
                  value={picPhone}
                  onChange={(e) => setPicPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50"
                  required
                />
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-1 border-t border-white/15 pt-5">
            <label className="block text-xs text-white/80 mb-1">
              Special Instructions / Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special setup requirements or instructions"
              rows={3}
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 bg-[#fdf8f0] hover:bg-[#f5ede0] text-[#260303] font-semibold text-sm rounded-lg transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Vendor Registration'}
          </button>
        </form>
      )}
    </div>
  )
}
