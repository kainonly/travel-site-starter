import { Layout, Menu, MenuProps } from 'antd';
import React from 'react';

const menus: MenuProps['items'] = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`
}));

export default function Home() {
  return (
    <Layout>
      <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={menus}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Layout.Header>
    </Layout>
  );
}
