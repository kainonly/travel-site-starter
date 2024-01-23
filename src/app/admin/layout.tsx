'use client';

import {
  AntDesignOutlined,
  DesktopOutlined,
  LogoutOutlined,
  ProjectOutlined,
  ScheduleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Col, Dropdown, Layout, Menu, Row } from 'antd';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

import { logout } from '@/app/admin/actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { Header, Content } = Layout;
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  return (
    <>
      <Header style={{ borderBottom: '1px solid #f0f0f0' }}>
        <Row justify={'space-between'} align={'middle'}>
          <Col>
            <Menu
              style={{ height: '100%', borderRight: 0 }}
              mode={'horizontal'}
              defaultSelectedKeys={[segment as string]}
              items={[
                { key: 'index', label: '工作台', icon: <DesktopOutlined /> },
                { key: 'flow', label: '流程', icon: <ProjectOutlined /> },
                { key: 'log', label: '日志', icon: <ScheduleOutlined /> },
                { key: 'setting', label: '设置', icon: <SettingOutlined /> }
              ]}
              onSelect={({ key }) => {
                router.push(`/admin/${key}`);
              }}
            />
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
      <Content style={{ padding: 16 }}>{children}</Content>
    </>
  );
}
