import { DownOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Dropdown, Input, Row, Space } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import React, { useState } from 'react';

import { WpxDataSource } from '@/hooks';

export interface WpxToolboxProps<T> {
  dataSource: WpxDataSource<T>;
  bulkActions?: ItemType[];
  extra?: React.ReactNode;
  search?: React.ReactNode;
  onKeyword?: (value: string) => void;
}

export function WpxToolbox<T>(props: WpxToolboxProps<T>) {
  const [searchVisible, setSearchVisible] = useState(false);
  return (
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
  );
}
