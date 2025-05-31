'use client'
import { Suspense, useCallback } from 'react';
import { PriceFilter } from './price-filter';
import CheckboxFilter from './checkbox-filter';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Accordion, AccordionItem, Divider, menu } from '@nextui-org/react';
import { Menu } from '@/lib/types/Menu';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import TreeView, { mapMenuToTreeNode } from '@/components/dropdown/treeview';
import SingleSelectDropDown from '@/components/dropdown/singleSelectDropDown';
import { Option } from '@/lib/types/Option';
import { SelectItem } from '@/lib/types/SelectItem';

// async function CollectionList() {
//   const collections = await getCollections();
//   return <FilterList list={collections} title="گروه محصولات" sk="c"/>;
// }

// const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
// const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
// const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function SearchItems({categories, options, brands, suppliers}: {categories: Menu[]; options: Option[] | null; brands: SelectItem[]; suppliers: SelectItem[];}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params: Record<string, string> = Object.fromEntries(searchParams.entries());

  const prices = [10000, 100000000]
   
  const router = useRouter();
  const dparams = useParams();
  const collection = dparams.collection;
  
  const createQueryString = (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if(value == "") 
        params.delete(name);
      else
        params.set(name, value);

      return params.toString();
    }
  const mapOptions = (option: Option) => {
    const list = option.values.map((v) => ({ id: `o${option.id}=${v.id}`, title: v.title}))    
    list.unshift({id: `o${option.id}=`, title: "همه"})
    return list;
  }

  const handleCollectionChange = async (key: string) => {
    //router.push(`?${createQueryString('collection', key)}`);
    const currentQuery = searchParams.toString(); 
    const newPath = `/search/${key}`;
    const url = currentQuery ? `${newPath}?${currentQuery}` : newPath;
    router.push(url);
  } 

  const handleOptionhange = async (key: string) => {
    const kv = key.split('=')
    router.push(`${pathname}?${createQueryString(kv[0], kv.length == 2 ? kv[1] : "")}`);
  } 

  const handleSupplierChange = async (key: string) => {
    router.push(`${pathname}?${createQueryString('su', key)}`);
  } 

  const handleBrandChange = async (key: string) => {
    router.push(`${pathname}?${createQueryString('br', key)}`);
  } 
  const items = [
    <AccordionItem key="1" aria-label="گروه محصولات" title="گروه محصولات">
      <Suspense> 
        <TreeView list={mapMenuToTreeNode(categories)} onSelectionChange={handleCollectionChange} selectedKey={collection?.toString()}/>
      </Suspense>
    </AccordionItem>,
    <AccordionItem key="2" aria-label="قیمت" title="قیمت">
      <Suspense>
        <PriceFilter minPrice={prices[0]} maxPrice={prices[1]} minValue={Number(params['lp']) || prices[0]} maxValue={Number(params['hp']) || prices[1]}  />
      </Suspense>
    </AccordionItem>,
    ...(options?.map((o, i) => (
      <AccordionItem key={i + 10} aria-label={o.title} title={o.title}>
        <Suspense>
          <SingleSelectDropDown list={mapOptions(o)} onSelectionChange={handleOptionhange} selectedKey={ `o${o.id}=${params['o' + o.id]}` || ""} />
        </Suspense>
      </AccordionItem>
    ))) ?? [],
    (brands && brands.length > 0 ? <AccordionItem key={3} aria-label='برند' title='برند'>
      <Suspense>
        <SingleSelectDropDown hasDefault list={brands} onSelectionChange={handleBrandChange} selectedKey={params['br'] ||''} />
      </Suspense>
    </AccordionItem> : null),
    (suppliers && suppliers.length > 0 ? <AccordionItem key={4} aria-label='فروشگاه' title='فروشگاه'>
      <Suspense>
        <SingleSelectDropDown hasDefault list={suppliers} onSelectionChange={handleSupplierChange} selectedKey={params['su'] ||''} />
      </Suspense>
    </AccordionItem> : null),
  ];

  return (
    <Card shadow="none" className="border-1 border-primary-200 min-h-[70vh] dark:bg-neutral-900">
    <CardHeader className="font-semibold text-nowrap w-fit">
      فیلترهای جستجو
    </CardHeader>      
    <Divider/>
    <CardBody>
      <Accordion>
        {items}
      </Accordion>
      <Suspense>
        <CheckboxFilter title='فقط کالاهای قابل سفارش' sk='e'/>
      </Suspense>
      {/* <Suspense>
        <CheckboxFilter title='ارسال امروز' sk='d' imageUrl='https://dkstatics-public.digikala.com/digikala-static/262c38c0e4990522af759e0016a287508bbc84f6_1684761217.png'/>
      </Suspense> */}

    </CardBody>
  </Card>

  );
}
