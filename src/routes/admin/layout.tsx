'use client';

import {
  DesktopOutlined,
  ScheduleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Col, Layout, Menu, Row, theme } from 'antd';

import { Outlet } from '@modern-js/runtime/router';
import styles from './styles.module.css';

export default function AdminLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout.Header className={styles.header}>
        <Row justify="space-between" align="middle">
          <Col />
          <Col />
          <Col />
        </Row>
      </Layout.Header>
      <Layout>
        <Layout.Sider width={240} className={styles.nav}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              { key: 'index', label: 'Workbench', icon: <DesktopOutlined /> },
              {
                key: 'workflow',
                label: 'Workflow',
                icon: <ScheduleOutlined />,
              },
              { type: 'divider' },
              { key: 'setting', label: 'Setting', icon: <SettingOutlined /> },
            ]}
          />
        </Layout.Sider>
        <Layout style={{ padding: '6px' }}>
          <Layout.Content
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}
