import {
  Button,
  Divider,
  Layout,
  Space,
  TabPane,
  Tabs,
  Typography,
} from '@douyinfe/semi-ui';
import { IconFeishuLogo, IconGithubLogo } from '@douyinfe/semi-icons';
import Basic from '@/routes/login/basic';
import Sms from '@/routes/login/sms';

export default () => {
  return (
    <>
      <Layout.Content style={{ verticalAlign: 'middle' }}>
        <div style={{ maxWidth: 360, margin: '7% auto 0' }}>
          <Typography.Title heading={2}>欢迎使用</Typography.Title>
          <Tabs type="line">
            <TabPane tab="管理账户" itemKey="basic">
              <Basic />
            </TabPane>
            <TabPane tab="短信" itemKey="sms">
              <Sms />
            </TabPane>
          </Tabs>
          <Divider margin="12px">第三方免登</Divider>
          <Space>
            <Button icon={<IconGithubLogo />} theme={'borderless'} />
            <Button icon={<IconFeishuLogo />} theme={'borderless'} />
          </Space>
        </div>
      </Layout.Content>
      <Layout.Footer
        style={{
          width: '100%',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <Space vertical>
          <Typography.Text strong>
            <span>BSD-3-Clause License </span>
          </Typography.Text>
          <Typography.Text strong>
            Copyright © 2024. Open Source EnterConnect by Kain.
          </Typography.Text>
        </Space>
      </Layout.Footer>
    </>
  );
};
