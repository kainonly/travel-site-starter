import {
  CopyrightOutlined,
  GithubOutlined,
  GoogleOutlined,
  SelectOutlined,
  StarOutlined,
  WindowsOutlined,
} from '@ant-design/icons';
import { Button, Divider, Layout, Row, Space, Tabs, Typography } from 'antd';

import styles from './styles.module.css';
import Basic from './basic';
import Sms from '@/routes/login/sms';

export default () => {
  return (
    <>
      <Layout.Header style={{ background: '#fff' }}>
        <Button type="text" icon={<StarOutlined />}>
          <b>Star</b>
        </Button>
      </Layout.Header>
      <Layout.Content className={styles.content}>
        <Row style={{ minHeight: '80%' }} justify="center" align="middle">
          <div style={{ minWidth: '360px' }}>
            <Typography.Title level={2}>SIGN IN</Typography.Title>
            <Tabs
              items={[
                { key: 'basic', label: 'BASIC', children: <Basic /> },
                { key: 'sms', label: 'SMS', children: <Sms /> },
              ]}
            />
            <Divider plain style={{ marginTop: 0 }}>
              Or
            </Divider>
            <Space>
              <Button type="text" icon={<WindowsOutlined />} />
              <Button type="text" icon={<GoogleOutlined />} />
              <Button type="text" icon={<GithubOutlined />} />
            </Space>
          </div>
        </Row>
      </Layout.Content>
      <Layout.Footer className={styles.footer}>
        <Space direction="vertical">
          <Typography.Link style={{ color: 'rgba(0, 0, 0, 0.85)' }} strong>
            <span>BSD-3-Clause License </span>
            <SelectOutlined />
          </Typography.Link>
          <Typography.Text strong>
            Copyright <CopyrightOutlined /> 2024. Open Source Connector by Kain.
          </Typography.Text>
        </Space>
      </Layout.Footer>
    </>
  );
};
