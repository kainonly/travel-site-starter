'use client';

import { User } from '@prisma/client';
import { Button, Space, Tag } from 'antd';
import React from 'react';

import { WpxTable } from '@/components/wpx-table';
import { useModel } from '@/hooks/model';

export default function Page() {
  const model = useModel<User>('user/api');
  return (
    <WpxTable<User>
      model={model}
      extra={
        <Space align={'center'}>
          <Button type="primary">Create</Button>
        </Space>
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
        { title: '', width: 60 }
      ]}
    />
  );
}
