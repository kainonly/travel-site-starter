import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, Layout } from 'antd';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Connecting'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{ components: { Layout: { headerBg: '#fff', headerHeight: 60, headerPadding: '0 12px' } } }}
          >
            <Layout style={{ height: '100%' }}>{children}</Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
