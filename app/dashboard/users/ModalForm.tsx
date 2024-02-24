import { Col, Form, Input, Row, Switch } from 'antd';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import React from 'react';

interface FormProps<T> {
  f: FormInstance<T>;
}

export function ModalForm<T>({ f }: FormProps<T>) {
  return (
    <Form layout={'vertical'} form={f} initialValues={{ status: true }}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Email" name={'email'} required>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Name" name={'name'} required>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Phone" name={'phone'} required>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Status" name={'status'}>
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
