'use client';

import clsx from 'clsx';
import { createUrl } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { SortFilterItem } from '@/lib/constants';
import { Suspense } from 'react';

export function SortFilters({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries())); 
  const active = searchParams.get('sort') === item.slug;
  current.set("sort", (item.slug && item.slug.length ? item.slug : ""));
  //const q = searchParams.get('q');
  const href = createUrl(
    pathname,
    current
    // new URLSearchParams({
    //   ...(q && { q }),
    //   ...(item.slug && item.slug.length && { sort: item.slug })
    // })
  );
  // const search = current.toString();  
  // const query = search ? `?${search}` : "";
  //router.push(`${pathname}${query}`);
  const DynamicTag = active ? 'p' : Link;

  return (
    <Suspense>
      <li className="text-xs text-black dark:text-white" key={item.title}>
        <DynamicTag
          prefetch={!active ? false : undefined}
          href={href}
          className={clsx('w-full p-2 hover:text-primary', {
            'border-primary text-primary font-semibold rounded-full -mt-2': active
          })}
        >
          {item.title}
        </DynamicTag>
      </li>
    </Suspense>
  );
}

// export function FilterItem({ item }: { item: ListItem }) {
//   return 'path' in item ? <PathFilterItem item={item} /> : <SortFilters item={item} />;
// }
