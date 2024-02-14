'use client';

import { PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Input, Space, Table, TableProps, Tag } from 'antd';
import React from 'react';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [];

const data: DataType[] = [];

export default function Page() {
  return (
    <Card
      style={{ height: '100%' }}
      title={
        <Space align={'center'}>
          <Input style={{ width: 240 }} prefix={<SearchOutlined />} placeholder="搜索流程名称" />
          <Button type={'text'} icon={<ReloadOutlined />}></Button>
        </Space>
      }
      extra={
        <Space align={'center'}>
          <Button type="primary">新增</Button>
        </Space>
      }
    >
      <Table columns={[{ title: '名称', width: 320 }, { title: '概况' }, { title: '', width: 60 }]} dataSource={[]} />
    </Card>
  );
}
