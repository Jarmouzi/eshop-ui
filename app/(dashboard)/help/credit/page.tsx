'use server'
import { Suspense } from "react";
import { Metadata } from "next";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
//import { useRouter } from "next/navigation";

//export const runtime = 'edge';

//export const revalidate = 60; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {

  return {
    title: 'پیام های شما',
    description: '',
    openGraph: {
      // publishedTime: page.createdAt,
      // modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function CreditPage() {


  return (
    <Suspense>            
      <Card shadow="none" className="border-1 border-primary-200  min-h-[70vh]">
        <CardHeader className="font-semibold text-nowrap w-fit">
          شرایط خرید اقساطی
        </CardHeader> 
        <Divider/>
        <CardBody>
          <p className='p-2 text-right'>
            با داشتن انواع کیف پول مجازی مانند دیجی پی یا اسنپ پی به آسانی می توانید از فروشگاه انارچین خرید کنید. برای اطلاع از چگونگی دریافت کیف پول مجازی بر روی گزینه مورد نظر خود کلیک نمایید
          </p>
          
          <div className='flex p-2 justify-center'>
            <Card
              className="m-2 border-primary-200 border-1 bg-background/60 dark:bg-default-100/50 max-w-[610px] w-1/3"
              shadow="none"
            >
              <CardBody>
                <Link href="https://etma.ir/fa/content/11415-%D8%A8%D9%84%D9%88-%D8%A8%D8%A7%D9%86%DA%A9">
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center h-28">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="شرایط دریافت کیف پول بلو بانک"
                      style={{ objectFit: 'cover' }}
                      src="https://localhost:7029/Statistics?path=notfound.png&width=640&height=-1"
                      fill
                    />
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-8">
                    شرایط دریافت کیف پول بلو بانک
                  </div>
                </div>
                </Link>
              </CardBody>
            </Card>
            <Card
              className="m-2 border-primary-200 border-1 bg-background/60 dark:bg-default-100/50 max-w-[610px] w-1/3"
              shadow="none"
            >
              <CardBody>
                <Link href="https://etma.ir/fa/content/11415-%D8%A8%D9%84%D9%88-%D8%A8%D8%A7%D9%86%DA%A9">
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center h-28">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="شرایط دریافت کیف پول بلو بانک"
                      style={{ objectFit: 'cover' }}
                      src="https://localhost:7029/Statistics?path=notfound.png&width=640&height=-1"
                      fill
                    />
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-8">
                    شرایط دریافت کیف پول بلو بانک
                  </div>
                </div>
                </Link>
              </CardBody>
            </Card>
            <Card
              isBlurred
              className="m-2 border-primary-200 border-1  bg-background/60 dark:bg-default-100/50 max-w-[610px] w-1/3"
              shadow="none"
            >
              <CardBody>
                <Link href="https://etma.ir/fa/content/11415-%D8%A8%D9%84%D9%88-%D8%A8%D8%A7%D9%86%DA%A9">
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center h-28">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="شرایط دریافت کیف پول بلو بانک"
                      style={{ objectFit: 'cover' }}
                      src="https://localhost:7029/Statistics?path=notfound.png&width=640&height=-1"
                      fill
                    />
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-8">
                    شرایط دریافت کیف پول بلو بانک
                  </div>
                </div>
                </Link>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
     </Suspense>
  );
}