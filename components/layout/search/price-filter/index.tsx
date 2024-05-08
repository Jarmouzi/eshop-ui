'use client';
import {Slider} from "@nextui-org/slider";
import React from "react";
import Search from "../../navbar/search";
import { usePathname, useSearchParams } from "next/navigation";


export function PriceRangeSlider({minPrice, maxPrice} : {minPrice: number, maxPrice: number}) {

  const [value, setValue] = React.useState([minPrice, maxPrice]);

//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   console.log(searchParams);
//   const active = searchParams.get('p') === item.slug;
//   const q = searchParams.get('q');
//   const href = createUrl(
//     pathname,
//     new URLSearchParams({
//       ...(q && { q }),
//       ...(item.slug && item.slug.length && { sort: item.slug })
//     })
//   );
//   const DynamicTag = active ? 'p' : Link;

  return (
    <>
      <div className="block gap-2 w-full h-full max-w-md items-start justify-center pb-4">
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
            onChange={setValue}   
            onMouseUp={Search}
            classNames={{
              base: "max-w-md font-semibold text-sm text-neutral-500 dark:text-neutral-400 p-2",
              filler: "bg-teal-600",
            }}
            renderThumb={({index, ...props}) => (
              <div
                {...props}
                className="group p-1 top-1/2 bg-background border-8 border-teal-600 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
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
        <pre className="text-small text-neutral-500 dark:text-neutral-400 px-4">
            از: {Array.isArray(value) && value.map((b) => ` ${new Intl.NumberFormat('fa-IR').format(b)} تومان\n`).join("تا: ")}
        </pre>
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

    </>
  );
}
