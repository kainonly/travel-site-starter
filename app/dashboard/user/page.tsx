'use client';

import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { User } from '@prisma/client';
import { Button, Col, Form, Input, Row, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

import { WpxControl, WpxTable } from '@/components';
import { useModel } from '@/hooks/model';

export default function Page() {
  const model = useModel<User>('user/query');
  const columns: ColumnsType<User> = [
    {
      key: 'full_name',
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
      key: 'detail',
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
    }
  ];
  const [form] = Form.useForm();
  const search = (
    <Form
      id={'search'}
      layout={'vertical'}
      form={form}
      onFinish={(data: any) => {
        console.log(data);
      }}
    >
      <Row align={'middle'} gutter={[24, 12]}>
        <Col span={6}>
          <Form.Item label="First Name" name={'first_name'}>
            <Input placeholder="" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Last Name" name={'last_name'}>
            <Input placeholder="" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
  return (
    <WpxTable<User>
      model={model}
      search={search}
      keyword={value => ({
        OR: [
          { first_name: { contains: value } },
          { last_name: { contains: value } },
          { job_title: { contains: value } }
        ]
      })}
      extra={
        <>
          <Button icon={<EllipsisOutlined />}></Button>
          <Button type="primary" icon={<PlusOutlined />}></Button>
        </>
      }
      columns={columns}
      controls={columns.map<WpxControl>(v => ({ key: v.key!, title: v.title as React.ReactNode }))}
    />
  );
}
