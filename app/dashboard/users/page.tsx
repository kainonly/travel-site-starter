'use client';

import { EllipsisOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { User } from '@prisma/client';
import { App, Button, Card, List } from 'antd';
import React from 'react';

import { ModalForm } from '@/app/dashboard/users/ModalForm';
import { SearchForm } from '@/app/dashboard/users/SearchForm';
import { WpxList } from '@/components/WpxList';
import { WpxToolbox } from '@/components/WpxToolbox';
import { useDataSource, useModalForm } from '@/hooks';

import { bulkDel, create, del, update } from './actions';

export default function Page() {
  const { message, modal } = App.useApp();
  const ds = useDataSource<User>('users/query');
  const modalForm = useModalForm<User>(f => <ModalForm f={f} />);
  return (
    <Card>
      <WpxToolbox
        dataSource={ds}
        keywords={{
          placeholder: 'Email / Name',
          onSearch: value => {
            ds.setWhere({ OR: [{ email: { contains: value } }, { name: { contains: value } }] });
          }
        }}
        search={SearchForm({ ds })}
        extra={
          <>
            <Button icon={<EllipsisOutlined />}></Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() =>
                modalForm.open({
                  title: 'Create',
                  width: 800,
                  onSubmit: data =>
                    new Promise(async resolve => {
                      await create(data);
                      ds.mutate();
                      resolve();
                    })
                })
              }
            ></Button>
          </>
        }
        bulk={[
          {
            key: 'delete',
            danger: true,
            label: (
              <a
                onClick={() => {
                  modal.confirm({
                    title: 'Are you sure delete these?',
                    icon: <ExclamationCircleFilled />,
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk: async () => {
                      await bulkDel(ds.selection as number[]);
                      message.success('Deletion successful');
                      ds.clearSelection();
                      ds.mutate();
                    }
                  });
                }}
              >
                Bulk Delete
              </a>
            )
          }
        ]}
      />
      <WpxList<User>
        dataSource={ds}
        renderItem={(item, index) => {
          return <List.Item>{item.email}</List.Item>;
        }}
      ></WpxList>
    </Card>
  );
}
