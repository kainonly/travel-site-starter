import { Link, Outlet } from '@modern-js/runtime/router';
import { Avatar, Breadcrumb, Button, Layout, Nav } from '@douyinfe/semi-ui';
import {
  IconBell,
  IconBytedanceLogo,
  IconHelpCircle,
  IconHistogram,
  IconHome,
  IconLive,
  IconSemiLogo,
  IconSetting,
} from '@douyinfe/semi-icons';
import './global.css';

export default () => {
  return (
    <Layout
      style={{ height: '100%', border: '1px solid var(--semi-color-border)' }}
    >
      <Layout.Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <Nav
          defaultSelectedKeys={['Home']}
          style={{ maxWidth: 220, height: '100%' }}
          items={[
            { itemKey: 'Home', text: '首页', icon: <IconHome size="large" /> },
            {
              itemKey: 'Histogram',
              text: '基础数据',
              icon: <IconHistogram size="large" />,
            },
            {
              itemKey: 'users',
              text: '团队成员',
              icon: <IconLive size="large" />,
            },
            {
              itemKey: 'Setting',
              text: '设置',
              icon: <IconSetting size="large" />,
            },
          ]}
          header={{
            logo: <IconSemiLogo style={{ fontSize: 36 }} />,
            text: 'Semi Design',
          }}
          footer={{
            collapseButton: true,
          }}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
          <Nav
            mode="horizontal"
            footer={
              <>
                <Button
                  theme="borderless"
                  icon={<IconBell size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                />
                <Button
                  theme="borderless"
                  icon={<IconHelpCircle size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                />
                <Avatar color="orange" size="small">
                  YJ
                </Avatar>
              </>
            }
          />
        </Layout.Header>
        <Layout.Content
          style={{
            padding: '24px',
            backgroundColor: 'var(--semi-color-bg-0)',
          }}
        >
          <Breadcrumb
            style={{
              marginBottom: '24px',
            }}
            routes={['首页', '详情页']}
          />
          <Outlet />
        </Layout.Content>
        <Layout.Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: 'var(--semi-color-text-2)',
            backgroundColor: 'rgba(var(--semi-grey-0), 1)',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconBytedanceLogo size="large" style={{ marginRight: '8px' }} />
            <span>Copyright © 2019 ByteDance. All Rights Reserved. </span>
          </span>
          <span>
            <span style={{ marginRight: '24px' }}>平台客服</span>
            <span>反馈建议</span>
          </span>
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};
