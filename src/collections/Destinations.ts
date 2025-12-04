import type { CollectionConfig } from 'payload'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  labels: {
    singular: '目的地',
    plural: '目的地',
  },
  admin: {
    useAsTitle: 'name',
    group: '内容管理',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '名称',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: '封面图片',
      relationTo: 'media',
      required: true,
    },
  ],
}
