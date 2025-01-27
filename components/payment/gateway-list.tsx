import {RadioGroup, Radio, cn} from "@nextui-org/react";
import { PaymentGateway } from "@/lib/types/PaymentGateway";
import { useState } from "react";
import Image from "next/image";

export default function GatewayList({gatewayId, gateways, onValueChange} :{gatewayId: number | null, gateways: PaymentGateway[], onValueChange: (value: string) => void;}) {
 
    const [selectedValue, setSelectedValue] = useState(gatewayId?.toString())

    const handleValueChange = (value: string) => {
        setSelectedValue(value);
        onValueChange(value);
    }
  return (
    <div className="w-full">
      <RadioGroup 
        label="انتخاب محل دریافت:" 
        className="w-full mb-1" 
        onValueChange={handleValueChange} 
        value={selectedValue}>
        {gateways && gateways.map((gateway, i) => (
            <Radio description={gateway.description} value={gateway.id.toString()} key={gateway.id}
            classNames={{
            base: cn(
                "inline-flex m-1 hover:bg-stone-100",
                "cursor-pointer rounded-lg gap-4 p-4 py-5 border-2 border-transparent",          
                "w-full max-w-full relative h-auto text-foreground box-border outline-none ",
                "shadow-small rounded-large",
                "data-[selected=true]:border-primary",
            ),
            }}>
              { gateway.logo? 
                <Image
                          className="h-full w-full max-h-10 max-w-20 object-cover"
                          width={80}
                          height={40}
                  alt={gateway.title as string}
                  src={gateway.logo as string}
                />
              : gateway.title }

            </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}

//flex flex-col relative h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-small rounded-large transition-transform-background motion-reduce:transition-none overflow-hidden
