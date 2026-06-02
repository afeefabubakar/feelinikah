import { NextResponse } from 'next/server'

const icsContent = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//FEELINikah//Wedding//EN',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'BEGIN:VEVENT',
  'DTSTART:20260926T080000',
  'DTEND:20260926T230000',
  "SUMMARY:Alin and Afeef's Solemnization & Intimate Breakfast Wedding",
  'DESCRIPTION:Join us to celebrate our wedding day!',
  'LOCATION:Carpe Diem Orchard Home\\, Serendah',
  'STATUS:CONFIRMED',
  'END:VEVENT',
  'END:VCALENDAR',
].join('\r\n')

export async function GET() {
  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="feelinikah-save-the-date.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
