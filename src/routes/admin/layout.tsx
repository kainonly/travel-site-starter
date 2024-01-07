'use client';

import {
  ApiOutlined,
  AppstoreAddOutlined,
  DeploymentUnitOutlined,
  DesktopOutlined,
  PlusOutlined,
  ScheduleOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Layout, Menu, Row, theme } from 'antd';

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
          padding: '0 16px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Row justify={'space-between'} align="middle">
          <Col>
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={() => {
                // message.success('Success!');
              }}
            >
              Create Workflow
            </Button>
          </Col>
          <Col />
          <Col>
            <div className={styles.center}>
              <Badge dot>
                <Avatar shape="square" icon={<UserOutlined />} />
              </Badge>
            </div>
          </Col>
        </Row>
      </Layout.Header>
      <Layout>
        <Layout.Sider
          width={240}
          style={{ background: colorBgContainer, padding: '12px' }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              { key: 'overview', label: 'Overview', icon: <DesktopOutlined /> },
              {
                key: 'workflow',
                label: 'Workflow',
                icon: <ScheduleOutlined />,
              },
              {
                key: 'connect',
                label: 'Connect',
                icon: <ApiOutlined />,
              },
              {
                key: 'template',
                label: 'Template',
                icon: <ThunderboltOutlined />,
              },
              { type: 'divider' },
              {
                key: 'endpoint',
                label: 'Endpoint',
                icon: <DeploymentUnitOutlined />,
              },
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
