'use server'
import { Suspense } from "react";
import { Metadata } from "next";
import ProfileTabs from "@/components/profile/profile-tabs";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
//import { useRouter } from "next/navigation";

//export const runtime = 'edge';

//export const revalidate = 60; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {

  return {
    title: 'راهنما | شرایط فروش نقدی',
    description: '',
    openGraph: {
      // publishedTime: page.createdAt,
      // modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function CashPage() {


  return (
    <Suspense>            
      <Card shadow="none">
        <CardHeader>
          شرایط فروش نقدی در سامانه انار چین
        </CardHeader>
        <CardBody>
          با ورود به سامانه می توانید به آسانی خرید نمایید
        </CardBody>
      </Card>
     </Suspense>
  );
}