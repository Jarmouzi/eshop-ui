import FilterItemDropdown from './dropdown';
import { BarsArrowDownIcon } from '@heroicons/react/16/solid';
import { PathFilterItem } from './item';
import { FilterItem } from '@/lib/types/Filter';

function FilterItemList({ list }: { list: Menu[] }) {
  return (
    <>
      {list.map((item: Menu, i) => (
        <PathFilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({ list, title }: { list: Menu[]; title?: string }) {
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
          <FilterItemDropdown list={list} />
        </ul>
      </nav>
    </>
  );
}
