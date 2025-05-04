'use client'
import { Suspense, useCallback } from 'react';
import FilterList from './list-filter';
import { PriceFilter } from './price-filter';
import CheckboxFilter from './checkbox-filter';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Accordion, AccordionItem, Divider, menu } from '@nextui-org/react';
import { Menu } from '@/lib/types/Menu';
import { useRouter } from 'next/navigation';
import SingleSelectDropDown from '@/components/dropdown/singleSelectDropDown';

// async function CollectionList() {
//   const collections = await getCollections();
//   return <FilterList list={collections} title="گروه محصولات" sk="c"/>;
// }

// const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
// const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
// const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function SearchItems({categories, selectedItem}: {categories: Menu[]; selectedItem: string | undefined}) {
  const router = useRouter();
  
  const createQueryString = (name: string, value: string) => {
      const params = new URLSearchParams();
      params.set(name, value);
      return params.toString();
    }


  const handleCollectionChange = async (key: string) => {
    router.push(`?${createQueryString('collection', key)}`);
  } 

  return (
    <Card shadow="none" className="border-1 border-primary-200 min-h-[70vh] dark:bg-neutral-900">
    <CardHeader className="font-semibold text-nowrap w-fit">
      فیلترهای جستجو
    </CardHeader>      
    <Divider/>
    <CardBody>
    <Accordion>
      <AccordionItem key="2" aria-label="گروه محصولات" title="گروه محصولات">
      <Suspense> 
        <SingleSelectDropDown 
          list={categories.map((menu: Menu) => ({id: menu.Id, title: menu.Title}))} 
          onSelectionChange={handleCollectionChange}
          selectedKey={selectedItem}/>
      </Suspense>
      </AccordionItem>
      <AccordionItem key="3" aria-label="قیمت" title="قیمت">

      <Suspense>
        <PriceFilter minPrice={10000} maxPrice={100000000} />
      </Suspense>
      </AccordionItem>
    </Accordion>
        {/* <SwitchFilter title='فقط کالاهای موجود' sk='e' /> */}
      <Suspense>
        <CheckboxFilter title='فقط کالاهای تخفیف دار' sk='b'/>
      </Suspense>
      <Suspense>
        <CheckboxFilter title='ارسال امروز' sk='d' imageUrl='https://dkstatics-public.digikala.com/digikala-static/262c38c0e4990522af759e0016a287508bbc84f6_1684761217.png'/>
      </Suspense>

    </CardBody>
  </Card>
    // <div className='group h-full w-full top-1 rounded-lg border bg-white hover:border-primary dark:bg-black'>
    //   <h1 className="text-lg font-semibold text-neutral-600 dark:text-neutral-300 p-2 pb-3">
    //     فیلترهای جستجو
    //   </h1>
    //  <Suspense
    //   //  fallback={
    //   //    <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
    //   //      <div className={clsx(skeleton, activeAndTitles)} />
    //   //      <div className={clsx(skeleton, activeAndTitles)} />
    //   //      <div className={clsx(skeleton, items)} />
    //   //      <div className={clsx(skeleton, items)} />
    //   //      <div className={clsx(skeleton, items)} />
    //   //      <div className={clsx(skeleton, items)} />
    //   //      <div className={clsx(skeleton, items)} />
    //   //      <div className={clsx(skeleton, items)} />
    //   //      <div className={clsx(skeleton, items)} />
    //   //      <div className={clsx(skeleton, items)} />
    //   //    </div>
    //   //  }
    //  > 
    //     <CollectionList/>
    //   </Suspense>
    //   <Suspense>
    //     <PriceFilter minPrice={10000} maxPrice={100000000} />
    //   </Suspense>
    //     {/* <SwitchFilter title='فقط کالاهای موجود' sk='e' /> */}
    //   <Suspense>
    //     <CheckboxFilter title='فقط کالاهای تخفیف دار' sk='b'/>
    //   </Suspense>
    //   <Suspense>
    //     <CheckboxFilter title='ارسال امروز' sk='d' imageUrl='https://dkstatics-public.digikala.com/digikala-static/262c38c0e4990522af759e0016a287508bbc84f6_1684761217.png'/>
    //   </Suspense>
    // </div>
  );
}
