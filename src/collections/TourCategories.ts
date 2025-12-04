import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const TourCategories: CollectionConfig = {
  slug: 'tour-categories',
  labels: {
    singular: '旅游分类',
    plural: '旅游分类',
  },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: () => true,
    update: adminOnly,
  },
  admin: {
    group: '旅游管理',
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order'],
  },
  fields: [
    {
      name: 'title',
      label: '分类名称',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: '描述',
      type: 'textarea',
    },
    {
      name: 'icon',
      label: '图标',
      type: 'text',
      admin: {
        description: '图标名称，如: compass, mountain, beach, camera, utensils',
      },
    },
    {
      name: 'coverImage',
      label: '封面图片',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      label: '排序',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
}
