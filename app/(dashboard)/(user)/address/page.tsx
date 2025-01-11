'use server'
import { Suspense } from "react";
import { Metadata } from "next";
import Address from "@/components/address/index";
import { getUserAddresses } from "@/lib/services/UserAddressService";
import { getAllStates } from "@/lib/services/StateService";
import { getAllCities } from "@/lib/services/CityService";
//import { useRouter } from "next/navigation";

//export const runtime = 'edge';

//export const revalidate = 60; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {

  return {
    title: 'آدرس های کاربر',
    description: '',
    openGraph: {
      // publishedTime: page.createdAt,
      // modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function AddressPage() {
  const addresses = await getUserAddresses();
  const states = await getAllStates();
  const cities = await getAllCities();

  return (
    <Suspense>            
      <Address userAddresses={addresses} states={states} cities={cities} />
     </Suspense>
  );
}