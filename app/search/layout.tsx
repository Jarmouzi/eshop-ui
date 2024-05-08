import Footer from '@/components/layout/footer';
import Collections from '@/components/layout/search/collections';
import SortFilter from '@/components/layout/search/sort-filter';
import FilterList from '@/components/layout/search/sort-filter';
import { sorting } from '@/lib/constants';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    {/* <Suspense> */}
      <div className="mx-auto max-w-screen-2xl flex gap-4 px-3 pb-2 text-black dark:text-white md:flex-row">
        <div className="order-first w-full flex-none md:max-w-[255px]">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <div className="order-none flex-none text-xs">
            <SortFilter list={sorting} title="مرتب سازی بر اساس" display="inline-flex" />
          </div>
          {children}
        </div>
      </div>
      <Footer />
    {/* </Suspense> */}
    </>
  );
}
