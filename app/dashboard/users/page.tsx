'use client';

import { EditOutlined, EllipsisOutlined, ExclamationCircleFilled, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { User } from '@prisma/client';
import { App, Avatar, Badge, Button, Card, Checkbox, Col, Descriptions, List, Row, Space, Typography } from 'antd';
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
    <Card style={{ minHeight: '100%' }}>
      <Row>
        <Col span={6}></Col>
        <Col span={18}>
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
            grid={{ gutter: 16, column: 2 }}
            itemLayout={'vertical'}
            dataSource={ds}
            renderItem={(item, index) => (
              <List.Item key={item.id}>
                <Card
                  type={'inner'}
                  title={<Checkbox>{item.email}</Checkbox>}
                  extra={<Button type={'text'} icon={<EditOutlined />}></Button>}
                >
                  <Space size={'large'} align={'start'}>
                    <Avatar size={128} src={item.avatar} icon={<UserOutlined />} />
                    <Descriptions
                      size={'small'}
                      layout={'vertical'}
                      items={[
                        {
                          key: 'name',
                          label: 'Name',
                          children: item.name ?? 'Not set'
                        },
                        {
                          key: 'phone',
                          label: 'Phone',
                          children: item.phone ?? 'Not set'
                        },
                        {
                          key: 'status',
                          label: 'Status',
                          children: item.status ? (
                            <Badge status="processing" text="Availability" />
                          ) : (
                            <Badge status="default" text="Suspended" />
                          )
                        },
                        {
                          key: 'roles',
                          label: 'Roles',
                          span: 3,
                          children: 'Not set'
                        }
                      ]}
                    />
                  </Space>
                </Card>
              </List.Item>
            )}
          ></WpxList>
        </Col>
      </Row>
    </Card>
  );
}
