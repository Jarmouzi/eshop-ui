'use client';

import clsx from 'clsx';
import { createUrl } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function PathFilterItem({ item, sk }: { item: Menu, sk: string }) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries())); 
  const active = searchParams.get(sk) === item.Id;
  current.set(sk, item.Id); //btoa() to base64
  const href = createUrl(pathname, current);

  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const active = pathname === item.PageAddress;
  //const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? 'p' : Link;

  //newParams.delete('q');

  return (
    <li className="mt-2 flex text-black dark:text-white text-small" key={item.Title}>
      <DynamicTag
        href={href}
        className={clsx('w-full px-3 py-1 hover:underline hover:underline-offset-4', {
          'bg-teal-600 text-white font-semibold rounded-full': active
        })}
      >
        {item.Title}
      </DynamicTag>
    </li>
  );
}
