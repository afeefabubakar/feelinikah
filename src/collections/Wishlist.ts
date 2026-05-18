import type { CollectionConfig } from 'payload'

export const Wishlist: CollectionConfig = {
  slug: 'wishlist',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Allow public to read the wishlist
    update: () => true, // Allow public to increment count and upload proof
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text', // A URL to the item
    },
    {
      name: 'lookingIntoItCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'How many guests have expressed interest in this item.',
      },
    },
    {
      name: 'isClaimed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'proofOfPurchase',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
