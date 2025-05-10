'use client';
import {Slider} from "@nextui-org/slider";
import React, { Suspense } from "react";
import Search from "../../navbar/search";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";
import Link from "next/link";
import { CogIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/16/solid";

function search({value} : {value: number[]})
{
}

export function PriceFilter({minPrice, maxPrice, minValue, maxValue} : {minPrice: number, maxPrice: number, minValue: number, maxValue: number}) {

  const [value, setValue] = React.useState([minValue, maxValue]);


  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries())); 
  if(value && value.length == 2)
    {
      current.set("lp", value[0].toString());
      current.set("hp", value[1].toString());
    }
  const href = createUrl(pathname, current);

  const handleSliderChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <Suspense>
      <div className="block gap-2 w-full max-w-md items-start justify-center pb-4">
        <Slider 
            label="حدود قیمت"
            //formatOptions={{maximumFractionDigits: 15}}          
            size="sm"
            color="primary"
            step={10000}
            maxValue={maxPrice}
            minValue={minPrice}
            hideValue={true}
            value={value} 
            onChange={handleSliderChange}   
            classNames={{
              base: "max-w-md font-semibold text-sm text-neutral-500 dark:text-neutral-400 p-2",
              filler: "bg-primary",
            }}
            renderThumb={({index, ...props}) => (
              <div
                {...props}
                className="group p-1 top-1/2 bg-background border-8 border-primary shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
              >
                {/* <span
                  className={cn(
                    "transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
                    index === 0
                      ? "from-pink-200 to-pink-500 dark:from-pink-400 dark:to-pink-600" // first thumb
                      : "from-cyan-200 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800", // second thumb
                  )}
                /> */}
              </div>
            )}
        />
        <div className="flex h-full w-full">
          <pre className="w-4/5 text-small text-neutral-500 dark:text-neutral-400 px-4">
              از: {Array.isArray(value) && value.map((b) => ` ${new Intl.NumberFormat('fa-IR').format(b)} تومان\n`).join("تا: ")}
          </pre>
          
          <div className="float-left mr-0 pt-1">
            <Link className="text-primary" href={href}> 
              <MagnifyingGlassCircleIcon width="32" height="32" /> 
            </Link>
          </div>
        </div>
        {/* <div className="price-input grid mb-5"> 
        {Array.isArray(value) && value.map((v, i) => (
            <div className="flex mb-5"> 
                <span className="mr-2 mt-1 text-sm">{i == 0? 'از: ' : 'تا: '}</span> 
                <input type="text" 
                value={`${new Intl.NumberFormat('fa-IR').format(v)}`} /> 
                <span className="ml-1 pr-2 inline" >تومان</span>
            </div> 
        ))}
        </div> */}
      </div>
    </Suspense>
  );
}
