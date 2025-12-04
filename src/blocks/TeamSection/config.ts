import type { Block } from 'payload'

export const TeamSection: Block = {
  slug: 'team-section',
  labels: {
    singular: '团队展示',
    plural: '团队展示',
  },
  imageURL: '/blocks/team-section.png',
  fields: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      defaultValue: '我们的团队',
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
          defaultValue: 4,
          min: 1,
          max: 12,
        },
      ],
    },
    {
      name: 'members',
      label: '选择成员',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      admin: {
        condition: (data, siblingData) => siblingData?.selectionType === 'manual',
      },
    },
    {
      name: 'columns',
      label: '列数',
      type: 'select',
      defaultValue: '4',
      options: [
        { label: '3 列', value: '3' },
        { label: '4 列', value: '4' },
      ],
    },
    {
      name: 'showSocialLinks',
      label: '显示社交链接',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showBio',
      label: '显示简介',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
