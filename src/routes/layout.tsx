import { Outlet } from '@modern-js/runtime/router';
import { ConfigProvider, Layout, theme } from 'antd';

import './globals.css';

export default function RootLayout() {
  return (
    <ConfigProvider
      theme={{
        token: { borderRadius: 0 },
        components: {
          Layout: {
            headerBg: '#fff',
            headerHeight: 60,
            headerPadding: '0 12px',
          },
        },
        algorithm: [theme.compactAlgorithm],
      }}
    >
      <Layout style={{ height: '100%' }}>
        <Outlet />
      </Layout>
    </ConfigProvider>
  );
}
