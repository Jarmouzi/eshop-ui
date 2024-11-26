import Collections from '@/components/layout/search/collections';
import SortFilter from '@/components/layout/search/sort-filter';
import FilterList from '@/components/layout/search/sort-filter';
import ProfileTabs from '@/components/profile/profile-tabs';
import { sorting } from '@/lib/constants';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/react';
import { Suspense } from 'react';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl flex gap-4 px-3 pb-2 text-black dark:text-white md:flex-row col-span-5">
        <div className="hidden order-first max-w-[355px] self-start sticky top-0 col-span-1 md:flex">
          <Card shadow='sm' className="min-h-[80vh]">
            <CardHeader className="font-semibold text-nowrap w-fit">
            کاربر گرامی خوش آمدید 
            </CardHeader>      
            <Divider/>
            <CardBody>
              <ProfileTabs />
            </CardBody>
          </Card>
        </div>
        <div className="order-last min-h-screen w-full md:order-none col-span-4">
          {children}
        </div>
        </div>
    {/* <Suspense> */}
      {/* <div className="mx-auto max-w-screen-2xl flex gap-4 px-3 pb-2 text-black dark:text-white md:flex-row col-span-5">
        <div className="order-first w-full flex-none md:max-w-[255px] self-start sticky top-0 col-span-1">
            <div className='group h-full w-full top-1 rounded-lg border bg-white hover:border-primary dark:bg-black'>
                <h2 className="text-lg font-semibold text-neutral-600 dark:text-neutral-300 p-2 pb-3">
                    کاربر گرامی خوش آمدید
                </h2>
                <hr />
                <ProfileTabs />

            </div>
        </div>
        <div className="order-last min-h-screen w-full md:order-none col-span-4">
          {children}
        </div>
      </div> */}
    {/* </Suspense> */}
    </>
  );
}
