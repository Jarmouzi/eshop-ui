'use client';

import clsx from 'clsx';
import { createUrl } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function PathFilterItem({ item }: { item: Menu }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.PageAddress;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? 'p' : Link;

  newParams.delete('q');

  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.Title}>
      <DynamicTag
        href={createUrl(item.PageAddress, newParams)}
        className={clsx('w-full px-3 py-1 hover:underline hover:underline-offset-4', {
          'bg-teal-600 text-white font-semibold rounded-full': active
        })}
      >
        {item.Title}
      </DynamicTag>
    </li>
  );
}
