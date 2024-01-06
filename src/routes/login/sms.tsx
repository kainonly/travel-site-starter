import { Button, Col, Form, Input, Row, Select, Space } from 'antd';

export default function Sms() {
  return (
    <Form
      name={'sms'}
      layout={'vertical'}
      autoComplete={'off'}
      size={'large'}
      style={{ padding: '10px 0 0' }}
      initialValues={{ area: '+86' }}
      onFinish={(values: any) => {
        console.log('Success:', values);
      }}
      onFinishFailed={(errorInfo: any) => {
        console.log('Failed:', errorInfo);
      }}
    >
      <Form.Item>
        <Space.Compact>
          <Form.Item name={'area'} noStyle>
            <Select style={{ width: '30%' }}>
              <Select.Option value="+86">+86</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={'phone'} noStyle>
            <Input style={{ width: '70%' }} placeholder={'Phone Number'} />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the verification code you got!',
                },
              ]}
            >
              <Input placeholder={'Verification Code'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Send</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button type="primary" block={true} htmlType="submit">
          Go
        </Button>
      </Form.Item>
    </Form>
  );
}
