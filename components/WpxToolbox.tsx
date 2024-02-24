import { DownOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Dropdown, Input, Row, Space } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import React, { useState } from 'react';

import { WpxDataSource } from '@/hooks';

export interface WpxToolboxProps<T> {
  dataSource: WpxDataSource<T>;
  keywords?: {
    placeholder?: string;
    onSearch: (value: string) => void;
  };
  search?: React.ReactNode;
  bulk?: ItemType[];
  extra?: React.ReactNode;
}

export function WpxToolbox<T>({ dataSource, keywords, search, bulk, extra }: WpxToolboxProps<T>) {
  const [visible, setVisible] = useState(false);
  return (
    <Row justify={'space-between'} gutter={[12, 12]}>
      <Col>
        <Space align={'center'}>
          {keywords && (
            <Input.Search
              style={{ width: 240 }}
              disabled={visible}
              onSearch={keywords.onSearch}
              placeholder={keywords.placeholder ?? 'Search Keyword...'}
              allowClear
            />
          )}

          <Button
            type={'text'}
            icon={<ReloadOutlined />}
            onClick={() => {
              dataSource.mutate();
            }}
          ></Button>

          {search && (
            <Button
              type={visible ? 'primary' : 'text'}
              icon={<FilterOutlined />}
              onClick={() => {
                setVisible(!visible);
              }}
            ></Button>
          )}

          {visible && (
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
          {dataSource.selection.length !== 0 && (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'unselect',
                    label: (
                      <a
                        onClick={() => {
                          dataSource.clearSelection();
                        }}
                      >
                        Unselect
                      </a>
                    )
                  },
                  ...(bulk ?? [])
                ]
              }}
            >
              <Button type={'link'}>
                Selected: {dataSource.selection.length} <DownOutlined />
              </Button>
            </Dropdown>
          )}
          {extra}
        </Space>
      </Col>
      <Col span={24}>{visible && search}</Col>
    </Row>
  );
}
