import React, { ChangeEvent, useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, SharedSelection} from "@nextui-org/react";
import { SelectItem } from "@/lib/types/SelectItem";

interface SingleSelectDropDownProps {
  list: SelectItem[];
  hasDefault?: boolean;
  selectedKey?: string;
  onSelectionChange: (key: string) => void; 
}

export default function SingleSelectDropDown({ list, hasDefault = false, selectedKey = "", onSelectionChange }: SingleSelectDropDownProps) {
  
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set([selectedKey]))

  if(hasDefault) list.unshift({Id: "", Title: 'انتخاب نمایید'})

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

  const handleOnDropdownChange = (keys: SharedSelection) => {
    setSelectedKeys(keys as Set<string>);
    onSelectionChange(keys.currentKey as string);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" variant="bordered">
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
            <DropdownItem key={item.Id}>            
                {item.Title}
            </DropdownItem>
        ))}

      </DropdownMenu>
    </Dropdown>
  );
}

