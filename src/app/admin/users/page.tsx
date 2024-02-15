import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { User } from '@prisma/client';
import { Button, Card, Input, Space, Table, TableProps } from 'antd';
import React from 'react';

import { getData } from '@/app/admin/users/data';

export default async function Page() {
  const data = await getData();
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
      <Table
        rowKey={'id'}
        rowSelection={{ type: 'checkbox' }}
        columns={[{ title: '电子邮件', dataIndex: 'email', width: 320 }, { title: '概况' }, { title: '', width: 60 }]}
        dataSource={data}
      />
    </Card>
  );
}
