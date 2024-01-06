import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

type FormControl = {
  email?: string;
  password?: string;
};

export default function Basic() {
  return (
    <Form
      name={'basic'}
      layout={'vertical'}
      autoComplete={'off'}
      size={'large'}
      style={{ padding: '10px 0 0' }}
      onFinish={(values: any) => {
        console.log('Success:', values);
      }}
      onFinishFailed={(errorInfo: any) => {
        console.log('Failed:', errorInfo);
      }}
    >
      <Form.Item<FormControl>
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<UserOutlined />} type={'email'} placeholder={'Email'} />
      </Form.Item>

      <Form.Item<FormControl>
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
