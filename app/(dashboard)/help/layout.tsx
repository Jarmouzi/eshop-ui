
import VerticalTab from '@/components/tab/vertical-tab';
import { HelpMenuData, } from '@/lib/constants';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/react';

export default function HelpLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <div className="mx-auto max-w-screen-2xl flex gap-4 px-3 pb-2 text-black dark:text-white md:flex-row col-span-5">
        <div className="hidden order-first max-w-[355px] self-start sticky top-0 col-span-1 md:flex">
          <Card shadow="none" className="border-1 border-primary-200 min-h-[70vh]">
            <CardHeader className="font-semibold text-nowrap w-fit">
            راهنمای خرید از انار چین 
            </CardHeader>      
            <Divider/>
            <CardBody>
              <VerticalTab list={HelpMenuData} />
            </CardBody>
          </Card>
        </div>
        <div className="order-last min-h-[70vh] w-full md:order-none col-span-4">
          {children}
        </div>
        </div>
    </>
  );
}
