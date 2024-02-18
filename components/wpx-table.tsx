import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Space, Spin, Table } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import useSWR from 'swr';

interface WpxTableProps<T> {
  fetcher: {
    url: string;
  };
  columns: ColumnsType<T>;
  extra?: React.ReactNode;
}

export function WpxTable<T extends AnyObject>(props: WpxTableProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString()
  });
  const { data, mutate, isLoading } = useSWR({ url: `${props.fetcher.url}?${params}` }, async ({ url }) => {
    const response = await fetch(url);
    setTotal(parseInt(response.headers.get('X-Total-Count') ?? '0'));
    return response.json();
  });
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
                mutate();
              }}
            ></Button>
          </Space>
        </Col>
        <Col />
        <Col>{props.extra}</Col>
      </Row>

      <Table<T>
        style={{ paddingTop: 12 }}
        rowKey={'id'}
        loading={isLoading ? { indicator: <Spin /> } : false}
        pagination={{
          current: page,
          total: total,
          pageSize,
          pageSizeOptions: [10, 20, 50],
          onChange: (index, size) => {
            setPage(index);
            setPageSize(size);
          }
        }}
        rowSelection={{ type: 'checkbox' }}
        columns={props.columns}
        dataSource={data}
      />
    </Card>
  );
}
