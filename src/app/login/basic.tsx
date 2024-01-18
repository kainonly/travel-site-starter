import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

type FieldType = {
  email?: string;
  password?: string;
};

export default function Basic() {
  return (
    <Form
      name="basic"
      layout="vertical"
      autoComplete="off"
      onFinish={(values: any) => {
        console.log('Success:', values);
      }}
      onFinishFailed={(errorInfo: any) => {
        console.log('Failed:', errorInfo);
      }}
    >
      <Form.Item<FieldType> name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input prefix={<UserOutlined />} type={'email'} placeholder={'电子邮件'} />
      </Form.Item>

      <Form.Item<FieldType> name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password prefix={<LockOutlined />} placeholder={'密码'} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" block={true} htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
