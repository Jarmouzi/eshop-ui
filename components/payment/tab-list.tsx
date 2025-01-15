'use client';
import { BanknotesIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import PaymentBasket from "@/components/payment/basket";
import {Tabs, Tab} from "@nextui-org/react";
import { UserAddress } from "@/lib/types/UserAddress";
import { Cart } from "@/lib/types/Cart";
import AddressList from "../address/address-list";
import { SelectItem } from "@/lib/types/SelectItem";
import { City } from "@/lib/types/City";
import { PaymentGateway } from "@/lib/types/PaymentGateway";
import GatewayList from "./gateway-list";

export default function PaymentTablist({cart, addresses, states, cities, gateways}:{cart: Cart | undefined, addresses: UserAddress[], states: SelectItem[], cities: City[], gateways: PaymentGateway[]}) {

  const handleGatewayChange = (value: string) => {
    //setFormData({ ...formData, cityId: Number(key) }); 
  } 
  return (
    <Tabs 
    aria-label="Options" 
    color="primary" 
    variant="underlined"
    fullWidth= {true}
    classNames={{
      tabList: "gap-6 relative rounded-none p-0 border-b",
      cursor: "w-full bg-primary",
      tab: "min-w-fit w-1/3 px-0 h-12 border-0",
      tabContent: "group-data-[selected=true]:text-primary"

    }}
    >
      <Tab key={"basket"} 
        title={
          <div className="flex items-center space-x-12">
              <ShoppingBagIcon className='h-6' />
          </div>} >            
        <div className="flex rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-black md:p-12">
          <PaymentBasket cart={cart} />
        </div>  
      </Tab>
      {addresses && <Tab key={"address"} 
          title={
            <div className="flex items-center space-x-12">
              <MapPinIcon className='h-6' />   
            </div>} >            
          <div className="flex rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-black md:p-12">
            <AddressList addresses={addresses} states={states} cities={cities}/>
          </div>  
      </Tab>
      }
      <Tab key={"gateway"} 
        title={
          <div className="flex items-center space-x-12">
            <BanknotesIcon className='h-6' />
          </div>} >            
        <div className="flex rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-black md:p-12">
           <GatewayList gateways={gateways} onValueChange={handleGatewayChange} />
        </div>  
      </Tab>
    </Tabs>
  );
}