import { Input } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import React, { useEffect } from 'react';

import { WpxModel } from '@/hooks/model';

interface WpxKeywordProps<T> {
  model: WpxModel<T>;
  keys: string[];
}

export function WpxKeyword<T extends AnyObject>({ model, keys }: WpxKeywordProps<T>) {
  return (
    <>
      <Input.Search
        placeholder="Search Keyword..."
        onSearch={value => {
          // model.setQuery();
        }}
        style={{ width: 240 }}
      />
    </>
  );
}
