import type { CollectionConfig } from 'payload'

export const Travelers: CollectionConfig = {
  slug: 'travelers',
  labels: {
    singular: '旅客',
    plural: '旅客',
  },
  admin: {
    useAsTitle: 'name',
    group: '用户管理',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '姓名',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: '手机号',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: '邮箱',
    },
    {
      name: 'idType',
      type: 'select',
      label: '证件类型',
      options: [
        { label: '身份证', value: 'idCard' },
        { label: '护照', value: 'passport' },
        { label: '港澳通行证', value: 'hkMacauPass' },
        { label: '台湾通行证', value: 'taiwanPass' },
      ],
      defaultValue: 'idCard',
      required: true,
    },
    {
      name: 'idNumber',
      type: 'text',
      label: '证件号码',
      required: true,
    },
    {
      name: 'gender',
      type: 'select',
      label: '性别',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
    },
    {
      name: 'birthday',
      type: 'date',
      label: '出生日期',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
      },
    },
    {
      name: 'emergencyContact',
      type: 'text',
      label: '紧急联系人',
    },
    {
      name: 'emergencyPhone',
      type: 'text',
      label: '紧急联系人电话',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: '备注',
      admin: {
        placeholder: '特殊需求、饮食禁忌等',
      },
    },
  ],
}
