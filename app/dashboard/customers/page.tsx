'use client';

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  PlusOutlined
} from '@ant-design/icons';
import { Customer } from '@prisma/client';
import { App, Badge, Button, Card, Tag, Typography } from 'antd';
import React from 'react';

import { ModalForm } from '@/app/dashboard/customers/ModalForm';
import { SearchForm } from '@/app/dashboard/customers/SearchForm';
import { bulkDel, create, del, update } from '@/app/dashboard/customers/actions';
import { WpxTable } from '@/components';
import { WpxToolbox } from '@/components/WpxToolbox';
import { useDataSource, useModalForm } from '@/hooks';

export default function Page() {
  const { message, modal } = App.useApp();
  const ds = useDataSource<Customer>('customers/query');
  const gender = new Map([
    [0, 'Privacy'],
    [1, 'Male'],
    [2, 'Female']
  ]);
  const modalForm = useModalForm<Customer>(f => <ModalForm f={f} />);
  return (
    <Card>
      <WpxToolbox
        dataSource={ds}
        keywords={{
          placeholder: 'Customer Name',
          onSearch: value => {
            ds.setWhere({ OR: [{ first_name: { contains: value } }, { last_name: { contains: value } }] });
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
      <WpxTable<Customer>
        dataSource={ds}
        columns={[
          {
            title: 'Name',
            key: 'name',
            width: 320,
            render: (_, record) => (
              <>
                <Tag bordered={false} color="blue">
                  {gender.get(record.gender!)}
                </Tag>
                <Typography.Text strong>
                  {record.first_name} {record.last_name}
                </Typography.Text>
              </>
            )
          },
          {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
          },
          {
            title: 'Phone Number',
            key: 'phone',
            dataIndex: 'phone'
          },
          {
            title: 'Status',
            key: 'status',
            width: 120,
            render: (_, record) =>
              record.status ? (
                <Badge status="processing" text="Availability" />
              ) : (
                <Badge status="default" text="Suspended" />
              )
          },
          {
            title: 'Balance',
            key: 'balance',
            align: 'right',
            render: (_, record) => <>${record.balance}</>,
            sorter: true
          }
        ]}
        actions={record => [
          {
            key: `edit:${record.id}`,
            label: 'Edit',
            icon: <EditOutlined />,
            onClick: () => {
              modalForm.open({
                title: (
                  <>
                    Edit: {record.first_name} {record.last_name}
                  </>
                ),
                width: 800,
                values: record,
                onSubmit: data =>
                  new Promise(async resolve => {
                    await update(record.id, data);
                    ds.mutate();
                    resolve();
                  })
              });
            }
          },
          {
            key: `delete:${record.id}`,
            label: 'Delete',
            icon: <DeleteOutlined />,
            onClick: () => {
              modal.confirm({
                title: 'Are you sure delete this?',
                icon: <ExclamationCircleFilled />,
                content: `${record.first_name} ${record.last_name}`,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: async () => {
                  await del(record.id);
                  message.success('Deletion successful');
                  ds.removeSelection([record.id]);
                  ds.mutate();
                }
              });
            }
          }
        ]}
      />
    </Card>
  );
}
