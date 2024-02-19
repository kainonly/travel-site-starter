import { useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

export interface WpxPagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface WpxModel<T> extends WpxPagination, SWRResponse<T[]> {
  isLoading: boolean;
  updatePage(index: number, size: number): void;
}

export function useModel<T>(url: string): WpxModel<T> {
  const [pagination, setPagination] = useState<WpxPagination>({
    page: 1,
    pageSize: 10,
    total: 0
  });
  const params = new URLSearchParams({
    page: pagination.page.toString(),
    pageSize: pagination.pageSize.toString()
  });
  const swr = useSWR<T[], any, string>(`${url}?${params}`, async url => {
    const response = await fetch(url);
    setPagination({
      ...pagination,
      total: parseInt(response.headers.get('X-Total-Count') ?? '0')
    });
    return response.json();
  });
  return {
    ...swr,
    total: pagination.total,
    page: pagination.page,
    pageSize: pagination.pageSize,
    updatePage(index: number, size: number) {
      setPagination({
        ...pagination,
        page: index,
        pageSize: size
      });
    }
  };
}
