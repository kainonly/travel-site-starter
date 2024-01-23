import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';

import { basicSubmit, BasicDto } from './actions';

export default function Basic() {
  const router = useRouter();
  const { message } = App.useApp();

  return (
    <Form
      name="basic"
      layout="vertical"
      autoComplete="off"
      onFinish={async (data: BasicDto) => {
        if (!(await basicSubmit(data))) {
          message.error({ content: '登录失败，用户名或密码不正确！' });
          return;
        }
        message.success({ content: '登录成功，正在加载数据~' });
        router.push('/admin');
      }}
    >
      <Form.Item<BasicDto> name="email" rules={[{ required: true, message: '电子邮件不能为空' }]}>
        <Input prefix={<UserOutlined />} type={'email'} placeholder={'电子邮件'} />
      </Form.Item>

      <Form.Item<BasicDto> name="password" rules={[{ required: true, message: '密码不能为空' }]}>
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
