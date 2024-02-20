import { ClearOutlined, DownOutlined, FilterOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Dropdown, Input, Row, Space, Spin, Table } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

import { WpxModel } from '@/hooks/model';

interface WpxTableProps<T> {
  model: WpxModel<T>;
  columns: ColumnsType<T>;
  action?: React.ReactNode;
}

export function WpxTable<T extends AnyObject>({ model, columns, action }: WpxTableProps<T>) {
  return (
    <Card>
      <Row justify={'space-between'}>
        <Col>
          <Space align={'center'}>
            <Input style={{ width: 240 }} prefix={<SearchOutlined />} placeholder="Search..." />
            <Space.Compact>
              <Button type={'text'} icon={<FilterOutlined />} onClick={() => {}}></Button>
              <Button
                type={'text'}
                icon={<ClearOutlined />}
                onClick={() => {
                  model.clearSelection();
                }}
              ></Button>
              <Button
                type={'text'}
                icon={<ReloadOutlined />}
                onClick={() => {
                  model.mutate();
                }}
              ></Button>
            </Space.Compact>
          </Space>
        </Col>
        <Col />
        <Col>
          <Space align={'center'}>
            {model.selection.length !== 0 && (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'unselect',
                      label: (
                        <a
                          onClick={() => {
                            model.clearSelection();
                          }}
                        >
                          Unselect
                        </a>
                      )
                    },
                    {
                      key: 'delete',
                      danger: true,
                      label: <a onClick={() => {}}>Bulk Delete</a>
                    }
                  ]
                }}
              >
                <Button type={'link'}>
                  Selected: {model.selection.length} <DownOutlined />
                </Button>
              </Dropdown>
            )}
            {action}
          </Space>
        </Col>
      </Row>

      <Table<T>
        style={{ paddingTop: 12 }}
        loading={model.isLoading ? { indicator: <Spin /> } : false}
        rowKey={'id'}
        dataSource={model.data}
        columns={columns}
        rowSelection={{
          selectedRowKeys: model.selection,
          onSelect: (record, selected) => {
            if (selected) {
              model.appendSelection([record.id]);
            } else {
              model.removeSelection([record.id]);
            }
          },
          onChange: (keys, _, info) => {
            if (info.type !== 'all') {
              return;
            }
            if (keys.length === 0) {
              model.removeSelection(model.data!.map(v => v.id));
            } else {
              model.appendSelection(model.data!.map(v => v.id));
            }
          }
        }}
        pagination={{
          total: model.total,
          current: model.page,
          pageSize: model.pageSize,
          pageSizeOptions: [10, 20, 50],
          onChange: (index, size) => {
            model.setPage(index, size);
          }
        }}
      />
    </Card>
  );
}
