import { List, Spin } from 'antd';
import { ListGridType, ListItemLayout } from 'antd/es/list';
import { AnyObject } from 'antd/lib/_util/type';
import React from 'react';

import { WpxDataSource } from '@/hooks';

export interface WpxListProps<T> {
  grid?: ListGridType;
  itemLayout?: ListItemLayout;
  rowKey?: string;
  dataSource: WpxDataSource<T>;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function WpxList<T extends AnyObject>(props: WpxListProps<T>) {
  const ds = props.dataSource;
  return (
    <>
      <List<T>
        grid={props.grid}
        itemLayout={props.itemLayout ?? 'horizontal'}
        loading={ds.isLoading ? { indicator: <Spin /> } : false}
        rowKey={props.rowKey ?? 'id'}
        dataSource={ds.data}
        renderItem={props.renderItem}
        pagination={{
          total: ds.total,
          current: ds.page,
          pageSize: ds.pageSize,
          pageSizeOptions: [10, 20, 50],
          showTotal: total => `Total ${total} items`,
          onChange: (index, size) => {
            ds.setPage(index, size);
          }
        }}
      />
    </>
  );
}
