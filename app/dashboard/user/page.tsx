'use client';

import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { User } from '@prisma/client';
import { Button, Card, Input, Space, Table, Tag } from 'antd';
import React, { useState } from 'react';
import useSWR from 'swr';

export default function Page() {
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const { data, isLoading } = useSWR(`user/api?page=${pageIndex}`, url =>
    fetch(url).then(response => {
      setTotal(parseInt(response.headers.get('total') ?? '0'));
      return response.json();
    })
  );
  return (
    <Card
      style={{ height: '100%' }}
      title={
        <Space align={'center'}>
          <Input style={{ width: 240 }} prefix={<SearchOutlined />} placeholder="搜索电子邮件" />
          <Button type={'text'} icon={<ReloadOutlined />}></Button>
        </Space>
      }
      extra={
        <Space align={'center'}>
          <Button type="primary">新增</Button>
        </Space>
      }
    >
      <Table<User>
        rowKey={'id'}
        loading={isLoading}
        pagination={{
          current: pageIndex,
          total: total,
          onChange: (index, size) => {
            setPageIndex(index);
          }
        }}
        rowSelection={{ type: 'checkbox' }}
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
        dataSource={data}
      />
    </Card>
  );
}
