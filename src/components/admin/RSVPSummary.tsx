import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

type Side = 'groom' | 'bride' | 'friends' | null | undefined

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div
      style={{
        padding: '1.25rem',
        borderRadius: '8px',
        backgroundColor: 'var(--theme-bg-elevation-100)',
        border: '1px solid var(--theme-border-color)',
      }}
    >
      <h4
        style={{
          margin: 0,
          fontSize: '0.8rem',
          color: 'var(--theme-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </h4>
      <p
        style={{
          margin: '0.5rem 0 0',
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: color ?? 'inherit',
        }}
      >
        {value}
      </p>
    </div>
  )
}

function SideBreakdown({
  label,
  rsvps,
  color,
}: {
  label: string
  rsvps: { isAttending: boolean | null | undefined; attendeesCount?: number | null | undefined; childrenCount?: number | null | undefined }[]
  color: string
}) {
  const attending = rsvps.filter((r) => r.isAttending)
  const guests = attending.reduce((sum, r) => sum + (r.attendeesCount || 1), 0)
  const children = attending.reduce((sum, r) => sum + (r.childrenCount || 0), 0)
  const declined = rsvps.length - attending.length

  return (
    <div
      style={{
        padding: '1.25rem',
        borderRadius: '8px',
        backgroundColor: 'var(--theme-bg-elevation-100)',
        border: `1px solid var(--theme-border-color)`,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <h4
        style={{
          margin: '0 0 0.75rem',
          fontSize: '0.85rem',
          fontWeight: 700,
          color,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </h4>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--theme-text-muted)' }}>
            Total Submissions
          </p>
          <p style={{ margin: '0.2rem 0 0', fontSize: '1.4rem', fontWeight: 'bold' }}>
            {rsvps.length}
          </p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--theme-text-muted)' }}>
            Total Attendees (Adults)
          </p>
          <p
            style={{
              margin: '0.2rem 0 0',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              color: 'var(--theme-primary-500)',
            }}
          >
            {guests}
          </p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--theme-text-muted)' }}>
            Total Children
          </p>
          <p
            style={{
              margin: '0.2rem 0 0',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              color: '#f59e0b',
            }}
          >
            {children}
          </p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--theme-text-muted)' }}>
            Accepted
          </p>
          <p
            style={{
              margin: '0.2rem 0 0',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              color: 'var(--theme-success-500)',
            }}
          >
            {attending.length}
          </p>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--theme-text-muted)' }}>
            Declined
          </p>
          <p
            style={{
              margin: '0.2rem 0 0',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              color: 'var(--theme-error-500)',
            }}
          >
            {declined}
          </p>
        </div>
      </div>
    </div>
  )
}

export async function RSVPSummary() {
  const payload = await getPayload({ config })

  const { docs: rsvps } = await payload.find({
    collection: 'rsvp',
    limit: 1000,
  })

  const attendingRSVPs = rsvps.filter((r) => r.isAttending)
  const totalAttendingGuests = attendingRSVPs.reduce((sum, r) => sum + (r.attendeesCount || 1), 0)
  const totalChildren = attendingRSVPs.reduce((sum, r) => sum + (r.childrenCount || 0), 0)
  const declinedRSVPs = rsvps.length - attendingRSVPs.length

  const bySide = (side: Side) => rsvps.filter((r) => (r.side as Side) === side)

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* ── Overall totals ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <StatCard label="Total Submissions" value={rsvps.length} />
        <StatCard
          label="Total Adults (Guests)"
          value={totalAttendingGuests}
          color="var(--theme-primary-500)"
        />
        <StatCard
          label="Total Children"
          value={totalChildren}
          color="#f59e0b"
        />
        <StatCard
          label="Accepted RSVPs"
          value={attendingRSVPs.length}
          color="var(--theme-success-500)"
        />
        <StatCard label="Declined RSVPs" value={declinedRSVPs} color="var(--theme-error-500)" />
      </div>

      {/* ── Per-side breakdown ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        <SideBreakdown label="Groom's Side" rsvps={bySide('groom')} color="#60a5fa" />
        <SideBreakdown label="Bride's Side" rsvps={bySide('bride')} color="#f472b6" />
        <SideBreakdown label="Friends" rsvps={bySide('friends')} color="#a78bfa" />
      </div>
    </div>
  )
}
