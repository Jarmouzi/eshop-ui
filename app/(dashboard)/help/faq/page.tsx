import { Suspense } from "react";
import { Metadata } from "next";
import { Card, CardBody } from "@nextui-org/card";
//import { useRouter } from "next/navigation";

//export const runtime = 'edge';

//export const revalidate = 60; // 12 hours in seconds

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'پشتیبانی',
    description: '',
    openGraph: {
      // publishedTime: page.createdAt,
      // modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function FAQPage() {


  return (
    <Suspense>            
      <Card shadow="none">
        <CardBody>
          بخش پشتیبانی
        </CardBody>
      </Card>
     </Suspense>
  );
}