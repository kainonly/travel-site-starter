import type { Block } from 'payload'

import { link } from '@/fields/link'

export const HeroBanner: Block = {
  slug: 'hero-banner',
  labels: {
    singular: '首页横幅',
    plural: '首页横幅',
  },
  imageURL: '/blocks/hero-banner.png',
  fields: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: '副标题',
      type: 'text',
    },
    {
      name: 'backgroundType',
      label: '背景类型',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: '图片', value: 'image' },
        { label: '视频', value: 'video' },
      ],
    },
    {
      name: 'backgroundImage',
      label: '背景图片',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundType === 'image',
      },
    },
    {
      name: 'backgroundVideo',
      label: '背景视频',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundType === 'video',
      },
    },
    {
      name: 'overlayOpacity',
      label: '遮罩透明度',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 40,
      admin: {
        description: '0-100，数值越大遮罩越暗',
      },
    },
    {
      name: 'showSearchForm',
      label: '显示搜索表单',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'ctaButtons',
      label: 'CTA 按钮',
      type: 'array',
      maxRows: 2,
      fields: [
        {
          name: 'label',
          label: '按钮文字',
          type: 'text',
          required: true,
        },
        // link({
        //   appearances: true,
        // }),
      ],
    },
  ],
}
