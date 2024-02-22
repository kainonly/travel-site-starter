import { AnyObject } from 'antd/lib/_util/type';
import React, { useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

export interface BodyState {
  page: number;
  pageSize: number;
  where: AnyObject;
  orderBy: AnyObject;
}

export interface WpxModel<T> extends BodyState, SWRResponse<T[]> {
  total: number;
  selection: React.Key[];
  setPage(index: number, size: number): void;
  setWhere(where: AnyObject): void;
  setOrderBy(orderBy: AnyObject): void;
  appendSelection(keys: React.Key[]): void;
  removeSelection(keys: React.Key[]): void;
  clearSelection(): void;
}

export function useModel<T>(url: string): WpxModel<T> {
  const [body, setBody] = useState<BodyState>({
    page: 1,
    pageSize: 10,
    where: {},
    orderBy: {}
  });
  const [total, setTotal] = useState<number>(0);
  const [selection, setSelection] = useState<React.Key[]>([]);
  const swr = useSWR<T[], any, [string, any]>([url, body], async ([url, body]) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    setTotal(parseInt(response.headers.get('X-Total-Count') ?? '0'));
    return response.json();
  });
  return {
    ...swr,
    ...body,
    total,
    selection,
    setPage(index: number, size: number) {
      setBody({
        ...body,
        page: index,
        pageSize: size
      });
    },
    setWhere(where: AnyObject) {
      setBody({
        ...body,
        where
      });
    },
    setOrderBy(orderBy: AnyObject) {
      setBody({
        ...body,
        orderBy
      });
    },
    appendSelection(keys: React.Key[]) {
      const data = new Set(selection);
      keys.forEach(key => data.add(key));
      setSelection([...data.values()]);
    },
    removeSelection(keys: React.Key[]) {
      const data = new Set(selection);
      keys.forEach(key => data.delete(key));
      setSelection([...data.values()]);
    },
    clearSelection() {
      setSelection([]);
    }
  };
}
