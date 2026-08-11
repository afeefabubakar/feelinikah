import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
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
    } = body

    // Validation
    if (!service) {
      return NextResponse.json({ error: 'Service is required.' }, { status: 400 })
    }
    if (!companyName || !companyName.trim()) {
      return NextResponse.json({ error: 'Company / Brand Name is required.' }, { status: 400 })
    }
    if (!vehicleType) {
      return NextResponse.json({ error: 'Vehicle type is required.' }, { status: 400 })
    }
    if (!arrivalDate) {
      return NextResponse.json({ error: 'Arrival date is required.' }, { status: 400 })
    }
    if (!arrivalTime) {
      return NextResponse.json({ error: 'Arrival time is required.' }, { status: 400 })
    }
    if (!serviceTime) {
      return NextResponse.json({ error: 'Service time is required.' }, { status: 400 })
    }
    if (!serviceDuration) {
      return NextResponse.json({ error: 'Service duration is required.' }, { status: 400 })
    }
    if (numberOfWorkers === undefined || numberOfWorkers === null || Number(numberOfWorkers) < 1) {
      return NextResponse.json({ error: 'Number of workers must be at least 1.' }, { status: 400 })
    }
    if (!picName || !picName.trim()) {
      return NextResponse.json({ error: 'PIC name is required.' }, { status: 400 })
    }
    if (!picPhone || !picPhone.trim()) {
      return NextResponse.json({ error: 'PIC phone number is required.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Formats date with explicit Malaysian Timezone (+08:00) offset
    const mytArrivalDate =
      typeof arrivalDate === 'string' && arrivalDate.length === 10
        ? `${arrivalDate}T00:00:00+08:00`
        : arrivalDate

    const newVendor = await payload.create({
      collection: 'vendors',
      data: {
        service,
        customService: customService || '',
        companyName: companyName || '',
        vehicleType,
        vehicleBrand: vehicleBrand || '',
        plateNumber: plateNumber || '',
        arrivalDate: mytArrivalDate,
        arrivalTime,
        serviceTime,
        serviceDuration,
        numberOfWorkers: Number(numberOfWorkers),
        picName,
        picPhone,
        notes: notes || '',
      },
    })

    return NextResponse.json({ success: true, doc: newVendor }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating vendor registration:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to submit vendor registration.' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const { docs: vendors } = await payload.find({
      collection: 'vendors',
      limit: 100,
      sort: '-createdAt',
    })
    return NextResponse.json({ docs: vendors })
  } catch (error: any) {
    console.error('Error fetching vendors:', error)
    return NextResponse.json({ error: 'Failed to fetch vendors.' }, { status: 500 })
  }
}
