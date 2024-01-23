'use client';

import {
  AntDesignOutlined,
  BulbOutlined,
  ClusterOutlined,
  DesktopOutlined,
  LogoutOutlined,
  ProjectOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Col, Dropdown, Input, Layout, Menu, Row, Space, theme } from 'antd';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

import { logout } from '@/app/admin/actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  return (
    <>
      <Header style={{ borderBottom: '1px solid #f0f0f0' }}>
        <Row justify={'space-between'} align={'middle'}>
          <Col>
            <Input prefix={<BulbOutlined />} placeholder="有问题尽管问我..." variant="borderless" />
          </Col>
          <Col></Col>
          <Col>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'exit',
                    label: '退出登录',
                    icon: <LogoutOutlined />,
                    onClick: async () => {
                      await logout();
                      router.push('/login');
                    }
                  }
                ]
              }}
            >
              <a style={{ display: 'block', padding: '0 12px' }}>
                <Badge count={5}>
                  <Avatar shape={'square'} size={32} icon={<AntDesignOutlined />} />
                </Badge>
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider style={{ background: colorBgContainer }} width={240}>
          <Menu
            style={{ height: '100%', borderRight: 0 }}
            mode={'inline'}
            defaultSelectedKeys={[segment as string]}
            items={[
              { key: 'index', label: '工作台', icon: <DesktopOutlined /> },
              { key: 'flows', label: '我的流程', icon: <ProjectOutlined /> },
              { key: 'endpoints', label: '服务端点', icon: <ClusterOutlined /> },
              { type: 'divider' },
              { key: 'users', label: '团队成员', icon: <TeamOutlined /> },
              { key: 'setting', label: '设置', icon: <SettingOutlined /> }
            ]}
            onSelect={({ key }) => {
              router.push(`/admin/${key}`);
            }}
          />
        </Sider>
        <Layout>
          <Content style={{ padding: 16 }}>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
}
