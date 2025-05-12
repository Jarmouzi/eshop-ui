'use client';
import { BanknotesIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, MapPinIcon } from "@heroicons/react/24/solid";
import PaymentBasket from "@/components/payment/basket";
import {Tabs, Tab} from "@nextui-org/react";
import { UserAddress } from "@/lib/types/UserAddress";
import { Cart } from "@/lib/types/Cart";
import AddressList from "../address/address-list";
import { SelectItem } from "@/lib/types/SelectItem";
import { City } from "@/lib/types/City";
import { PaymentGateway } from "@/lib/types/PaymentGateway";
import GatewayList from "./gateway-list";
import { useState } from "react";
import { updateUserOrder } from "@/lib/services/UserOrderService";

export default function PaymentTablist({userOrder, cart, addresses, states, cities, gateways}:{userOrder: UserOrder, cart: Cart | undefined, addresses: UserAddress[], states: SelectItem[], cities: City[], gateways: PaymentGateway[]}) {
  const [activeTab, setActiveTab] = useState("basket");
  const [formData, setFormData] = useState(userOrder);

  const handleSelectedGatewayChange = (value: string) => {
    setFormData({ ...formData, PaymentGatewayId: Number(value) }); 
  } 
  const handleSelectedAddressChange = (value: string) => {
    setFormData({ ...formData, UserAddressId: Number(value) }); 
  } 

  const handleTabChange = (key: any) => {
    setActiveTab(key); 
  };

  const handlePayment = () => {
    updateUserOrder(formData);

    //push to payment Gateway
  }

  return (
    <Tabs 
    aria-label="Options" 
    color="primary" 
    variant="underlined"
    fullWidth= {true}
    selectedKey={activeTab} 
    onSelectionChange={handleTabChange}
    classNames={{
      tabList: "gap-6 relative rounded-none p-0 border-b",
      cursor: "w-full bg-primary",
      tab: "min-w-fit w-1/3 px-0 h-12 border-0",
      tabContent: "group-data-[selected=true]:text-primary"
    }}
    >
      <Tab key={"basket"} accessKey={"address"}
        title={
          <div className="flex items-center space-x-12">
              <ShoppingBagIcon className='h-6' />
          </div>} >            
        <div className="rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-black md:p-12 md:pb-3">
          <PaymentBasket cart={cart} />
          <div className="inline-block w-full">
            <button
              onClick={() => {setActiveTab("address");}}
              key={"address"}
              aria-label="تایید و ادامه"
              className='flex float-end rounded-md bg-primary p-3 m-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100'
            >
              تایید
              <div className="left-0 mr-4"><ArrowLeftIcon className='h-6' />
              </div>
            </button>
          </div>
        </div>  
      </Tab>
      <Tab key={"address"} 
          title={
            <div className="flex items-center space-x-12">
              <MapPinIcon className='h-6' />   
            </div>} >            
          <div className="rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-black md:p-12 md:pb-3">
            <AddressList addressId={formData.UserAddressId} addresses={addresses} states={states} cities={cities} onValueChange={handleSelectedAddressChange}/>          
            {formData.UserAddressId && 
            <div className="inline-block w-full">
              <button
              onClick={() => {setActiveTab("gateway");}}
                aria-label="تایید و ادامه"
                className='flex float-end rounded-md bg-primary p-3 m-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100'
              >
                تایید
                <div className="left-0 mr-4"><ArrowLeftIcon className='h-6' />
                </div>
              </button>
            </div> }
          </div>
      </Tab>
      <Tab key={"gateway"} 
        title={
          <div className="flex items-center space-x-12">
            <BanknotesIcon className='h-6' />
          </div>} >            
        <div className="rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-black md:p-12 md:pb-3">
           <GatewayList gatewayId={formData.PaymentGatewayId} gateways={gateways} onValueChange={handleSelectedGatewayChange} />  
           {formData.PaymentGatewayId &&  
           <div className="inline-block w-full">         
            <button
                onClick={handlePayment}
                aria-label="تکمیل خرید"
                className='flex float-end rounded-md bg-primary p-3 m-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100'
              >
                تکمیل خرید
              </button>
            </div>}
        </div>  
      </Tab>
    </Tabs>
  );
}