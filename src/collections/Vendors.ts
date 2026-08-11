import type { CollectionConfig } from 'payload'

export const Vendors: CollectionConfig = {
  slug: 'vendors',
  labels: {
    singular: 'Vendor',
    plural: 'Vendors',
  },
  admin: {
    group: 'Content',
    useAsTitle: 'picName',
    defaultColumns: [
      'picName',
      'service',
      'companyName',
      'vehicleType',
      'plateNumber',
      'arrivalDate',
      'arrivalTime',
      'numberOfWorkers',
    ],
  },
  access: {
    create: () => true, // Allow public vendor registration
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'service',
      label: 'Service Provided',
      type: 'select',
      options: [
        { label: 'Bridal Bouquet', value: 'bridal_bouquet' },
        { label: 'Bride Assistant', value: 'bride_assistant' },
        { label: 'Emcee', value: 'emcee' },
        { label: 'Food / Catering', value: 'food' },
        { label: 'Groom Stylist', value: 'groom_stylist' },
        { label: 'Henna', value: 'henna' },
        { label: 'Makeup Artist', value: 'makeup' },
        { label: 'Pelamin', value: 'pelamin' },
        { label: 'Photographer & Videographer', value: 'photo_video' },
        { label: 'RELA', value: 'rela' },
        { label: 'Tent', value: 'tent' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'customService',
      label: 'Other Service Details',
      type: 'text',
      admin: {
        condition: (data) => data?.service === 'other',
      },
    },
    {
      name: 'companyName',
      label: 'Company / Business Name',
      type: 'text',
      required: true,
    },
    {
      name: 'vehicleType',
      label: 'Vehicle Type',
      type: 'select',
      options: [
        { label: 'Lorry / Truck', value: 'lorry' },
        { label: 'Van', value: 'van' },
        { label: 'Car / Sedan / SUV', value: 'car' },
        { label: '4x4 Pickup', value: 'pickup' },
        { label: 'Motorcycle', value: 'motorcycle' },
        { label: 'None / No Vehicle', value: 'none' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'vehicleBrand',
      label: 'Vehicle Brand',
      type: 'text',
      admin: {
        placeholder: 'e.g. Isuzu, Toyota, Honda',
      },
    },
    {
      name: 'plateNumber',
      label: 'Vehicle Plate Number',
      type: 'text',
      admin: {
        placeholder: 'e.g. WXX 1234',
      },
    },
    {
      name: 'arrivalDate',
      label: 'Arrival Date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
      },
    },
    {
      name: 'arrivalTime',
      label: 'Arrival Time',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g. 08:30 AM',
      },
    },
    {
      name: 'serviceTime',
      label: 'Service / Event Time',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g. 10:00 AM - 02:00 PM',
      },
    },
    {
      name: 'serviceDuration',
      label: 'Service Duration',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g. 4 hours',
      },
    },
    {
      name: 'numberOfWorkers',
      label: 'Number of Workers / Crew',
      type: 'number',
      defaultValue: 1,
      required: true,
    },
    {
      name: 'picName',
      label: 'PIC Contact Name',
      type: 'text',
      required: true,
    },
    {
      name: 'picPhone',
      label: 'PIC Phone Number',
      type: 'text',
      required: true,
    },
    {
      name: 'notes',
      label: 'Special Instructions / Notes',
      type: 'textarea',
    },
  ],
}
