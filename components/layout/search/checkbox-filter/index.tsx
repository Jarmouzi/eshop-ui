'use client';
import { createUrl } from "@/lib/utils";
import { Checkbox } from "@nextui-org/checkbox";
import { cn } from "@nextui-org/theme";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
//import {Checkbox, Link, User, Chip, cn} from "@nextui-org/react";


function onChange({value, sk, router, pathname, params}: 
  {value: boolean, sk: string, router: AppRouterInstance, pathname: string, params: URLSearchParams}) 
{
  params.set(sk, value.toString());
  router.push(createUrl(pathname, params));
}

export default function CheckboxFilter({title, sk, imageUrl}: ({title: string, sk: string, imageUrl?: string | undefined})) {
  const [isSelected, setIsSelected] = React.useState(false);
  let hidden = 'hidden';
  if(imageUrl != undefined && imageUrl && imageUrl.length) hidden = '';

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); 
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const active = searchParams.get(sk) === 'true';

  return (
    <Suspense>
      <div className="w-full p-2 pr-4 mb-2">
      <Checkbox       
        aria-label={title}
        classNames={{
          base: cn(
            "inline-flex w-full max-w-md bg-content1",
            "hover:bg-content2 items-center justify-start",
            "cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
            "data-[selected=true]:border-primary",
          ),
          label: "w-full",
        }}
        isSelected={active} 
        onValueChange={(value) => onChange({value: value, sk: sk, router: router, pathname: pathname, params: current})} 
        key={sk} 
        color="primary"
      >
        <div className="w-full flex justify-between">
          <span className="font-semibold text-sm text-neutral-500 dark:text-neutral-400 p-2">{title}</span>
          {(imageUrl != undefined && imageUrl && imageUrl.length) ? (        
            <Image src={imageUrl} alt={title} className={`${hidden} flex flex-col items-end gap-1 w-8 h-8 m-2e`} fill/>
          ) : null}
        </div>
      </Checkbox>
      </div>
    </Suspense>
  );
}
