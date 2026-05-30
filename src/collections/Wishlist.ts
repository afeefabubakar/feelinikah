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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'A short note explaining why you are looking for this item.',
      },
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
      name: 'isClaimed',
      label: 'Has been Purchased',
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
