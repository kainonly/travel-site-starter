'use client';

import {
  AntDesignOutlined,
  AppstoreOutlined,
  DesktopOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Breadcrumb, Button, Col, Divider, Dropdown, Layout, Menu, Row, Space, theme } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

import { logout } from '@/app/dashboard/actions';

const { Header, Sider, Content } = Layout;
const menus: ItemType[] = [
  { key: 'index', label: '工作台', icon: <DesktopOutlined /> },
  { key: 'order', label: '订单管理', icon: <ProjectOutlined /> },
  { key: 'product', label: '产品管理', icon: <ShoppingOutlined /> },
  { key: 'user', label: '会员管理', icon: <TeamOutlined /> },
  { type: 'divider' },
  { key: 'setting', label: '设置', icon: <SettingOutlined /> }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  return (
    <>
      <Header style={{ borderBottom: '1px solid #f0f0f0' }}>
        <Row justify={'space-between'} align={'middle'}>
          <Col>
            <Space align={'center'}>
              <Button type={'text'} icon={<AppstoreOutlined />}></Button>
              <Divider type="vertical" />
              <Breadcrumb
                style={{ padding: '12px 0' }}
                items={[
                  {
                    title: <HomeOutlined />,
                    href: ''
                  },
                  {
                    title: 'User'
                  }
                ]}
              />
            </Space>
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
            mode={'inline'}
            style={{ height: '100%', borderRight: 0 }}
            items={menus}
            defaultSelectedKeys={[segment as string]}
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
