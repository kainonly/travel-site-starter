import { IconBell, IconHelpCircle, IconSemiLogo } from '@douyinfe/semi-icons';
import { Avatar, Button, Nav, Layout } from '@douyinfe/semi-ui';
import React from 'react';

const Index: React.FC = () => {
  return (
    <>
      <Layout.Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
          <Nav.Header>
            <IconSemiLogo style={{ height: '36px', fontSize: 36 }} />
          </Nav.Header>
          <Nav.Footer>
            <Button
              theme="borderless"
              icon={<IconBell size="large" />}
              style={{
                color: 'var(--semi-color-text-2)',
                marginRight: '12px'
              }}
            />
            <Button
              theme="borderless"
              icon={<IconHelpCircle size="large" />}
              style={{
                color: 'var(--semi-color-text-2)',
                marginRight: '12px'
              }}
            />
            <Avatar color="orange" size="small">
              YJ
            </Avatar>
          </Nav.Footer>
        </Nav>
      </Layout.Header>
      <Layout>asd</Layout>
    </>
  );
};

export default Index;
