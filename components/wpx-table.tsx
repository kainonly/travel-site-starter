import {
  ClearOutlined,
  DownOutlined,
  EllipsisOutlined,
  FilterOutlined,
  ReloadOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Divider, Dropdown, Popover, Row, Space, Spin, Table, Tooltip } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { AnyObject } from 'antd/lib/_util/type';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';

import { WpxKeyword } from '@/components/wpx-keyword';
import { WpxModel } from '@/hooks/model';

interface WpxTableProps<T> {
  model: WpxModel<T>;
  columns: ColumnsType<T>;
  search?: React.ReactNode;
  extra?: React.ReactNode;
  controls?: WpxControl[];
  actions?: ItemType[];
}

export interface WpxControl {
  key: React.Key;
  title: React.ReactNode;
}

export function WpxTable<T extends AnyObject>({ model, columns, search, extra, controls, actions }: WpxTableProps<T>) {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <Card>
        <Row justify={'space-between'} gutter={[12, 12]}>
          <Col>
            <Space align={'center'}>
              <WpxKeyword model={model} />
              <Tooltip title={'Refresh'}>
                <Button
                  type={'text'}
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    model.mutate();
                  }}
                ></Button>
              </Tooltip>

              {search && (
                <Tooltip title={'Advanced Search'}>
                  <Button
                    type={searchOpen ? 'primary' : 'text'}
                    icon={<FilterOutlined />}
                    onClick={() => {
                      setSearchOpen(!searchOpen);
                    }}
                  ></Button>
                </Tooltip>
              )}

              {searchOpen && (
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
              {extra}
            </Space>
          </Col>
          <Col span={24}>{searchOpen && search}</Col>
        </Row>

        <Table<T>
          loading={model.isLoading ? { indicator: <Spin /> } : false}
          rowKey={'id'}
          dataSource={model.data}
          columns={[
            ...columns,
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
                  content={controls && controls.map(v => <Checkbox key={v.key}>{v.title}</Checkbox>)}
                >
                  <Button
                    disabled={!controls || controls?.length === 0}
                    type="text"
                    icon={<SettingOutlined />}
                  ></Button>
                </Popover>
              ),
              width: 64,
              align: 'center',
              render: (_, record) => (
                <Dropdown menu={{ items: actions ?? [] }}>
                  <Button type="text" icon={<EllipsisOutlined />}></Button>
                </Dropdown>
              )
            }
          ]}
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
    </>
  );
}
