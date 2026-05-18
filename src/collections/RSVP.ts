import type { CollectionConfig } from 'payload'

export const RSVP: CollectionConfig = {
  slug: 'rsvp',
  admin: {
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
      name: 'dietaryRequirements',
      type: 'textarea',
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
}
