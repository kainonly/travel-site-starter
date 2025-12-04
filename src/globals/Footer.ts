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
      name: 'navItems',
      label: '导航项',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
}
