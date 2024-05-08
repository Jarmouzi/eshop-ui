'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { FilterItem } from '@/lib/types/Filter';
import { PathFilterItem } from './item';


export default function FilterItemDropdown({ list, key }: { list: Menu[], key: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const current = new URLSearchParams(Array.from(searchParams.entries())); 
  // const active = searchParams.get(key) === item.slug;
  // current.set("sort", (item.slug && item.slug.length ? item.slug : ""));
  // //const q = searchParams.get('q');
  // const href = createUrl(
  //   pathname,
  //   current
  //   // new URLSearchParams({
  //   //   ...(q && { q }),
  //   //   ...(item.slug && item.slug.length && { sort: item.slug })
  //   // })
  // );
  const [active, setActive] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    list.forEach((listItem: Menu) => {
      if (
        ('path' in listItem && pathname === listItem.path) 
      ) {
        setActive(listItem.Title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative" ref={ref}>
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
            <PathFilterItem key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
