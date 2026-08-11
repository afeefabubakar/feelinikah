'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'

interface VendorRegistrationProps {
  onSuccess?: () => void
  isCardView?: boolean
}

const SERVICE_OPTIONS = [
  { id: 'bridal_bouquet', label: 'Bridal Bouquet' },
  { id: 'bride_assistant', label: 'Bride Assistant' },
  { id: 'emcee', label: 'Emcee' },
  { id: 'food', label: 'Food / Catering' },
  { id: 'groom_stylist', label: 'Groom Stylist' },
  { id: 'henna', label: 'Henna' },
  { id: 'makeup', label: 'Makeup Artist' },
  { id: 'pelamin', label: 'Pelamin' },
  { id: 'photo_video', label: 'Photographer & Videographer' },
  { id: 'rela', label: 'RELA' },
  { id: 'tent', label: 'Tent' },
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

function formatTime12Hour(time24: string): string {
  if (!time24) return ''
  const [h, m] = time24.split(':')
  let hours = parseInt(h, 10)
  if (isNaN(hours)) return time24
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`
  return `${formattedHours}:${m} ${period}`
}

function formatMalaysianDate(dateStr: string): string {
  if (!dateStr) return ''
  const cleanDate = dateStr.split('T')[0]
  const parts = cleanDate.split('-')
  if (parts.length === 3) {
    const [year, month, day] = parts
    const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10))
    if (!isNaN(d.getTime())) {
      return new Intl.DateTimeFormat('en-MY', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(d)
    }
  }
  return dateStr
}

function calculateDuration(start24: string, end24: string): string {
  if (!start24 || !end24) return ''
  const [sh, sm] = start24.split(':').map(Number)
  const [eh, em] = end24.split(':').map(Number)
  if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return ''
  let startMinutes = sh * 60 + sm
  let endMinutes = eh * 60 + em
  if (endMinutes < startMinutes) endMinutes += 24 * 60 // midnight wrap
  const diffMinutes = endMinutes - startMinutes
  const hours = Math.floor(diffMinutes / 60)
  const mins = diffMinutes % 60
  if (hours === 0 && mins === 0) return '0 hours'
  if (mins === 0) return `${hours} hour${hours !== 1 ? 's' : ''}`
  if (hours === 0) return `${mins} min${mins !== 1 ? 's' : ''}`
  return `${hours} hr${hours !== 1 ? 's' : ''} ${mins} min${mins !== 1 ? 's' : ''}`
}

function getMalaysianTodayDateString(): string {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }
  const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now)
  const year = parts.find((p) => p.type === 'year')?.value || '2026'
  const month = parts.find((p) => p.type === 'month')?.value || '08'
  const day = parts.find((p) => p.type === 'day')?.value || '15'
  return `${year}-${month}-${day}`
}

export default function VendorRegistration({
  onSuccess,
  isCardView = false,
}: VendorRegistrationProps) {
  const [service, setService] = useState<string>('')
  const [customService, setCustomService] = useState('')
  const [companyName, setCompanyName] = useState('')

  const [vehicleType, setVehicleType] = useState('lorry')
  const [vehicleBrand, setVehicleBrand] = useState('')
  const [plateNumber, setPlateNumber] = useState('')

  const [arrivalDate, setArrivalDate] = useState('2026-09-26')
  const [arrivalTime, setArrivalTime] = useState('08:30') // HH:MM time picker format

  const [serviceStartTime, setServiceStartTime] = useState('10:00') // HH:MM time picker format
  const [serviceEndTime, setServiceEndTime] = useState('14:00') // HH:MM time picker format

  const [numberOfWorkers, setNumberOfWorkers] = useState(2)
  const [picName, setPicName] = useState('')
  const [picPhone, setPicPhone] = useState('')
  const [notes, setNotes] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<any | null>(null)

  // Compute formatted strings for API payload and summary pass
  const formattedArrivalTime = useMemo(() => formatTime12Hour(arrivalTime), [arrivalTime])
  const formattedServiceTime = useMemo(
    () => `${formatTime12Hour(serviceStartTime)} - ${formatTime12Hour(serviceEndTime)}`,
    [serviceStartTime, serviceEndTime],
  )
  const computedDuration = useMemo(
    () => calculateDuration(serviceStartTime, serviceEndTime),
    [serviceStartTime, serviceEndTime],
  )

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
    if (!arrivalTime) {
      setError('Please select the arrival time.')
      return
    }
    if (!serviceStartTime || !serviceEndTime) {
      setError('Please select the service start and end times.')
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
          arrivalTime: formattedArrivalTime,
          serviceTime: formattedServiceTime,
          serviceDuration: computedDuration,
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
                {formatMalaysianDate(submittedData.arrivalDate)} at {submittedData.arrivalTime}
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
            <div className="p-3.5 bg-[#260303] border border-rose-600/50 rounded-lg text-sm text-white z-10 relative">
              {error}
            </div>
          )}

          {/* Service Section */}
          <div className="space-y-3 z-10 relative">
            <label className="block text-sm font-medium text-white">Service Provided *</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 cursor-pointer"
              required
            >
              <option value="" disabled className="bg-[#072c2e] text-white/50">
                -- Select a Service --
              </option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-[#072c2e] text-white">
                  {opt.label}
                </option>
              ))}
            </select>

            {service === 'other' && (
              <div className="pt-2">
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Specify Service Name *
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
          <div className="space-y-3 border-t border-white/15 pt-5 z-10 relative">
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

          {/* Schedule Section with Time Pickers */}
          <div className="space-y-3 border-t border-white/15 pt-5 z-10 relative">
            <h3 className="text-sm font-semibold text-white">Schedule & Timing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/80 mb-1">Arrival Date *</label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={formatMalaysianDate(arrivalDate)}
                    onClick={(e) => {
                      const hiddenInput = e.currentTarget.nextElementSibling as HTMLInputElement
                      if (hiddenInput && 'showPicker' in hiddenInput) {
                        try { hiddenInput.showPicker() } catch {}
                      }
                    }}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 cursor-pointer"
                    placeholder="e.g. 26 September 2026"
                    required
                  />
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
                    tabIndex={-1}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/80 mb-1">Arrival Time *</label>
                <input
                  type="time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 cursor-pointer"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/80 mb-1">Service Start Time *</label>
                <input
                  type="time"
                  value={serviceStartTime}
                  onChange={(e) => setServiceStartTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 cursor-pointer"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/80 mb-1">Service End Time *</label>
                <input
                  type="time"
                  value={serviceEndTime}
                  onChange={(e) => setServiceEndTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 cursor-pointer"
                  required
                />
              </div>
            </div>

            {/* Calculated Service Summary helper */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white/80">
              <p className="text-base">
                Service Schedule: <strong className="text-white">{formattedServiceTime}</strong>
              </p>
              <p className="text-base">
                Estimated Duration: <strong className="text-white">{computedDuration}</strong>
              </p>
            </div>
          </div>

          {/* Workers & Contact Section */}
          <div className="space-y-3 border-t border-white/15 pt-5 z-10 relative">
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
          <div className="space-y-1 border-t border-white/15 pt-5 z-10 relative">
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
            className="w-full py-3 px-4 bg-[#fdf8f0] hover:bg-[#f5ede0] text-[#260303] font-semibold text-sm rounded-lg transition-all cursor-pointer shadow-sm disabled:opacity-50 z-10 relative"
          >
            {submitting ? 'Submitting...' : 'Submit Vendor Registration'}
          </button>
        </form>
      )}
    </div>
  )
}
