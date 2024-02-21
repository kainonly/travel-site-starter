'use client';

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  PlusOutlined
} from '@ant-design/icons';
import { Customer } from '@prisma/client';
import { App, Button, Col, Form, Input, Row, Tag, Typography } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

import { WpxControl, WpxTable } from '@/components';
import { useModel } from '@/hooks/model';

export default function Page() {
  const { modal } = App.useApp();
  const model = useModel<Customer>('customers/query');
  const columns: ColumnsType<Customer> = [
    {
      key: 'name',
      title: 'Name',
      width: 320,
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
              let query: AnyObject = {};
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
      actions={record => [
        { key: `edit:${record.id}`, label: 'Edit', icon: <EditOutlined /> },
        {
          key: `delete:${record.id}`,
          label: 'Delete',
          icon: <DeleteOutlined />,
          onClick: () => {
            modal.confirm({
              title: 'Are you sure delete this?',
              icon: <ExclamationCircleFilled />,
              content: `${record.first_name} ${record.last_name}`,
              okText: 'Yes',
              okType: 'danger',
              cancelText: 'No',
              onOk: () => {
                model.mutate();
                console.log('ok');
              }
            });
          }
        }
      ]}
      controls={columns.map<WpxControl>(v => ({ key: v.key!, title: v.title as React.ReactNode }))}
      onKeyword={value => {
        model.setQuery({ OR: [{ first_name: { contains: value } }, { last_name: { contains: value } }] });
      }}
    />
  );
}
