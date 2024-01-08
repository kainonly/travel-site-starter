import { Button, Form, Space } from '@douyinfe/semi-ui';

export default function Sms() {
  return (
    <Form
      name={'sms'}
      layout={'vertical'}
      autoComplete={'off'}
      labelPosition={'inset'}
      onSubmit={values => {
        console.log(values);
      }}
    >
      <Form.InputGroup style={{ width: '100%' }}>
        <Form.Select
          style={{ width: '30%' }}
          noLabel
          field="area"
          initValue="+86"
          showClear
          rules={[{ required: true, message: '区号不能为空' }]}
        >
          <Form.Select.Option value="+1">美国+1</Form.Select.Option>
          <Form.Select.Option value="+852">香港+852</Form.Select.Option>
          <Form.Select.Option value="+86">中国+86</Form.Select.Option>
          <Form.Select.Option value="+81">日本+81</Form.Select.Option>
        </Form.Select>
        <Form.Input
          style={{ width: '70%' }}
          label="手机号"
          field="phone"
          showClear
          rules={[{ required: true, message: '手机号码不能为空' }]}
        />
      </Form.InputGroup>

      <Space>
        <Form.Input
          label="验证码"
          field="captcha"
          rules={[
            {
              required: true,
              message: '验证码不能为空',
            },
          ]}
        />
        <Button>获取</Button>
      </Space>

      <Button type="primary" block={true} htmlType="submit">
        开始
      </Button>
    </Form>
  );
}
