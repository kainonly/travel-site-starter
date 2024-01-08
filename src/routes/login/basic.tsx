import { Button, Form } from '@douyinfe/semi-ui';
import { IconLock, IconMail } from '@douyinfe/semi-icons';

export default function Basic() {
  return (
    <Form
      name={'basic'}
      layout={'vertical'}
      autoComplete={'off'}
      onSubmit={values => {
        console.log(values);
      }}
    >
      <Form.Input
        noLabel
        field="email"
        type={'email'}
        placeholder={'电子邮件'}
        prefix={<IconMail />}
        rules={[{ required: true, message: '电子邮件不能为空' }]}
      />

      <Form.Input
        noLabel
        field="password"
        mode="password"
        placeholder={'密码'}
        prefix={<IconLock />}
        rules={[{ required: true, message: '密码不能为空' }]}
      />

      <Button type="primary" block={true} htmlType="submit">
        开始
      </Button>
    </Form>
  );
}
