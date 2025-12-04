import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { ecommercePlugin } from '@payloadcms/plugin-ecommerce'

import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe'

import { Page, Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { ProductsCollection } from '@/collections/Products'
import { adminOrCustomerOwner } from '@/access/adminOrCustomerOwner'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { adminOnly } from '@/access/adminOnly'
import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'
import { customerOnlyFieldAccess } from '@/access/customerOnlyFieldAccess'

const generateTitle: GenerateTitle<Product | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Ecommerce Template` : 'Payload Ecommerce Template'
}

const generateURL: GenerateURL<Product | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formSubmissionOverrides: {
      labels: {
        singular: '表单提交',
        plural: '表单提交',
      },
      admin: {
        group: '内容',
      },
    },
    formOverrides: {
      labels: {
        singular: '表单',
        plural: '表单',
      },
      admin: {
        group: '内容',
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  ecommercePlugin({
    access: {
      adminOnly,
      adminOnlyFieldAccess,
      adminOrCustomerOwner,
      adminOrPublishedStatus,
      customerOnlyFieldAccess,
    },
    customers: {
      slug: 'users',
    },
    payments: {
      paymentMethods: [
        stripeAdapter({
          secretKey: process.env.STRIPE_SECRET_KEY!,
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
          webhookSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET!,
        }),
      ],
    },
    addresses: {
      addressesCollectionOverride: ({ defaultCollection }) => ({
        ...defaultCollection,
        labels: {
          singular: '地址',
          plural: '地址',
        },
        admin: {
          ...defaultCollection?.admin,
          group: '电商',
        },
      }),
    },
    products: {
      productsCollectionOverride: ProductsCollection,
      variants: {
        variantsCollectionOverride: ({ defaultCollection }) => ({
          ...defaultCollection,
          labels: {
            singular: '变体',
            plural: '变体',
          },
          admin: {
            ...defaultCollection?.admin,
            group: '电商',
          },
        }),
        variantOptionsCollectionOverride: ({ defaultCollection }) => ({
          ...defaultCollection,
          labels: {
            singular: '变体选项',
            plural: '变体选项',
          },
          admin: {
            ...defaultCollection?.admin,
            group: '电商',
          },
        }),
        variantTypesCollectionOverride: ({ defaultCollection }) => ({
          ...defaultCollection,
          labels: {
            singular: '变体类型',
            plural: '变体类型',
          },
          admin: {
            ...defaultCollection?.admin,
            group: '电商',
          },
        }),
      },
    },
    carts: {
      cartsCollectionOverride: ({ defaultCollection }) => ({
        ...defaultCollection,
        labels: {
          singular: '购物车',
          plural: '购物车',
        },
        admin: {
          ...defaultCollection?.admin,
          group: '电商',
        },
      }),
    },
    orders: {
      ordersCollectionOverride: ({ defaultCollection }) => ({
        ...defaultCollection,
        labels: {
          singular: '订单',
          plural: '订单',
        },
        admin: {
          ...defaultCollection?.admin,
          group: '电商',
        },
      }),
    },
    transactions: {
      transactionsCollectionOverride: ({ defaultCollection }) => ({
        ...defaultCollection,
        labels: {
          singular: '交易',
          plural: '交易',
        },
        admin: {
          ...defaultCollection?.admin,
          group: '电商',
        },
      }),
    },
  }),
]
