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
      <Form.Item<FieldType>
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<UserOutlined />} type={'email'} placeholder={'Email'} />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder={'Password'} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" block={true} htmlType="submit">
          Go
        </Button>
      </Form.Item>
    </Form>
  );
}
