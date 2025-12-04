import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Tours: CollectionConfig = {
  slug: 'tours',
  labels: {
    singular: '旅游产品',
    plural: '旅游产品',
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
    defaultColumns: ['title', 'price', 'duration', 'featured', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'tours',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'tours',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      label: '旅游名称',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: '基本信息',
          fields: [
            {
              name: 'description',
              label: '详细描述',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
            },
            {
              name: 'shortDescription',
              label: '简短描述',
              type: 'textarea',
              maxLength: 300,
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
          label: '价格与时长',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  label: '价格',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'originalPrice',
                  label: '原价',
                  type: 'number',
                  min: 0,
                  admin: {
                    width: '50%',
                    description: '用于显示折扣，留空则不显示',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'currency',
                  label: '货币',
                  type: 'select',
                  defaultValue: 'CNY',
                  options: [
                    { label: '人民币 (CNY)', value: 'CNY' },
                    { label: '美元 (USD)', value: 'USD' },
                    { label: '欧元 (EUR)', value: 'EUR' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'priceType',
                  label: '价格类型',
                  type: 'select',
                  defaultValue: 'per_person',
                  options: [
                    { label: '每人', value: 'per_person' },
                    { label: '每团', value: 'per_group' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'duration',
                  label: '时长',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    placeholder: '如: 5天4晚',
                  },
                },
                {
                  name: 'durationDays',
                  label: '天数',
                  type: 'number',
                  min: 1,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'groupSizeMin',
                  label: '最小成团人数',
                  type: 'number',
                  min: 1,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'groupSizeMax',
                  label: '最大团队人数',
                  type: 'number',
                  min: 1,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'difficulty',
              label: '难度级别',
              type: 'select',
              options: [
                { label: '轻松', value: 'easy' },
                { label: '中等', value: 'moderate' },
                { label: '挑战', value: 'challenging' },
                { label: '困难', value: 'difficult' },
              ],
            },
          ],
        },
        {
          label: '行程安排',
          fields: [
            {
              name: 'itinerary',
              label: '行程',
              type: 'array',
              fields: [
                {
                  name: 'day',
                  label: '天数',
                  type: 'number',
                  required: true,
                  min: 1,
                  admin: {
                    width: '20%',
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
                  type: 'richText',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'meals',
                      label: '餐食',
                      type: 'text',
                      admin: {
                        width: '50%',
                        placeholder: '如: 早餐、午餐、晚餐',
                      },
                    },
                    {
                      name: 'accommodation',
                      label: '住宿',
                      type: 'text',
                      admin: {
                        width: '50%',
                      },
                    },
                  ],
                },
                {
                  name: 'image',
                  label: '配图',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: '包含/不包含',
          fields: [
            {
              name: 'includes',
              label: '费用包含',
              type: 'array',
              fields: [
                {
                  name: 'item',
                  label: '项目',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'excludes',
              label: '费用不包含',
              type: 'array',
              fields: [
                {
                  name: 'item',
                  label: '项目',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'highlights',
              label: '旅游亮点',
              type: 'array',
              fields: [
                {
                  name: 'item',
                  label: '亮点',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: '关联',
          fields: [
            {
              name: 'destinations',
              label: '目的地',
              type: 'relationship',
              relationTo: 'destinations',
              hasMany: true,
            },
            {
              name: 'categories',
              label: '分类',
              type: 'relationship',
              relationTo: 'tour-categories',
              hasMany: true,
            },
            {
              name: 'relatedTours',
              label: '相关旅游',
              type: 'relationship',
              relationTo: 'tours',
              hasMany: true,
              filterOptions: ({ id }) => {
                if (id) {
                  return { id: { not_in: [id] } }
                }
                return { id: { exists: true } }
              },
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
      name: 'rating',
      label: '评分',
      type: 'number',
      min: 0,
      max: 5,
      admin: {
        position: 'sidebar',
        step: 0.1,
      },
    },
    {
      name: 'reviewCount',
      label: '评论数',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
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
    maxPerDoc: 50,
  },
}
