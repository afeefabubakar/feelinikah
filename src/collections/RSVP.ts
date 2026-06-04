import type { CollectionConfig } from 'payload'

export const RSVP: CollectionConfig = {
  slug: 'rsvp',
  labels: {
    singular: 'RSVP',
    plural: 'RSVPs',
  },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    components: {
      beforeListTable: ['@/components/admin/RSVPSummary#RSVPSummary'],
    },
  },
  access: {
    create: () => true, // Allow public submissions
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'isAttending',
      type: 'checkbox',
      required: true,
    },
    {
      name: 'attendeesCount',
      label: 'Number of Attendees',
      type: 'number',
      defaultValue: 1,
      admin: {
        condition: ({ isAttending }) => {
          return isAttending
        },
      },
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'side',
      type: 'select',
      options: [
        { label: 'Groom', value: 'groom' },
        { label: 'Bride', value: 'bride' },
        { label: 'Friends', value: 'friends' },
      ],
      required: false,
    },
  ],
}
