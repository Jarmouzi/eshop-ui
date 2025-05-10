
import SearchItems from '@/components/layout/search';
import MobileSearch from '@/components/layout/search/mobile-search';
import SortFilter from '@/components/layout/search/sort-filter';
import { sorting } from '@/lib/constants';
import { GetCollectionBrands } from '@/lib/services/BrandService';
import { getCollections } from '@/lib/services/CategoryService';
import { GetCollectionOptions } from '@/lib/services/OptionService';
import { GetCollectionSuppliers } from '@/lib/services/SupplierService';
import { usePathname, useSearchParams } from 'next/navigation';


export default async function SearchLayout({ breadcrumb, children, collection }: { breadcrumb: React.ReactNode, children: React.ReactNode, collection:string }) {
  
  const collections = await getCollections();
  const options = await GetCollectionOptions(collection)
  const suppliers = await GetCollectionSuppliers(collection)
  const brands = await GetCollectionBrands(collection)

  return (
    <>
    {/* <Suspense> */}
      {breadcrumb}
      <div className="mx-auto max-w-screen-2xl flex gap-4 p-3 text-black dark:text-white md:flex-row md:col-span-5">
 
        <div className="hidden order-first w-full md:flex-none md:max-w-[255px] self-start sticky top-0 col-span-1">
          <SearchItems categories={collections} selectedItem='3788269D3B2E' options={options} brands={brands} suppliers={suppliers} />
        </div>
        <div className="order-last min-h-[70vh] w-full md:order-none col-span-4">
          <div className="order-none flex gap-1 text-xs pt-1">
            <SortFilter list={sorting} title="مرتب سازی:" display="inline-flex" />
            <div className="block flex-none md:hidden">
              <MobileSearch collection={collections} />
            </div>
          </div>
          {children}
        </div>
      </div>
    {/* </Suspense> */}
    </>
  );
}
