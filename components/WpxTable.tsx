import { DownOutlined, EllipsisOutlined, FilterOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Divider, Dropdown, Input, Popover, Row, Space, Spin, Table } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { AnyObject } from 'antd/lib/_util/type';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';

import { WpxDataSource } from '@/hooks';

interface WpxTableProps<T> {
  dataSource: WpxDataSource<T>;
  columns: ColumnsType<T>;
  actions: (record: T) => ItemType[];
  bulkActions?: ItemType[];
  extra?: React.ReactNode;
  search?: React.ReactNode;
  controls?: WpxControl[];
  onKeyword?: (value: string) => void;
}

export interface WpxControl {
  key: React.Key;
  title: React.ReactNode;
}

export const WpxTable = <T extends AnyObject>(props: WpxTableProps<T>) => {
  const [searchVisible, setSearchVisible] = useState(false);
  return (
    <>
      <Card>
        <Row justify={'space-between'} gutter={[12, 12]}>
          <Col>
            <Space align={'center'}>
              {props.onKeyword && (
                <Input.Search
                  style={{ width: 240 }}
                  allowClear
                  disabled={searchVisible}
                  placeholder="Search Keyword..."
                  onSearch={props.onKeyword}
                />
              )}

              <Button
                type={'text'}
                icon={<ReloadOutlined />}
                onClick={() => {
                  props.dataSource.mutate();
                }}
              ></Button>

              {props.search && (
                <Button
                  type={searchVisible ? 'primary' : 'text'}
                  icon={<FilterOutlined />}
                  onClick={() => {
                    setSearchVisible(!searchVisible);
                  }}
                ></Button>
              )}

              {searchVisible && (
                <>
                  <Divider type={'vertical'} />
                  <Button form={'search'} type={'dashed'} htmlType={'reset'}>
                    Reset
                  </Button>
                  <Button form={'search'} type={'dashed'} htmlType={'submit'}>
                    Search
                  </Button>
                </>
              )}
            </Space>
          </Col>
          <Col />
          <Col>
            <Space align={'center'}>
              {props.dataSource.selection.length !== 0 && (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'unselect',
                        label: (
                          <a
                            onClick={() => {
                              props.dataSource.clearSelection();
                            }}
                          >
                            Unselect
                          </a>
                        )
                      },
                      ...(props.bulkActions ?? [])
                    ]
                  }}
                >
                  <Button type={'link'}>
                    Selected: {props.dataSource.selection.length} <DownOutlined />
                  </Button>
                </Dropdown>
              )}
              {props.extra}
            </Space>
          </Col>
          <Col span={24}>{searchVisible && props.search}</Col>
        </Row>

        <Table<T>
          loading={props.dataSource.isLoading ? { indicator: <Spin /> } : false}
          rowKey={'id'}
          dataSource={props.dataSource.data}
          columns={[
            ...props.columns,
            {
              title: (
                <Popover
                  placement={'bottomRight'}
                  trigger={'click'}
                  title={
                    <Row justify={'space-between'}>
                      <Col>
                        <Checkbox>列展示</Checkbox>
                      </Col>
                      <Col></Col>
                      <Col></Col>
                    </Row>
                  }
                  content={props.controls && props.controls.map(v => <Checkbox key={v.key}>{v.title}</Checkbox>)}
                >
                  <Button
                    disabled={!props.controls || props.controls?.length === 0}
                    type="text"
                    icon={<SettingOutlined />}
                  ></Button>
                </Popover>
              ),
              width: 64,
              align: 'center',
              render: (_, record) => (
                <Dropdown menu={{ items: props.actions(record) }}>
                  <Button type="text" icon={<EllipsisOutlined />}></Button>
                </Dropdown>
              )
            }
          ]}
          rowSelection={{
            selectedRowKeys: props.dataSource.selection,
            onSelect: (record, selected) => {
              if (selected) {
                props.dataSource.appendSelection([record.id]);
              } else {
                props.dataSource.removeSelection([record.id]);
              }
            },
            onChange: (keys, _, info) => {
              if (info.type !== 'all') {
                return;
              }
              if (keys.length === 0) {
                props.dataSource.removeSelection(props.dataSource.data!.map(v => v.id));
              } else {
                props.dataSource.appendSelection(props.dataSource.data!.map(v => v.id));
              }
            }
          }}
          pagination={{
            total: props.dataSource.total,
            current: props.dataSource.page,
            pageSize: props.dataSource.pageSize,
            pageSizeOptions: [10, 20, 50],
            showTotal: total => `Total ${total} items`,
            onChange: (index, size) => {
              props.dataSource.setPage(index, size);
            }
          }}
          onChange={(_, filters, sorter, extra) => {
            if (extra.action === 'sort') {
              console.log(sorter);
              if (!Array.isArray(sorter)) {
                props.dataSource.setOrderBy(sorter.columnKey as string, (sorter.order as string) ?? null);
              }
            }
          }}
        />
      </Card>
    </>
  );
};
