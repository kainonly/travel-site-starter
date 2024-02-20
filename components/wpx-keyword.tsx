import { Input } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import React from 'react';

import { WpxModel } from '@/hooks/model';

interface WpxKeywordProps<T> {
  model: WpxModel<T>;
}

export function WpxKeyword<T extends AnyObject>({ model }: WpxKeywordProps<T>) {
  return (
    <>
      <Input.Search
        placeholder="Keyword..."
        onSearch={value => {
          console.log(value);
        }}
        style={{ width: 240 }}
      />
    </>
  );
}
