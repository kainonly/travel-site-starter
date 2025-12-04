import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  labels: {
    singular: '目的地',
    plural: '目的地',
  },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublishedStatus,
    update: adminOnly,
  },
  admin: {
    group: '旅游管理',
    useAsTitle: 'title',
    defaultColumns: ['title', 'country', 'featured', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      label: '目的地名称',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      label: '国家',
      type: 'text',
      required: true,
    },
    {
      name: 'region',
      label: '地区',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: '内容',
          fields: [
            {
              name: 'description',
              label: '描述',
              type: 'richText',
            },
            {
              name: 'shortDescription',
              label: '简短描述',
              type: 'textarea',
              maxLength: 200,
            },
            {
              name: 'coverImage',
              label: '封面图片',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'gallery',
              label: '图片库',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  label: '图片',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  label: '图片说明',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: '详情',
          fields: [
            {
              name: 'highlights',
              label: '亮点',
              type: 'array',
              fields: [
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
                {
                  name: 'icon',
                  label: '图标',
                  type: 'text',
                  admin: {
                    description: '图标名称，如: map-pin, sun, camera',
                  },
                },
              ],
            },
            {
              name: 'climate',
              label: '气候信息',
              type: 'textarea',
            },
            {
              name: 'bestTimeToVisit',
              label: '最佳旅游时间',
              type: 'text',
            },
            {
              name: 'language',
              label: '语言',
              type: 'text',
            },
            {
              name: 'currency',
              label: '货币',
              type: 'text',
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'featured',
      label: '推荐',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
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
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 25,
  },
}
