'use client';

import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Customer, User } from '@prisma/client';
import { Button, Col, Form, Input, Row, Switch, Tag, Typography } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { AnyObject } from 'antd/lib/_util/type';
import { ColumnsType } from 'antd/lib/table';
import { format } from 'date-fns';
import React from 'react';

import { WpxControl, WpxTable } from '@/components';
import { useModel } from '@/hooks/model';

export default function Page() {
  let query: AnyObject = {};
  const model = useModel<Customer>('customers/query');
  const columns: ColumnsType<Customer> = [
    {
      key: 'name',
      title: 'Name',
      width: 320,
      // filterMultiple: false,
      // filters: [
      //   { text: 'Male', value: 'male' },
      //   { text: 'Female', value: 'female' }
      // ],
      // onFilter: (value, record) => {
      //   return record.gender === value;
      // }
      render: (_, record) => (
        <>
          <Tag bordered={false} color="blue">
            {record.gender}
          </Tag>
          <Typography.Text strong>
            {record.first_name} {record.last_name}
          </Typography.Text>
        </>
      )
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: 'Phone Number',
      key: 'phone',
      dataIndex: 'phone'
    },
    {
      title: 'Balance',
      key: 'balance',
      align: 'right',
      render: (_, record) => <>${record.balance}</>,
      sorter: true
    }
  ];
  const [form] = Form.useForm();
  return (
    <WpxTable<Customer>
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
        model.setQuery({
          OR: [
            { first_name: { contains: value } },
            { last_name: { contains: value } },
            { job_title: { contains: value } }
          ]
        });
      }}
      onSort={value => {
        const sort = { ...model.sort };
        const order = {
          descend: 'desc',
          ascend: 'asc'
        };
        if (!Array.isArray(value)) {
          const key = value.columnKey as string;
          if (value.order) {
            sort[key] = order[value.order];
          } else {
            delete sort[key];
          }
        }
        model.setSort(sort);
      }}
    />
  );
}
