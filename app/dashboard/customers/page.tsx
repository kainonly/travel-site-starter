'use client';

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  PlusOutlined
} from '@ant-design/icons';
import { Customer } from '@prisma/client';
import { App, Button, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

import { ModalForm } from '@/app/dashboard/customers/ModalForm';
import { SearchForm } from '@/app/dashboard/customers/SearchForm';
import { bulkDel, del } from '@/app/dashboard/customers/actions';
import { WpxControl, WpxTable } from '@/components';
import { useDataSource, useModalForm } from '@/hooks';

export default function Page() {
  const { message, modal } = App.useApp();
  const ds = useDataSource<Customer>('customers/query');
  const columns: ColumnsType<Customer> = [
    {
      key: 'name',
      title: 'Name',
      width: 320,
      render: (_, record) => (
        <>
          <Tag bordered={false} color="blue">
            {record.gender}
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
      title: 'Balance',
      key: 'balance',
      align: 'right',
      render: (_, record) => <>${record.balance}</>,
      sorter: true
    }
  ];
  const modalForm = useModalForm(f => <ModalForm f={f} />);
  return (
    <WpxTable<Customer>
      dataSource={ds}
      columns={columns}
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
                onSubmit: v =>
                  new Promise(resolve => {
                    console.log(v);
                    resolve();
                  })
              })
            }
          ></Button>
        </>
      }
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
              onSubmit: v =>
                new Promise(resolve => {
                  console.log(v);
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
      bulkActions={[
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
      controls={columns.map<WpxControl>(v => ({ key: v.key!, title: v.title as React.ReactNode }))}
      onKeyword={value => {
        ds.setWhere({ OR: [{ first_name: { contains: value } }, { last_name: { contains: value } }] });
      }}
    />
  );
}
