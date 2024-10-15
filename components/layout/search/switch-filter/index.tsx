'use client';
import { createUrl } from "@/lib/utils";
import { Switch } from "@nextui-org/switch";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { isValidElement, Suspense } from "react";
//import {Switch} from "@nextui-org/react";


function onChange({value, sk, router, pathname, params}: 
  {value: boolean, sk: string, router: AppRouterInstance, pathname: string, params: URLSearchParams}) 
{
  params.set(sk, value.toString());
  router.push(createUrl(pathname, params));
}

export default function SwitchFilter({title, sk}: ({title: string, sk: string})){
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); 
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const active = searchParams.get(sk) === 'true';


  return (
    <Suspense>
      <div className="flex flex-col gap-2">
        <Switch isSelected={active} onValueChange={(value) => onChange({value: value, sk: sk, router: router, pathname: pathname, params: current})} key={sk} color="primary" className="text-teal-600 p-2">
          <span className="font-semibold text-sm text-neutral-500 dark:text-neutral-400 p-2">        
              {title}
          </span>
        </Switch>  
      </div>
    </Suspense>
  )  
}