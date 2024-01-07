import { Outlet } from '@modern-js/runtime/router';
import { ConfigProvider, Layout } from 'antd';

import './globals.css';

export default function RootLayout() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#fff',
          },
        },
      }}
    >
      <Layout style={{ height: '100%' }}>
        <Outlet />
      </Layout>
    </ConfigProvider>
  );
}
