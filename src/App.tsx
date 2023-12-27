import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { ConfigProvider, Layout, Menu, MenuProps, theme } from 'antd';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`
      };
    })
  };
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>
  }
]);

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <ConfigProvider>
      <Layout style={{ height: '100%', overflow: 'hidden' }}>
        <Layout.Header
          style={{ display: 'flex', alignItems: 'center', background: '#fff', borderBottom: '1px solid #f0f0f0' }}
        ></Layout.Header>

        <Layout>
          <Layout.Sider width={240} style={{ background: colorBgContainer, borderRight: '1px solid #f0f0f0' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
            />
          </Layout.Sider>
          <Layout style={{ padding: '24px' }}>
            <Layout.Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG
              }}
            >
              <RouterProvider router={router} />
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
