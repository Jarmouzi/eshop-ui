
import { Suspense } from "react";
import { Metadata } from "next";
import CashHelp from "@/components/help/cash";

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
      <CashHelp />
     </Suspense>
  );
}