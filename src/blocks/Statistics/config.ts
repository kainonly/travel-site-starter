import type { Block } from 'payload'

export const Statistics: Block = {
  slug: 'statistics',
  labels: {
    singular: '统计数据',
    plural: '统计数据',
  },
  imageURL: '/blocks/statistics.png',
  fields: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
    },
    {
      name: 'subtitle',
      label: '副标题',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      label: '背景图片',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'items',
      label: '统计项',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'number',
          label: '数字',
          type: 'text',
          required: true,
          admin: {
            placeholder: '如: 500+ 或 10000',
          },
        },
        {
          name: 'label',
          label: '标签',
          type: 'text',
          required: true,
          admin: {
            placeholder: '如: 旅游产品',
          },
        },
        {
          name: 'icon',
          label: '图标',
          type: 'text',
          admin: {
            placeholder: '如: map, users, star',
          },
        },
      ],
    },
    {
      name: 'style',
      label: '样式',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: '默认', value: 'default' },
        { label: '带背景图', value: 'withBackground' },
        { label: '卡片式', value: 'cards' },
      ],
    },
  ],
}
