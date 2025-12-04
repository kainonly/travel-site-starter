import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { publicAccess } from '@/access/publicAccess'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: '评论',
    plural: '评论',
  },
  access: {
    create: publicAccess,
    delete: adminOnly,
    read: () => true,
    update: adminOnly,
  },
  admin: {
    group: '旅游管理',
    useAsTitle: 'author',
    defaultColumns: ['author', 'tour', 'rating', 'verified', 'createdAt'],
  },
  fields: [
    {
      name: 'author',
      label: '评论者',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: '邮箱',
      type: 'email',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'avatar',
      label: '头像',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rating',
      label: '评分',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      label: '评论标题',
      type: 'text',
    },
    {
      name: 'content',
      label: '评论内容',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tour',
      label: '旅游产品',
      type: 'relationship',
      relationTo: 'tours',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'destination',
      label: '目的地',
      type: 'relationship',
      relationTo: 'destinations',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'travelDate',
      label: '出行日期',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'verified',
      label: '已验证',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: '是否已验证为真实评论',
      },
    },
    {
      name: 'featured',
      label: '推荐展示',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'images',
      label: '评论图片',
      type: 'array',
      maxRows: 5,
      fields: [
        {
          name: 'image',
          label: '图片',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
