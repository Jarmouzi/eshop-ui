'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PathFilterItem } from './item';
import { Menu } from '@/lib/types/Menu';

export default function FilterItemDropdown({ list, sk }: { list: Menu[], sk: string, }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  //const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (ref.current && !ref.current.contains(event.target as Node)) {
  //       setOpenSelect(false);
  //     }
  //   };

  //   window.addEventListener('click', handleClickOutside);
  //   return () => window.removeEventListener('click', handleClickOutside);
  // }, []);

  useEffect(() => {
    list.forEach((listItem: Menu) => {
      if (searchParams.get(sk) === listItem.Id) {
        setActive(listItem.Title);
      }
    });
  }, [pathname, list, searchParams, sk]);

  return (
    <Suspense>
      <div className="relative"> {/* ref={ref}> */}
        <div
          onClick={() => {
            setOpenSelect(!openSelect);
          }}
          className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30"
        >
          <div>{active}</div>
          <ChevronDownIcon className="h-4" />
        </div>
        {openSelect && (
          <div
            onClick={() => {
              setOpenSelect(false);
            }}
            className="absolute z-40 w-full rounded-b-md bg-white shadow-md p-1 dark:bg-black"
          >
            {list.map((item: Menu, i) => (
              <Suspense  key={i}>
                <PathFilterItem key={i} item={item} sk={sk} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
    </Suspense>
  );
}
