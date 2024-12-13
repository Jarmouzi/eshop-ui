//import CartBasket from "@/components/payment/basket";
import { BanknotesIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
//import {Tabs, Tab, Chip} from "@nextui-org/react";
import { cookies } from 'next/headers';
import { getCart } from '@/lib/services/CartService';
import PaymentBasket from "@/components/payment/basket";
import { TabData } from "@/lib/types/TabData";
import TabInfo from "@/components/tab/tab-info";
import CartAmount from "@/components/payment/amount";
// import RadioList from "@/components/radio-list";
// import { RadioItem } from "@/lib/types/RadioItem";
import { Suspense } from "react";
import { Metadata } from "next";

export const runtime = 'edge';

export const revalidate = 60; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {

  return {
    title: 'سبد خرید',
    description: '',
    openGraph: {
      // publishedTime: page.createdAt,
      // modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function PaymentPage() {
  const cartId = (await cookies()).get('cartId')?.value;
  let cart;
  //if (cartId) {
    cart = await getCart(cartId);
  //}
  //const adresses: RadioItem[]= [{Id: "1", Title: "درب فروشگاه", Description: "یافت آباد شرقی، کوچه مسجد حاج ولی، روبروی پارکینگ شهرداری، مبلمان ملل"}];
  //const payments: RadioItem[]= [{Id: "3", Title: "کیپا", Description: "پرداخت اقساطی 12 ماهه ویژه بیمه شدگان تامین اجتماعی"}];
  const tabData: Array<TabData> = [{
    Id: "1",
    Title: <div className="flex items-center space-x-12">
    <ShoppingBagIcon className='h-6' />
  </div>,
    Content: <Suspense><PaymentBasket cart={cart} /> </Suspense>
  },
  {
    Id: "2",
    Title: 
    <div className="flex items-center space-x-12">
      <MapPinIcon className='h-6' />   
    </div>,
    Content: <p>انتخاب آدرس</p>//<RadioList title="انتخاب آدرس" items={adresses} />
  },
  {
    Id: "3",
    Title: (
    <div className="flex items-center space-x-12">
      <BanknotesIcon className='h-6' />
    </div>),
    Content: <p>نحوه پرداخت</p>//<RadioList title="" items={payments} />
  }];


  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col p-8 md:p-12 lg:flex-row lg:gap-8">
        {/* <section className="w-100 h-auto mb-3 mb-md-4 mt-3 mt-md-5">
          <div className="container">
            <div className="h-10 w-100 flex relative justify-content-between">
              <div className=" bg-success text-white relative rounded-full flex align-items-center justify-content-center">
                <ShoppingBagIcon className='h-6' />
              </div>
              <div className="  bg-success text-white relative rounded-full flex align-items-center justify-content-center">
                <MapPinIcon className='h-6'/>
              </div>
              <div className=" bg-primary text-white relative rounded-full flex align-items-center justify-content-center">
                <BanknotesIcon className='h-6'/>
              </div>
            </div>
          </div>
        </section> */}
        <div className="h-full w-full basis-full lg:basis-4/6 md:basis-1/2">
          <TabInfo key="54564787" title='تکمیل خرید' list={tabData} fullWidth={true}></TabInfo>
        </div> 
        <div className="basis-full lg:basis-2/6 md:basis-1/2">
          <CartAmount cart={cart} />
        </div> 
      </div> 
    </div> 
  );
}