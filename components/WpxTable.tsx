import { DownOutlined, EllipsisOutlined, FilterOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Divider, Dropdown, Input, Popover, Row, Space, Spin, Table, Tooltip } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { AnyObject } from 'antd/lib/_util/type';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';

import { WpxModel } from '@/hooks/model';

interface WpxTableProps<T> {
  model: WpxModel<T>;
  columns: ColumnsType<T>;
  extra?: React.ReactNode;
  search?: React.ReactNode;
  controls?: WpxControl[];
  actions?: ItemType[];
  onKeyword?: (value: string) => void;
}

export interface WpxControl {
  key: React.Key;
  title: React.ReactNode;
}

export const WpxTable = <T extends AnyObject>(props: WpxTableProps<T>) => {
  const [searchVisable, setSearchVisable] = useState(false);
  return (
    <>
      <Card>
        <Row justify={'space-between'} gutter={[12, 12]}>
          <Col>
            <Space align={'center'}>
              {props.onKeyword && (
                <Input.Search
                  style={{ width: 240 }}
                  disabled={searchVisable}
                  placeholder="Search Keyword..."
                  onSearch={props.onKeyword}
                />
              )}

              <Button
                type={'text'}
                icon={<ReloadOutlined />}
                onClick={() => {
                  props.model.mutate();
                }}
              ></Button>

              {props.search && (
                <Button
                  type={searchVisable ? 'primary' : 'text'}
                  icon={<FilterOutlined />}
                  onClick={() => {
                    setSearchVisable(!searchVisable);
                  }}
                ></Button>
              )}

              {searchVisable && (
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
              {props.model.selection.length !== 0 && (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'unselect',
                        label: (
                          <a
                            onClick={() => {
                              props.model.clearSelection();
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
                    Selected: {props.model.selection.length} <DownOutlined />
                  </Button>
                </Dropdown>
              )}
              {props.extra}
            </Space>
          </Col>
          <Col span={24}>{searchVisable && props.search}</Col>
        </Row>

        <Table<T>
          loading={props.model.isLoading ? { indicator: <Spin /> } : false}
          rowKey={'id'}
          dataSource={props.model.data}
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
                <Dropdown menu={{ items: props.actions ?? [] }}>
                  <Button type="text" icon={<EllipsisOutlined />}></Button>
                </Dropdown>
              )
            }
          ]}
          rowSelection={{
            selectedRowKeys: props.model.selection,
            onSelect: (record, selected) => {
              if (selected) {
                props.model.appendSelection([record.id]);
              } else {
                props.model.removeSelection([record.id]);
              }
            },
            onChange: (keys, _, info) => {
              if (info.type !== 'all') {
                return;
              }
              if (keys.length === 0) {
                props.model.removeSelection(props.model.data!.map(v => v.id));
              } else {
                props.model.appendSelection(props.model.data!.map(v => v.id));
              }
            }
          }}
          pagination={{
            total: props.model.total,
            current: props.model.page,
            pageSize: props.model.pageSize,
            pageSizeOptions: [10, 20, 50],
            onChange: (index, size) => {
              props.model.setPage(index, size);
            }
          }}
        />
      </Card>
    </>
  );
};
