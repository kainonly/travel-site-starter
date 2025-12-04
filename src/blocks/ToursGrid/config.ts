import type { Block } from 'payload'

export const ToursGrid: Block = {
  slug: 'tours-grid',
  labels: {
    singular: '旅游产品网格',
    plural: '旅游产品网格',
  },
  imageURL: '/blocks/tours-grid.png',
  fields: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
      defaultValue: '热门旅游',
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
          name: 'filterByDestination',
          label: '按目的地筛选',
          type: 'relationship',
          relationTo: 'destinations',
        },
        {
          name: 'filterByCategory',
          label: '按分类筛选',
          type: 'relationship',
          relationTo: 'tour-categories',
        },
        {
          name: 'orderBy',
          label: '排序方式',
          type: 'select',
          defaultValue: 'order',
          options: [
            { label: '自定义排序', value: 'order' },
            { label: '最新添加', value: 'createdAt' },
            { label: '价格从低到高', value: 'priceAsc' },
            { label: '价格从高到低', value: 'priceDesc' },
            { label: '评分', value: 'rating' },
          ],
        },
      ],
    },
    {
      name: 'tours',
      label: '选择旅游产品',
      type: 'relationship',
      relationTo: 'tours',
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
        { label: '列表', value: 'list' },
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
      name: 'showRating',
      label: '显示评分',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showPrice',
      label: '显示价格',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showDuration',
      label: '显示时长',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'viewAllLink',
      label: '查看全部链接',
      type: 'text',
      admin: {
        placeholder: '如: /tours',
      },
    },
  ],
}
