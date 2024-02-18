'use client';

import {
  AntDesignOutlined,
  BulbOutlined,
  DesktopOutlined,
  LogoutOutlined,
  ProjectOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Col, Dropdown, Input, Layout, Menu, Row, Space, theme } from 'antd';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

import { logout } from '@/app/dashboard/actions';

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
        <Sider style={{ background: colorBgContainer, padding: 8 }} width={256}>
          <Menu
            style={{ height: '100%', borderRight: 0 }}
            mode={'inline'}
            defaultSelectedKeys={[segment as string]}
            items={[
              { key: 'index', label: '工作台', icon: <DesktopOutlined /> },
              { key: 'order', label: '订单管理', icon: <ProjectOutlined /> },
              { key: 'product', label: '产品管理', icon: <ShoppingOutlined /> },
              { key: 'user', label: '会员管理', icon: <TeamOutlined /> },
              { type: 'divider' },
              { key: 'setting', label: '设置', icon: <SettingOutlined /> }
            ]}
            onSelect={({ key }) => {
              router.push(`/dashboard/${key}`);
            }}
          />
        </Sider>
        <Layout>
          <Content style={{ padding: 24, overflowX: 'hidden' }}>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
}
