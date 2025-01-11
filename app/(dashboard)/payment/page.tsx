import { cookies } from 'next/headers';
import { getCart } from '@/lib/services/CartService';
import CartAmount from "@/components/payment/amount";
import { Metadata } from "next";
import PaymentTablist from "@/components/payment/tab-list";
import { getUserAddresses } from '@/lib/services/UserAddressService';

export const runtime = 'edge';

export const revalidate = 60; 

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'سبد خرید',
    description: '',
    openGraph: {
      type: 'article'
    }
  };
}

export default async function PaymentPage() {
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = await getCart(cartId);     
  const addresses = await getUserAddresses();
  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col p-8 md:p-12 lg:flex-row lg:gap-8">
        <div className="h-full w-full basis-full lg:basis-4/6 md:basis-1/2">
          <PaymentTablist cart={cart} addresses={addresses} />
        </div> 
        <div className="basis-full lg:basis-2/6 md:basis-1/2">
          <CartAmount cart={cart} />
        </div> 
      </div> 
    </div> 
  );
}