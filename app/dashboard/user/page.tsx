'use client';

import { EllipsisOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { User } from '@prisma/client';
import { Button, Dropdown, Tag } from 'antd';
import React from 'react';

import { WpxTable } from '@/components/wpx-table';
import { useModel } from '@/hooks/model';

export default function Page() {
  const model = useModel<User>('user/api');
  return (
    <WpxTable<User>
      model={model}
      action={
        <>
          <Button icon={<EllipsisOutlined />}></Button>
          <Button type="primary" icon={<PlusOutlined />}></Button>
        </>
      }
      columns={[
        {
          title: 'Full Name',
          width: 240,
          render: (value, record, index) => (
            <>
              {record.first_name} {record.last_name}
            </>
          )
        },
        { title: 'Gender', dataIndex: 'gender', width: 180 },
        {
          title: 'Job Detail',
          width: 420,
          render: (value, record, index) => (
            <>
              <Tag>{record.job_type}</Tag> {record.job_title}
            </>
          )
        },
        {
          title: 'Bio',
          dataIndex: 'bio'
        },
        {
          title: (
            <Dropdown menu={{ items: [] }}>
              <Button type="text" icon={<SettingOutlined />}></Button>
            </Dropdown>
          ),
          width: 64,
          align: 'center',
          render: (_, record) => (
            <Dropdown menu={{ items: [] }}>
              <Button type="text" icon={<EllipsisOutlined />}></Button>
            </Dropdown>
          )
        }
      ]}
    />
  );
}
