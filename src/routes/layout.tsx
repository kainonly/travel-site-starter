import { Outlet } from '@modern-js/runtime/router';

import { Layout, ConfigProvider } from '@douyinfe/semi-ui';

import './globals.css';

export default function RootLayout() {
  return (
    <ConfigProvider>
      <Layout style={{ height: '100%' }}>
        <Outlet />
      </Layout>
    </ConfigProvider>
  );
}
