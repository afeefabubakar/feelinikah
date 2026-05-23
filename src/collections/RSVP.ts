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
  ],
}
