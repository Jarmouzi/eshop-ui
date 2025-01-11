import React, { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, SharedSelection} from "@nextui-org/react";
import { SelectItem } from "@/lib/types/SelectItem";

interface SingleSelectDropDownProps {
  list: SelectItem[];
  hasDefault?: boolean;
  selectedKey?: string;
  onSelectionChange: (key: string) => void; 
}

export default function SingleSelectDropDown({ list, hasDefault = false, selectedKey = "", onSelectionChange }: SingleSelectDropDownProps) {
  
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([selectedKey]))

  if(hasDefault) list.unshift({id: "", title: 'انتخاب نمایید'})

  // const selectedValue = React.useMemo(
  //   () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
  //   [selectedKeys],
  // );
  const selectedValue = React.useMemo(() => {
    const key = Array.from(selectedKeys)[0]; 
    const selectedItem = list.find(item => item.id === key); 
    return selectedItem ? selectedItem.title : 'انتخاب نمایید'; 
  }, [selectedKeys, list]);

  const handleOnDropdownChange = (keys: SharedSelection) => {
    setSelectedKeys(keys as Set<string>);
    onSelectionChange(keys.currentKey as string);
  }

  return (
    <Dropdown  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <DropdownTrigger>
        <Button variant="bordered" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={handleOnDropdownChange}
      >

        {list && list.map((item, i) => (
            <DropdownItem key={item.id} value={item.id}>            
                {item.title}
            </DropdownItem>
        ))}

      </DropdownMenu>
    </Dropdown>
  );
}

