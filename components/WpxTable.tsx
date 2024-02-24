import { EllipsisOutlined, HolderOutlined, SettingOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Checkbox, Col, Dropdown, Flex, Popover, Row, Space, Spin, Table } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { AnyObject } from 'antd/lib/_util/type';
import { ColumnType } from 'antd/lib/table';
import React, { useState } from 'react';

import { WpxDataSource } from '@/hooks';

export type WpxColumnsType<T> = WpxColumnType<T>[];

export interface WpxColumnType<T> extends ColumnType<T> {
  control?: React.ReactNode;
}

export interface WpxTableProps<T> {
  dataSource: WpxDataSource<T>;
  columns: WpxColumnsType<T>;
  actions: (record: T) => ItemType[];
}

export function WpxTable<T extends AnyObject>(props: WpxTableProps<T>) {
  const keys = props.columns.map<string>(v => v.key as string);
  const [display, setDisplay] = useState<string[]>(keys);
  const [columns, setColumns] = useState(props.columns);
  return (
    <>
      <Table<T>
        loading={props.dataSource.isLoading ? { indicator: <Spin /> } : false}
        rowKey={'id'}
        dataSource={props.dataSource.data}
        columns={[
          ...columns.map(v => ({
            ...v,
            hidden: !display.includes(v.key as string)
          })),
          {
            title: (
              <Popover
                placement={'bottomRight'}
                trigger={'click'}
                title={
                  <>
                    <Row justify={'space-between'}>
                      <Col>
                        <Checkbox
                          checked={display.length === keys.length}
                          indeterminate={display.length !== 0 && display.length !== keys.length}
                          onChange={e => {
                            if (e.target.checked) {
                              setDisplay(keys);
                            } else {
                              setDisplay([]);
                            }
                          }}
                        >
                          Display
                        </Checkbox>
                      </Col>
                      <Col></Col>
                      <Col>
                        <Button
                          size={'small'}
                          type={'link'}
                          onClick={() => {
                            setDisplay(keys);
                          }}
                        >
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </>
                }
                content={
                  <Checkbox.Group
                    value={display}
                    onChange={value => {
                      setDisplay(value);
                    }}
                  >
                    <DndContext
                      onDragEnd={({ active, over }) => {
                        if (active.id !== over!.id) {
                          const oldIndex = columns.findIndex(v => v.key === (active.id as string));
                          const newIndex = columns.findIndex(v => v.key === (over!.id as string));
                          setColumns(arrayMove(columns, oldIndex, newIndex));
                        }
                      }}
                    >
                      <SortableContext items={columns.map(v => v.key as string)} strategy={verticalListSortingStrategy}>
                        <Flex gap={'small'} vertical>
                          {columns.map(v => (
                            <WpxControl
                              key={v.key}
                              label={v.control ?? (v.title as React.ReactNode)}
                              value={v.key as string}
                            />
                          ))}
                        </Flex>
                      </SortableContext>
                    </DndContext>
                  </Checkbox.Group>
                }
              >
                <Button disabled={keys.length === 0} type="text" icon={<SettingOutlined />}></Button>
              </Popover>
            ),
            width: 64,
            align: 'center',
            render: (_, record) => (
              <Dropdown menu={{ items: props.actions(record) }}>
                <Button type="text" icon={<EllipsisOutlined />}></Button>
              </Dropdown>
            )
          }
        ]}
        rowSelection={{
          selectedRowKeys: props.dataSource.selection,
          onSelect: (record, selected) => {
            if (selected) {
              props.dataSource.appendSelection([record.id]);
            } else {
              props.dataSource.removeSelection([record.id]);
            }
          },
          onChange: (keys, _, info) => {
            if (info.type !== 'all') {
              return;
            }
            if (keys.length === 0) {
              props.dataSource.removeSelection(props.dataSource.data!.map(v => v.id));
            } else {
              props.dataSource.appendSelection(props.dataSource.data!.map(v => v.id));
            }
          }
        }}
        pagination={{
          total: props.dataSource.total,
          current: props.dataSource.page,
          pageSize: props.dataSource.pageSize,
          pageSizeOptions: [10, 20, 50],
          showTotal: total => `Total ${total} items`,
          onChange: (index, size) => {
            props.dataSource.setPage(index, size);
          }
        }}
        onChange={(_, filters, sorter, extra) => {
          if (extra.action === 'sort') {
            if (!Array.isArray(sorter)) {
              props.dataSource.setOrderBy(sorter.columnKey as string, (sorter.order as string) ?? null);
            }
          }
        }}
      />
    </>
  );
}

export interface WpxControlProps {
  label: React.ReactNode;
  value: string;
}

function WpxControl(props: WpxControlProps) {
  const { attributes, setNodeRef, setActivatorNodeRef, listeners, transform, transition } = useSortable({
    id: props.value
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Space ref={setNodeRef} style={style} {...attributes}>
      <Button ref={setActivatorNodeRef} {...listeners} size={'small'} type={'text'} icon={<HolderOutlined />} />
      <Checkbox value={props.value}>{props.label}</Checkbox>
    </Space>
  );
}
