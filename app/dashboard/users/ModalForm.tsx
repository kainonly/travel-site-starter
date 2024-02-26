import { Col, Form, Input, Row, Switch, Tabs, Upload } from 'antd';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import React from 'react';

interface FormProps<T> {
  f: FormInstance<T>;
}

export function ModalForm<T>({ f }: FormProps<T>) {
  return (
    <Form layout={'vertical'} form={f} initialValues={{ status: true }}>
      <Tabs
        items={[
          {
            key: 'basic',
            label: 'Basic',
            children: (
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="Email" name={'email'} required>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Password" name={'password'} required>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Name" name={'name'}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone" name={'phone'}>
                    <Input />
                  </Form.Item>
                </Col>
                {/*<Col span={12}>*/}
                {/*  <Form.Item label="Avatar" name={'avatar'}>*/}
                {/*<Upload*/}
                {/*  name="avatar"*/}
                {/*  listType="picture-card"*/}
                {/*  className="avatar-uploader"*/}
                {/*  showUploadList={false}*/}
                {/*  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"*/}
                {/*  beforeUpload={beforeUpload}*/}
                {/*  onChange={handleChange}*/}
                {/*>*/}
                {/*  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}*/}
                {/*</Upload>*/}
                {/*</Form.Item>*/}
                {/*</Col>*/}

                <Col span={12}>
                  <Form.Item label="Status" name={'status'}>
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            )
          },
          {
            key: 'roles',
            label: 'Roles',
            children: <></>
          }
        ]}
      />
    </Form>
  );
}
