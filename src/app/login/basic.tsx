import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import { basicSubmit, BasicData } from './actions';

export default function Basic() {
  return (
    <Form
      name="basic"
      layout="vertical"
      autoComplete="off"
      onFinish={async (data: BasicData) => {
        const result = await basicSubmit(data);
        console.log(result);
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
