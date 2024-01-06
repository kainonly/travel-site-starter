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
      <Layout.Header
        style={{
          padding: '0 12px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Row justify={'space-between'} align="middle">
          <Col />
          <Col />
          <Col />
        </Row>
      </Layout.Header>
      <Layout>
        <Layout.Sider
          width={300}
          style={{ background: colorBgContainer, padding: '12px' }}
        >
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
        <Layout style={{ padding: '12px', overflowY: 'auto' }}>
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
