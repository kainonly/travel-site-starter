import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Space, Spin, Table } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

import { WpxModel } from '@/hooks/model';

interface WpxTableProps<T> {
  model: WpxModel<T>;
  columns: ColumnsType<T>;
  extra?: React.ReactNode;
}

export function WpxTable<T extends AnyObject>({ model, columns, extra }: WpxTableProps<T>) {
  return (
    <Card>
      <Row justify={'space-between'}>
        <Col>
          <Space align={'center'}>
            <Input style={{ width: 240 }} prefix={<SearchOutlined />} placeholder="Search" />
            <Button
              type={'text'}
              icon={<ReloadOutlined />}
              onClick={() => {
                model.mutate();
              }}
            ></Button>
          </Space>
        </Col>
        <Col />
        <Col>{extra}</Col>
      </Row>

      <Table<T>
        style={{ paddingTop: 12 }}
        rowKey={'id'}
        loading={model.isLoading ? { indicator: <Spin /> } : false}
        pagination={{
          current: model.page,
          total: model.total,
          pageSize: model.pageSize,
          pageSizeOptions: [10, 20, 50],
          onChange: (index, size) => {
            model.updatePage(index, size);
          }
        }}
        rowSelection={{ type: 'checkbox' }}
        columns={columns}
        dataSource={model.data}
      />
    </Card>
  );
}
