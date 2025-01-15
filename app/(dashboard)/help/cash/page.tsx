
import { Suspense } from "react";
import { Metadata } from "next";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export async function generateMetadata(): Promise<Metadata> {

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