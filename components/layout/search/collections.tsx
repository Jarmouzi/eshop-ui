import clsx from 'clsx';
import { Suspense } from 'react';

import FilterList from './list-filter';
import { getCollections } from '@/lib/services/CategoryService';
import { PriceFilter } from './price-filter';
//import SwitchFilter from './switch-filter';
import CheckboxFilter from './checkbox-filter';

async function CollectionList() {
  const collections = await getCollections();
  return <FilterList list={collections} title="گروه محصولات" sk="c"/>;
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
      <Suspense>
        <PriceFilter minPrice={10000} maxPrice={100000000} />
      </Suspense>
        {/* <SwitchFilter title='فقط کالاهای موجود' sk='e' /> */}
      <Suspense>
        <CheckboxFilter title='فقط کالاهای تخفیف دار' sk='b'/>
      </Suspense>
      <Suspense>
        <CheckboxFilter title='ارسال امروز' sk='d' imageUrl='https://dkstatics-public.digikala.com/digikala-static/262c38c0e4990522af759e0016a287508bbc84f6_1684761217.png'/>
      </Suspense>
    </div>
  );
}
