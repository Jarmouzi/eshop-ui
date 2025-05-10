
import { Menu } from '@/lib/types/Menu';
import { TreeSelect } from 'antd';
import { DataNode } from 'antd/es/tree';
import React, { useState } from 'react';

interface Props {
  list: DataNode[];
  selectedKey?: string | undefined;
  onSelectionChange: (key: string) => void; 
}
export function mapMenuToTreeNode(menus: Menu[]): DataNode[] {
    return menus.map(menu => ({
      title: menu.Title,
      value: menu.Id,
      children: menu.Children && menu.Children.length > 0
        ? mapMenuToTreeNode(menu.Children)
        : undefined,
    }));
  }
  
export default function TreeView({ list, selectedKey = undefined, onSelectionChange }: Props) {

    const [value, setValue] = useState(selectedKey)
    const handleChange = (value: any) => {
        setValue(value);
        onSelectionChange(value);
      }
  return <TreeSelect
                style={{ width: '100%', textAlign: 'right', direction:'rtl'}}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                allowClear
                treeData={list}
                placeholder="انتخاب نمایید"
                treeDefaultExpandAll
                onChange={handleChange}
                />
}