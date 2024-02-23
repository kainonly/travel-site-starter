import { AnyObject } from 'antd/lib/_util/type';
import React, { useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

export interface WpxBodyState {
  page: number;
  pageSize: number;
  where: AnyObject;
  orderBy: Map<string, 'desc' | 'asc'>;
}

export interface WpxDataSource<T> extends WpxBodyState, SWRResponse<T[]> {
  total: number;
  selection: React.Key[];
  setPage(index: number, size: number): void;
  setWhere(where: AnyObject): void;
  setOrderBy(key: string, sort: string | null): void;
  appendSelection(keys: React.Key[]): void;
  removeSelection(keys: React.Key[]): void;
  clearSelection(): void;
}

export function useDataSource<T>(url: string): WpxDataSource<T> {
  const [body, setBody] = useState<WpxBodyState>({
    page: 1,
    pageSize: 10,
    where: {},
    orderBy: new Map()
  });
  const [total, setTotal] = useState<number>(0);
  const [selection, setSelection] = useState<React.Key[]>([]);
  const swr = useSWR<T[], any, [string, WpxBodyState]>([url, body], async ([url, body]) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body,
        orderBy: [...body.orderBy.entries()].map(([k, v]) => ({ [k]: v }))
      })
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
    setOrderBy(key: string, sort: string | null) {
      const transform: Record<string, 'desc' | 'asc'> = {
        descend: 'desc',
        ascend: 'asc'
      };
      if (!sort) {
        body.orderBy.delete(key);
      } else {
        body.orderBy.set(key, transform[sort]);
      }
      setBody({
        ...body,
        orderBy: new Map(body.orderBy)
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
