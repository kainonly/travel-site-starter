import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: '网站设置',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '基本信息',
          fields: [
            {
              name: 'siteName',
              label: '网站名称',
              type: 'text',
              required: true,
            },
            {
              name: 'tagline',
              label: '网站标语',
              type: 'text',
            },
            {
              name: 'description',
              label: '网站描述',
              type: 'textarea',
            },
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'favicon',
              label: 'Favicon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: '联系信息',
          fields: [
            {
              name: 'contactPhone',
              label: '联系电话',
              type: 'text',
            },
            {
              name: 'contactEmail',
              label: '联系邮箱',
              type: 'email',
            },
            {
              name: 'contactAddress',
              label: '联系地址',
              type: 'textarea',
            },
            {
              name: 'workingHours',
              label: '工作时间',
              type: 'text',
              admin: {
                placeholder: '如: 周一至周五 9:00-18:00',
              },
            },
            {
              name: 'mapCoordinates',
              label: '地图坐标',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'latitude',
                      label: '纬度',
                      type: 'number',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'longitude',
                      label: '经度',
                      type: 'number',
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '社交媒体',
          fields: [
            {
              name: 'socialLinks',
              label: '社交媒体链接',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  label: '平台',
                  type: 'select',
                  options: [
                    { label: '微信公众号', value: 'wechat' },
                    { label: '微博', value: 'weibo' },
                    { label: '抖音', value: 'douyin' },
                    { label: '小红书', value: 'xiaohongshu' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Twitter', value: 'twitter' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'LinkedIn', value: 'linkedin' },
                  ],
                  required: true,
                },
                {
                  name: 'url',
                  label: '链接',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'qrCode',
                  label: '二维码',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: '用于微信等需要扫码关注的平台',
                  },
                },
              ],
            },
          ],
        },
        {
          label: '货币设置',
          fields: [
            {
              name: 'defaultCurrency',
              label: '默认货币',
              type: 'select',
              defaultValue: 'CNY',
              options: [
                { label: '人民币 (CNY)', value: 'CNY' },
                { label: '美元 (USD)', value: 'USD' },
                { label: '欧元 (EUR)', value: 'EUR' },
                { label: '英镑 (GBP)', value: 'GBP' },
                { label: '日元 (JPY)', value: 'JPY' },
              ],
            },
            {
              name: 'currencySymbol',
              label: '货币符号',
              type: 'text',
              defaultValue: '¥',
            },
          ],
        },
        {
          label: '统计与脚本',
          fields: [
            {
              name: 'googleAnalyticsId',
              label: 'Google Analytics ID',
              type: 'text',
            },
            {
              name: 'baiduTongjiId',
              label: '百度统计 ID',
              type: 'text',
            },
            {
              name: 'customHeadScripts',
              label: '自定义头部脚本',
              type: 'code',
              admin: {
                language: 'html',
                description: '添加到 <head> 标签中的自定义脚本',
              },
            },
            {
              name: 'customFooterScripts',
              label: '自定义底部脚本',
              type: 'code',
              admin: {
                language: 'html',
                description: '添加到 </body> 标签前的自定义脚本',
              },
            },
          ],
        },
      ],
    },
  ],
}
