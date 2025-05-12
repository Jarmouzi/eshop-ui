import {RadioGroup, Radio, cn} from "@nextui-org/react";
import InsertAddressModal from "./insert-modal";
import { UserAddress } from "@/lib/types/UserAddress";
import { SelectItem } from "@/lib/types/SelectItem";
import { City } from "@/lib/types/City";
import { useState } from "react";

export default function AddressList({addressId, addresses, states, cities, onValueChange} :{addressId: number | null, addresses: UserAddress[], states: SelectItem[], cities: City[], onValueChange: (value: string) => void}) {

    const [selectedValue, setSelectedValue] = useState(addressId?.toString())

    if(selectedValue === undefined || selectedValue === null){ 
      const defaultAddress = addresses.find(item => item.isDefault === true);

      if(defaultAddress)
        setSelectedValue(defaultAddress.id.toString());
    }    

    const handleValueChange = (value: string) => {
      setSelectedValue(value);
      onValueChange(value);
    }
  return (
    <div className="w-full ">
      <RadioGroup 
        label="انتخاب محل دریافت:" 
        className="w-full mb-1" 
        onValueChange={handleValueChange} 
        value={selectedValue}>
        {addresses && addresses.map((address, i) => (
          <Radio 
            description={address.address} 
            value={address.id.toString()} 
            key={address.id}
            classNames={{
              base: cn(
                "inline-flex m-1 hover:bg-stone-100",
                "cursor-pointer rounded-lg gap-4 p-4 py-5 border-2 border-transparent",          
                "w-full max-w-full relative h-auto text-foreground box-border outline-none ",
                "shadow-small rounded-large",
                "data-[selected=true]:border-primary",
              ),
            }}>
            {address.title}
          </Radio>
        ))}
      </RadioGroup>
      <InsertAddressModal states={states} cities={cities} />
    </div>
  );
}

//flex flex-col relative h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-small rounded-large transition-transform-background motion-reduce:transition-none overflow-hidden
