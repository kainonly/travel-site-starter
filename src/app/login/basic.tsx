import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';

import { basicSubmit, BasicData } from './actions';

export default function Basic() {
  const router = useRouter();
  const { notification } = App.useApp();

  return (
    <Form
      name="basic"
      layout="vertical"
      autoComplete="off"
      onFinish={async (data: BasicData) => {
        if (await basicSubmit(data)) {
          notification.success({ message: '登录成功' });
          router.push('/admin');
        }
      }}
    >
      <Form.Item<BasicData> name="email" rules={[{ required: true, message: '电子邮件不能为空' }]}>
        <Input prefix={<UserOutlined />} type={'email'} placeholder={'电子邮件'} />
      </Form.Item>

      <Form.Item<BasicData> name="password" rules={[{ required: true, message: '密码不能为空' }]}>
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
