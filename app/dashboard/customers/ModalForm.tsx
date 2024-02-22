import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import React from 'react';

interface FormProps<T> {
  f: FormInstance<T>;
}

export function ModalForm<T>({ f }: FormProps<T>) {
  return (
    <Form layout={'vertical'} form={f} initialValues={{ gender: 0, balance: 0 }}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="First Name" name={'first_name'} required>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name" name={'last_name'} required>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email" name={'email'} required>
            <Input type={'email'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Phone" name={'phone'} required>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Gender" name={'gender'} required>
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
        <Col span={12}>
          <Form.Item label="Balance" name={'balance'}>
            <InputNumber style={{ width: '100%' }} prefix="$" min={0} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
