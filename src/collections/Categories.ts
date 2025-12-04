import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: '分类',
    plural: '分类',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: '内容',
  },
  fields: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
