import { User } from '@prisma/client';
import { Col, Form, Input, Row } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import React from 'react';

import { WpxDataSource } from '@/hooks';

interface FormProps<T> {
  ds: WpxDataSource<T>;
}

export function SearchForm({ ds }: FormProps<User>) {
  const [form] = Form.useForm();
  return (
    <Form
      id={'search'}
      layout={'vertical'}
      form={form}
      onFinish={(data: any) => {
        let where: AnyObject = {};
        if (data.email) {
          where['email'] = data.email;
        }
        if (data.name) {
          where['name'] = data.name;
        }
        if (data.phone) {
          where['phone'] = data.phone;
        }
        ds.setWhere(where);
      }}
      onReset={() => {
        ds.setWhere({});
      }}
    >
      <Row align={'middle'} gutter={[24, 12]}>
        <Col span={6}>
          <Form.Item label="Email" name={'email'}>
            <Input placeholder="" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Name" name={'name'}>
            <Input placeholder="" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Phone Number" name={'phone'}>
            <Input placeholder="" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
