'use client';

import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { User } from '@prisma/client';
import { Button, Col, Form, Input, Row, Tag } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

import { WpxControl, WpxTable } from '@/components';
import { useModel } from '@/hooks/model';

export default function Page() {
  let query: AnyObject = {};
  const model = useModel<User>('user/query');
  const columns: ColumnsType<User> = [
    {
      key: 'full_name',
      title: 'Full Name',
      width: 240,
      render: (_, record) => (
        <>
          {record.first_name} {record.last_name}
        </>
      )
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: 180
      // filterMultiple: false,
      // filters: [
      //   { text: 'Male', value: 'male' },
      //   { text: 'Female', value: 'female' }
      // ],
      // onFilter: (value, record) => {
      //   return record.gender === value;
      // }
    },
    {
      key: 'detail',
      title: 'Job Detail',
      width: 420,
      render: (_, record) => (
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
  return (
    <WpxTable<User>
      model={model}
      columns={columns}
      search={
        <>
          <Form
            id={'search'}
            layout={'vertical'}
            form={form}
            onFinish={(data: any) => {
              query = {};
              if (data.first_name) {
                query['first_name'] = { contains: data.first_name };
              }
              if (data.last_name) {
                query['last_name'] = { contains: data.last_name };
              }
              model.setQuery(query);
            }}
            onReset={() => {
              model.setQuery({});
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
        </>
      }
      extra={
        <>
          <Button icon={<EllipsisOutlined />}></Button>
          <Button type="primary" icon={<PlusOutlined />}></Button>
        </>
      }
      controls={columns.map<WpxControl>(v => ({ key: v.key!, title: v.title as React.ReactNode }))}
      onKeyword={value => {
        query = {
          OR: [
            { first_name: { contains: value } },
            { last_name: { contains: value } },
            { job_title: { contains: value } }
          ]
        };
        model.setQuery(query);
      }}
    />
  );
}
