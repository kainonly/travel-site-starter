import type { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  labels: {
    singular: '旅游线路',
    plural: '旅游线路',
  },
  admin: {
    useAsTitle: 'title',
    group: '内容管理',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: '标题',
      required: true,
    },
    {
      name: 'destination',
      type: 'relationship',
      label: '目的地',
      relationTo: 'destinations',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: '封面图片',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'video',
      type: 'upload',
      label: '视频',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      label: '价格',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      label: '行程天数',
      admin: {
        placeholder: '如：5天4晚',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: '简介描述',
    },
  ],
}
