import type { CollectionConfig } from 'payload'

export const Wishlist: CollectionConfig = {
  slug: 'wishlist',
  labels: {
    singular: 'Wishlist',
    plural: 'Wishlists',
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Allow public to read the wishlist
    update: () => true, // Allow public to increment count and upload proof
  },
  fields: [
    {
      name: 'position',
      label: 'Sort Position',
      type: 'number',
      defaultValue: 1,
      admin: {
        description: 'Order position of this item (smaller numbers appear first).',
      },
    },
    {
      name: 'hide',
      label: 'Hide from wishlist',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'URL of the wishlist item.',
      },
    },
    {
      name: 'image',
      label: 'Item Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'interested',
      label: 'Interested Guests',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'How many guests have expressed interest in getting this item.',
      },
    },
    {
      name: 'unclaimable',
      label: 'Unclaimable (Multiple purchases allowed)',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'If checked, multiple guests can claim/purchase this item and it will not be greyed out.',
      },
    },
    {
      name: 'isClaimed',
      label: 'Has been Purchased',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: ({ unclaimable }) => {
          return !unclaimable
        },
      },
    },
    {
      name: 'proofOfPurchase',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: ({ unclaimable }) => {
          return !unclaimable
        },
      },
    },
  ],
}
