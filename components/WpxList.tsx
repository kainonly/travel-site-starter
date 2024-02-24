import { List } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import React from 'react';

import { WpxDataSource } from '@/hooks';

export interface WpxListProps<T> {
  dataSource: WpxDataSource<T>;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function WpxList<T extends AnyObject>(props: WpxListProps<T>) {
  return (
    <>
      <List<T> itemLayout="horizontal" dataSource={props.dataSource.data} renderItem={props.renderItem} />
    </>
  );
}
