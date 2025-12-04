import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  labels: {
    singular: '客户评价',
    plural: '客户评价',
  },
  imageURL: '/blocks/testimonials.png',
  fields: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      defaultValue: '客户评价',
    },
    {
      name: 'subtitle',
      label: '副标题',
      type: 'text',
    },
    {
      name: 'selectionType',
      label: '选择方式',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: '自动获取', value: 'auto' },
        { label: '手动选择', value: 'manual' },
      ],
    },
    {
      name: 'autoConfig',
      label: '自动获取配置',
      type: 'group',
      admin: {
        condition: (data, siblingData) => siblingData?.selectionType === 'auto',
      },
      fields: [
        {
          name: 'limit',
          label: '显示数量',
          type: 'number',
          defaultValue: 6,
          min: 1,
          max: 12,
        },
        {
          name: 'onlyFeatured',
          label: '仅显示推荐',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'minRating',
          label: '最低评分',
          type: 'number',
          defaultValue: 4,
          min: 1,
          max: 5,
        },
      ],
    },
    {
      name: 'reviews',
      label: '选择评价',
      type: 'relationship',
      relationTo: 'reviews',
      hasMany: true,
      admin: {
        condition: (data, siblingData) => siblingData?.selectionType === 'manual',
      },
    },
    {
      name: 'layout',
      label: '布局样式',
      type: 'select',
      defaultValue: 'carousel',
      options: [
        { label: '轮播', value: 'carousel' },
        { label: '网格', value: 'grid' },
        { label: '列表', value: 'list' },
      ],
    },
    {
      name: 'showAvatar',
      label: '显示头像',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showRating',
      label: '显示评分',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
