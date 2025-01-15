import {RadioGroup, Radio, cn, Card, CardBody} from "@nextui-org/react";
import InsertAddressModal from "./insert-modal";
import { UserAddress } from "@/lib/types/UserAddress";
import { SelectItem } from "@/lib/types/SelectItem";
import { City } from "@/lib/types/City";


export default function AddressList({addresses, states, cities} :{addresses: UserAddress[], states: SelectItem[], cities: City[]}) {

  return (
    <div className="w-full ">
      <RadioGroup label="انتخاب محل دریافت:" className="w-fullt mb-1">
        {addresses && addresses.map((address, i) => (
          // <Card shadow="sm" key={i} className="overflow-hidden">
          //   <CardBody className='text-right py-5 min-h-24 overflow-hidden'>
              <Radio description={address.address} value={address.id.toString()} key={address.id}
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
          //    </CardBody>
          // </Card> 
        ))}
      </RadioGroup>
      <InsertAddressModal states={states} cities={cities}/>
    </div>
  );
}

//flex flex-col relative h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-small rounded-large transition-transform-background motion-reduce:transition-none overflow-hidden
