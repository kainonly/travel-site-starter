import { Layout, Nav, Button, Avatar } from '@douyinfe/semi-ui';
import {
  IconSemiLogo,
  IconBell,
  IconSetting,
  IconDesktop,
  IconTemplate,
  IconCalendar,
  IconComponent,
  IconServer,
} from '@douyinfe/semi-icons';

import { Outlet, useNavigate } from '@modern-js/runtime/router';

export default function AdminLayout() {
  const navigate = useNavigate();
  return (
    <>
      <Layout.Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <Nav
          mode="horizontal"
          defaultSelectedKeys={['Home']}
          header={{
            logo: <IconSemiLogo style={{ height: '36px', fontSize: 36 }} />,
            text: 'EnterConnect',
          }}
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
              <Avatar color="orange" size="small">
                ZT
              </Avatar>
            </>
          }
        />
      </Layout.Header>
      <Layout>
        <Layout.Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
          <Nav
            style={{ maxWidth: 240, height: '100%' }}
            defaultSelectedKeys={['overview']}
            items={[
              {
                itemKey: 'overview',
                text: '总览',
                icon: <IconDesktop size={'large'} />,
              },
              {
                itemKey: 'workflow',
                text: '计划任务',
                icon: <IconCalendar size={'large'} />,
              },
              {
                itemKey: 'connect',
                text: '连接器',
                icon: <IconComponent size={'large'} />,
              },
              {
                itemKey: 'template',
                text: '模板',
                icon: <IconTemplate size={'large'} />,
              },
              {
                itemKey: 'endpoint',
                text: '端点',
                icon: <IconServer size={'large'} />,
              },
              {
                itemKey: 'setting',
                text: '设置',
                icon: <IconSetting size="large" />,
              },
            ]}
            footer={{
              collapseButton: true,
            }}
            onClick={({ itemKey }) => {
              navigate(`/admin/${itemKey}`);
            }}
          />
        </Layout.Sider>
        <Layout.Content
          style={{
            padding: '24px',
            backgroundColor: 'var(--semi-color-bg-0)',
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </>
  );
}
