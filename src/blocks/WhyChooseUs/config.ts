import type { Block } from 'payload'

export const WhyChooseUs: Block = {
  slug: 'why-choose-us',
  labels: {
    singular: '为什么选择我们',
    plural: '为什么选择我们',
  },
  imageURL: '/blocks/why-choose-us.png',
  fields: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      defaultValue: '为什么选择我们',
    },
    {
      name: 'subtitle',
      label: '副标题',
      type: 'text',
    },
    {
      name: 'features',
      label: '特色',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          label: '图标',
          type: 'text',
          admin: {
            placeholder: '如: shield, clock, headphones, award',
          },
        },
        {
          name: 'image',
          label: '图片',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: '如果没有图标，可以使用图片',
          },
        },
        {
          name: 'title',
          label: '标题',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: '描述',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'layout',
      label: '布局样式',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: '网格', value: 'grid' },
        { label: '列表', value: 'list' },
        { label: '带图片', value: 'withImage' },
      ],
    },
    {
      name: 'columns',
      label: '列数',
      type: 'select',
      defaultValue: '4',
      options: [
        { label: '2 列', value: '2' },
        { label: '3 列', value: '3' },
        { label: '4 列', value: '4' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.layout === 'grid',
      },
    },
    {
      name: 'sideImage',
      label: '侧边图片',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data, siblingData) => siblingData?.layout === 'withImage',
      },
    },
  ],
}
