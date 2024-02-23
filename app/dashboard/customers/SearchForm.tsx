import { Customer } from '@prisma/client';
import { Col, Form, Input, Row, Select } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import React from 'react';

import { WpxDataSource } from '@/hooks';

interface FormProps<T> {
  ds: WpxDataSource<T>;
}

export function SearchForm({ ds }: FormProps<Customer>) {
  const [form] = Form.useForm();
  return (
    <Form
      id={'search'}
      layout={'vertical'}
      form={form}
      onFinish={(data: any) => {
        let where: AnyObject = {};
        if (data.gender !== undefined) {
          where['gender'] = data.gender;
        }
        if (data.first_name) {
          where['first_name'] = { contains: data.first_name };
        }
        if (data.last_name) {
          where['last_name'] = { contains: data.last_name };
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
          <Form.Item label="Gender" name={'gender'}>
            <Select
              style={{ width: '100%' }}
              options={[
                { value: 0, label: 'Privacy' },
                { value: 1, label: 'Male' },
                { value: 2, label: 'Female' }
              ]}
            />
          </Form.Item>
        </Col>
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
        <Col span={6}>
          <Form.Item label="Phone Number" name={'phone'}>
            <Input placeholder="" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
