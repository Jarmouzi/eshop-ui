'use client';
import { Menu } from "@/lib/types/Menu";
import { createUrl } from "@/lib/utils";
import { Listbox, ListboxItem, Chip, ScrollShadow, Accordion } from "@nextui-org/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";


function onChange({value, sk, router, pathname, params}: 
  {value: boolean, sk: string, router: AppRouterInstance, pathname: string, params: URLSearchParams}) 
{
  params.set(sk, value.toString());
  router.push(createUrl(pathname, params));
}

export default async function AccordionTreeFilter({ list, sk }: { list: Menu[], sk: string }) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = await useSearchParams(); 
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const selectedKey = searchParams.get(sk);

 

  return (
    <Suspense>
      <Accordion className="w-full p-2 pb-3 -mr-2 mb-2 border-b-1">
        <div className="w-full p-2 pb-3 -mr-2 mb-2 border-b-1"></div>
      </Accordion>
    </Suspense>
  );
}
