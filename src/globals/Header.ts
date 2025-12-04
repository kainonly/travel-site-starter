import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  label: '页头',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '基本设置',
          fields: [
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'showTopBar',
              label: '显示顶部栏',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'topBarContent',
              label: '顶部栏内容',
              type: 'group',
              admin: {
                condition: (data) => data?.showTopBar,
              },
              fields: [
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
                {
                  name: 'announcement',
                  label: '公告',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: '导航菜单',
          fields: [
            {
              name: 'navItems',
              label: '导航项',
              type: 'array',
              maxRows: 8,
              fields: [
                link({
                  appearances: false,
                }),
                {
                  name: 'hasSubmenu',
                  label: '有子菜单',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'submenuItems',
                  label: '子菜单项',
                  type: 'array',
                  admin: {
                    condition: (data, siblingData) => siblingData?.hasSubmenu,
                  },
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
          label: '右侧按钮',
          fields: [
            {
              name: 'showSearch',
              label: '显示搜索',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'ctaButton',
              label: 'CTA 按钮',
              type: 'group',
              fields: [
                {
                  name: 'show',
                  label: '显示',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'label',
                  label: '文字',
                  type: 'text',
                  defaultValue: '立即咨询',
                },
                link({
                  appearances: false,
                  overrides: {
                    name: 'ctaLink',
                  },
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
}
