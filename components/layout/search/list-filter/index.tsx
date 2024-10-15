import FilterItemDropdown from './dropdown';
import { BarsArrowDownIcon } from '@heroicons/react/16/solid';
import { PathFilterItem } from './item';
import { FilterItem } from '@/lib/types/Filter';
import { Suspense } from 'react';

function FilterItemList({ list, sk }: { list: Menu[], sk: string }) {
  return (
    <>
      {list.map((item: Menu, i) => (
        <Suspense key={i}>
          <PathFilterItem key={i} item={item} sk={sk} />
        </Suspense>
      ))}
    </>
  );
}

export default function FilterList({ list, title, sk }: { list: Menu[]; title?: string; sk: string; }) {
  return (
    <>
      <nav className="block pb-4">
        {title ? (
          <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 px-2">
            {title}
          </h3>
        ) : null}
        {/* <ul className="hidden md:display">
          <FilterItemList list={list} />
        </ul> */}
        <ul className='p-2'>
          <Suspense key={1}>
            <FilterItemDropdown list={list} sk={sk} />
          </Suspense>
        </ul>
      </nav>
    </>
  );
}
