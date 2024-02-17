import { LockOutlined } from '@ant-design/icons';
import { App, Button, Col, Form, Input, Row, Select } from 'antd';
import { useRouter } from 'next/navigation';

import { SmsDto, smsSubmit } from '@/app/login/actions';

export default function Sms() {
  const router = useRouter();
  const { message } = App.useApp();

  return (
    <Form
      name="sms"
      layout="vertical"
      autoComplete="off"
      initialValues={{ area: '86' }}
      onFinish={async (data: SmsDto) => {
        if (!(await smsSubmit(data))) {
          message.error({ content: '登录失败，用户名或密码不正确！' });
          return;
        }
        message.success({ content: '登录成功，正在加载数据~' });
        router.push('/');
      }}
    >
      <Form.Item<SmsDto> name="phone" rules={[{ required: true, message: '手机号码不能为空' }]}>
        <Input
          style={{ width: '100%' }}
          addonBefore={
            <Form.Item name="area" noStyle>
              <Select style={{ width: 80 }}>
                <Select.Option value="86">+86</Select.Option>
                <Select.Option value="87">+87</Select.Option>
              </Select>
            </Form.Item>
          }
          placeholder={'手机号码'}
        />
      </Form.Item>

      <Form.Item<SmsDto>>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item<SmsDto> name="captcha" noStyle rules={[{ required: true, message: '验证码不能为空' }]}>
              <Input prefix={<LockOutlined />} placeholder={'验证码'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>获取</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button type="primary" block={true} htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
