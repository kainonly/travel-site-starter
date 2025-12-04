import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: '团队成员',
    plural: '团队成员',
  },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: () => true,
    update: adminOnly,
  },
  admin: {
    group: '网站管理',
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'order'],
  },
  fields: [
    {
      name: 'name',
      label: '姓名',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      label: '职位',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      label: '照片',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      label: '简介',
      type: 'textarea',
    },
    {
      name: 'email',
      label: '邮箱',
      type: 'email',
    },
    {
      name: 'phone',
      label: '电话',
      type: 'text',
    },
    {
      name: 'socialLinks',
      label: '社交媒体',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: '平台',
          type: 'select',
          options: [
            { label: '微信', value: 'wechat' },
            { label: '微博', value: 'weibo' },
            { label: '抖音', value: 'douyin' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
          required: true,
        },
        {
          name: 'url',
          label: '链接',
          type: 'text',
          required: true,
        },
      ],
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
  ],
}
