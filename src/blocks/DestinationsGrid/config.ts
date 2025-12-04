import type { Block } from 'payload'

export const DestinationsGrid: Block = {
  slug: 'destinations-grid',
  labels: {
    singular: '目的地网格',
    plural: '目的地网格',
  },
  imageURL: '/blocks/destinations-grid.png',
  fields: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      defaultValue: '热门目的地',
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
          defaultValue: false,
        },
        {
          name: 'orderBy',
          label: '排序方式',
          type: 'select',
          defaultValue: 'order',
          options: [
            { label: '自定义排序', value: 'order' },
            { label: '最新添加', value: 'createdAt' },
            { label: '名称', value: 'title' },
          ],
        },
      ],
    },
    {
      name: 'destinations',
      label: '选择目的地',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true,
      admin: {
        condition: (data, siblingData) => siblingData?.selectionType === 'manual',
      },
    },
    {
      name: 'layout',
      label: '布局样式',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: '网格', value: 'grid' },
        { label: '轮播', value: 'carousel' },
        { label: '瀑布流', value: 'masonry' },
      ],
    },
    {
      name: 'columns',
      label: '列数',
      type: 'select',
      defaultValue: '3',
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
      name: 'showTourCount',
      label: '显示旅游数量',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'viewAllLink',
      label: '查看全部链接',
      type: 'text',
      admin: {
        placeholder: '如: /destinations',
      },
    },
  ],
}
