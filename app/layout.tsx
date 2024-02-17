import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App, ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next LAB'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            locale={zhCN}
            theme={{
              components: { Layout: { headerBg: '#fff', headerPadding: '0 16px' } }
            }}
          >
            <App style={{ height: '100%' }}>
              <Layout style={{ height: '100%' }}>{children}</Layout>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
