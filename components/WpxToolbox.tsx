import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Tooltip } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import React from 'react';

import { WpxModel } from '@/hooks/model';

interface WpxToolbox<T> {
  model: WpxModel<T>;
  open: boolean;
  search?: React.ReactNode;
}

export function WpxToolbox<T extends AnyObject>({ model, open, search }: WpxToolbox<T>) {
  return (
    <>
      <Tooltip title={'Refresh'}>
        <Button
          type={'text'}
          icon={<ReloadOutlined />}
          onClick={() => {
            model.mutate();
          }}
        ></Button>
      </Tooltip>

      {search && (
        <Tooltip title={'Advanced Search'}>
          <Button
            type={open ? 'primary' : 'text'}
            icon={<FilterOutlined />}
            onClick={() => {
              // setSearchOpen(!searchOpen);
            }}
          ></Button>
        </Tooltip>
      )}

      {open && (
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
    </>
  );
}
