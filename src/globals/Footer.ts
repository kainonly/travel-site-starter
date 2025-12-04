import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: '页脚',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '基本信息',
          fields: [
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'description',
              label: '公司简介',
              type: 'textarea',
            },
            {
              name: 'contactInfo',
              label: '联系信息',
              type: 'group',
              fields: [
                {
                  name: 'address',
                  label: '地址',
                  type: 'text',
                },
                {
                  name: 'phone',
                  label: '电话',
                  type: 'text',
                },
                {
                  name: 'email',
                  label: '邮箱',
                  type: 'email',
                },
              ],
            },
          ],
        },
        {
          label: '导航列',
          fields: [
            {
              name: 'navColumns',
              label: '导航列',
              type: 'array',
              maxRows: 4,
              fields: [
                {
                  name: 'title',
                  label: '列标题',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'links',
                  label: '链接',
                  type: 'array',
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '订阅与社交',
          fields: [
            {
              name: 'newsletter',
              label: '邮件订阅',
              type: 'group',
              fields: [
                {
                  name: 'show',
                  label: '显示',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'title',
                  label: '标题',
                  type: 'text',
                  defaultValue: '订阅我们的通讯',
                },
                {
                  name: 'description',
                  label: '描述',
                  type: 'text',
                  defaultValue: '获取最新的旅游优惠和资讯',
                },
              ],
            },
            {
              name: 'showSocialLinks',
              label: '显示社交媒体链接',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: '从网站设置中获取社交媒体链接',
              },
            },
          ],
        },
        {
          label: '版权信息',
          fields: [
            {
              name: 'copyright',
              label: '版权文字',
              type: 'text',
              defaultValue: '© 2024 旅游网站. 保留所有权利.',
            },
            {
              name: 'bottomLinks',
              label: '底部链接',
              type: 'array',
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
}
