import { SortFilterItem } from '@/lib/constants';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';
import { BarsArrowDownIcon } from '@heroicons/react/16/solid';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { Title: string; Path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({ list, title, display }: { list: ListItem[]; title?: string, display?: string }) {
  return (
    <>
      <nav className={display}>
        {title ? (
          <h3 className="`hidden text-sm text-neutral-500 dark:text-neutral-400 md:{display} p-2`">
            <BarsArrowDownIcon className='h-6' />
            {title}
          </h3>
        ) : null}
        <ul className="hidden md:{display} ">
          <FilterItemList list={list} />
        </ul>
        <ul className="md:hidden">
          <FilterItemDropdown list={list} />
        </ul>
      </nav>
    </>
  );
}
