'use server'
import { FormEvent, Suspense } from "react";
import { Metadata } from "next";
import Profile from "@/components/profile";
import { Card, CardBody } from "@nextui-org/card";
//import { useRouter } from "next/navigation";

//export const runtime = 'edge';

//export const revalidate = 60; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {

  return {
    title: 'پروفایل کاربر',
    description: '',
    openGraph: {
      // publishedTime: page.createdAt,
      // modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function ProfilePage() {

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