import type { Block } from 'payload'

export const Newsletter: Block = {
  slug: 'newsletter',
  labels: {
    singular: '邮件订阅',
    plural: '邮件订阅',
  },
  imageURL: '/blocks/newsletter.png',
  fields: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      defaultValue: '订阅我们的通讯',
    },
    {
      name: 'subtitle',
      label: '副标题',
      type: 'text',
      defaultValue: '获取最新的旅游优惠和目的地资讯',
    },
    {
      name: 'backgroundImage',
      label: '背景图片',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'buttonText',
      label: '按钮文字',
      type: 'text',
      defaultValue: '订阅',
    },
    {
      name: 'placeholderText',
      label: '输入框占位文字',
      type: 'text',
      defaultValue: '请输入您的邮箱',
    },
    {
      name: 'style',
      label: '样式',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: '默认', value: 'default' },
        { label: '带背景', value: 'withBackground' },
        { label: '全宽', value: 'fullWidth' },
      ],
    },
  ],
}
