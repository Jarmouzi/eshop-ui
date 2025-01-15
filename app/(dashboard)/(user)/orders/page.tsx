'use server'
import { Suspense } from "react";
import { Metadata } from "next";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
//import { useRouter } from "next/navigation";

//export const runtime = 'edge';

//export const revalidate = 60; // 12 hours in seconds

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'سوابق خرید',
    description: '',
    openGraph: {
      // publishedTime: page.createdAt,
      // modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function ordersPage() {

  return (
    <Suspense>            
          <Card shadow="sm" className="border-1 border-primary-200 min-h-[70vh]">
            <CardHeader className="font-semibold text-nowrap w-fit">
            سوابق خرید
            </CardHeader>      
            <Divider/>
            <CardBody>
            </CardBody>
          </Card>
     </Suspense>
  );
}