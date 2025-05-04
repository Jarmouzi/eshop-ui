import CategoryBreadcrumb from '@/components/breadcrumb/category-breadcrumb';
import SearchItems from '@/components/layout/search';
import MobileSearch from '@/components/layout/search/mobile-search';
import SortFilter from '@/components/layout/search/sort-filter';
import { sorting } from '@/lib/constants';
import { getCollections } from '@/lib/services/CategoryService';


export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  const collection = await getCollections();

  return (
    <>
    {/* <Suspense> */}
      <CategoryBreadcrumb />
      <div className="mx-auto max-w-screen-2xl flex gap-4 p-3 text-black dark:text-white md:flex-row col-span-5">
 
        <div className="order-first w-full flex-none md:max-w-[255px] self-start sticky top-0 col-span-1">
          <SearchItems categories={collection} selectedItem='3788269D3B2E' />
        </div>
        <div className="order-last min-h-[70vh] w-full md:order-none col-span-4">
          <div className="order-none flex gap-1 text-xs pt-1">
            <SortFilter list={sorting} title="مرتب سازی:" display="inline-flex" />
            <div className="md:hidden">
              <MobileSearch collection={collection} />
            </div>
          </div>
          {children}
        </div>
      </div>
    {/* </Suspense> */}
    </>
  );
}
