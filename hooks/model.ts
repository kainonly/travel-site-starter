import React, { useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

export interface WpxModelState {
  page: number;
  pageSize: number;
  total: number;
  selection: React.Key[];
  query: Record<string, string>;
}

export interface WpxModel<T> extends WpxModelState, SWRResponse<T[]> {
  setPage(index: number, size: number): void;
  appendSelection(keys: React.Key[]): void;
  removeSelection(keys: React.Key[]): void;
  clearSelection(): void;
  setQuery(query: Record<any, any>): void;
}

export function useModel<T>(url: string, data: any): WpxModel<T> {
  const [model, setModel] = useState<WpxModelState>({
    total: 0,
    page: 1,
    pageSize: 10,
    selection: [],
    query: {}
  });
  const body = {
    page: model.page,
    pageSize: model.pageSize,
    ...data
  };
  const swr = useSWR<T[], any, [string, any]>([url, body], async ([url, body]) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    setModel({
      ...model,
      total: parseInt(response.headers.get('X-Total-Count') ?? '0')
    });
    return response.json();
  });
  return {
    ...swr,
    total: model.total,
    page: model.page,
    pageSize: model.pageSize,
    selection: model.selection,
    query: model.query,
    setPage(index: number, size: number) {
      setModel({
        ...model,
        page: index,
        pageSize: size
      });
    },
    appendSelection(keys: React.Key[]) {
      const data = new Set(model.selection);
      keys.forEach(key => data.add(key));
      setModel({
        ...model,
        selection: [...data.values()]
      });
    },
    removeSelection(keys: React.Key[]) {
      const data = new Set(model.selection);
      keys.forEach(key => data.delete(key));
      setModel({
        ...model,
        selection: [...data.values()]
      });
    },
    clearSelection() {
      setModel({
        ...model,
        selection: []
      });
    },
    setQuery(query: Record<string, string>) {
      setModel({
        ...model,
        query
      });
    }
  };
}
