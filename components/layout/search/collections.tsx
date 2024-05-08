import clsx from 'clsx';
import { Suspense } from 'react';

import FilterList from './list-filter';
import { getCollections } from '@/lib/services/CategoryService';
import { PriceRangeSlider } from './price-filter';

async function CollectionList() {
  const collections = await getCollections();
  return <FilterList list={collections} title="گروه محصولات" />;
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function Collections() {
  return (
    <div className='group h-full w-full top-1 rounded-lg border bg-white hover:border-teal-600 dark:bg-black'>
      <h1 className="text-lg font-semibold text-neutral-600 dark:text-neutral-300 p-2 pb-3">
        فیلترهای جستجو
      </h1>
     <Suspense
      //  fallback={
      //    <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
      //      <div className={clsx(skeleton, activeAndTitles)} />
      //      <div className={clsx(skeleton, activeAndTitles)} />
      //      <div className={clsx(skeleton, items)} />
      //      <div className={clsx(skeleton, items)} />
      //      <div className={clsx(skeleton, items)} />
      //      <div className={clsx(skeleton, items)} />
      //      <div className={clsx(skeleton, items)} />
      //      <div className={clsx(skeleton, items)} />
      //      <div className={clsx(skeleton, items)} />
      //      <div className={clsx(skeleton, items)} />
      //    </div>
      //  }
     > 
        <CollectionList/>
      </Suspense>

        <PriceRangeSlider minPrice={10000} maxPrice={100000000} />

    </div>
  );
}
