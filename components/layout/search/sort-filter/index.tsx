import { SortFilterItem } from '@/lib/constants';
import FilterItemDropdown from './dropdown';
import { BarsArrowDownIcon } from '@heroicons/react/16/solid';
import { SortFilters } from './item';
import { Suspense } from 'react';


function FilterItemList({ list }: { list: SortFilterItem[] }) {
  return (
    <>
      {list.map((item: SortFilterItem, i) => (
        <Suspense key={i}>
          <SortFilters key={i} item={item} />
        </Suspense>
      ))}
    </>
  );
}

export default function SortFilter({ list, title, display }: { list: SortFilterItem[]; title?: string, display?: string }) {
  return (
    <>
      <nav className={display}>
        {title ? (
          <h3 className="`hidden inline-flex font-semibold text-neutral-600 dark:text-neutral-400 px-3 md:display`">
            <BarsArrowDownIcon className='h-4 transform scale-x-[-1]' />
            {title}
          </h3>
        ) : null}
        <ul className="inline-flex md:display">
          <FilterItemList list={list} />
        </ul>
        <ul className="md:hidden">
          <Suspense>
            <FilterItemDropdown list={list} />
          </Suspense>
        </ul>
      </nav>
    </>
  );
}
