import { Layout } from '@douyinfe/semi-ui';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Index from './Index.tsx';
import Login from './Login.tsx';

const App: React.FC = () => {
  return (
    <Layout style={{ height: '100%', border: '1px solid var(--semi-color-border)' }}>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: '/',
            element: <Index />
          },
          {
            path: '/login',
            element: <Login />
          }
        ])}
      />
    </Layout>
  );
};

export default App;
