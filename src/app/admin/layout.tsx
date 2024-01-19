'use client';

import {
  AntDesignOutlined,
  AppstoreAddOutlined,
  DesktopOutlined,
  ProjectOutlined,
  ScheduleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Layout, Menu, Popover, Row, Space } from 'antd';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

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
            <Popover title="个人中心" content={<div></div>} arrow={false}>
              <a style={{ display: 'block', padding: '0 12px' }}>
                <Badge count={5}>
                  <Avatar shape={'square'} size={32} icon={<AntDesignOutlined />} />
                </Badge>
              </a>
            </Popover>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: 16 }}>{children}</Content>
    </>
  );
}
