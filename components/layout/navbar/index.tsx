import Cart from '@/components/cart';
import OpenCart from '@/components/cart/open-cart';
import LogoSquare from '@/components/logo-square';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';
import { getMenu } from '@/lib/services/CategoryService';

const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu()
  
  return (
    <nav className="relative items-center justify-between p-2 lg:px-3 z-50">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center py-1">
        <div className="flex w-full md:w-1/3">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
          <LogoSquare />
          <div className="mr-2 flex-none px-2 text-2xl font-extrabold uppercase md:hidden lg:block">
            {SITE_NAME}
          </div>
          </Link>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
      <div className="container mx-auto flex justify-between">
           {menu.length ? (
              <ul className="hidden gap-2 text-sm md:flex md:items-center">
               {menu.map((item: Menu) => {
                return (
                  item.Children.length ? (
                    <li className="hoverable hover:bg-neutral-200  hover:text-neutral-950" key={item.Id}>
                      <a href={item.PageAddress} className="relative block py-6 px-4 lg:p-4 text-xs lg:text-sm hover:bg-neutral-200  hover:text-neutral-950">{item.Title}</a>
                      <div className="p-6 mega-menu mb-2 sm:mb-0 shadow-xl bg-neutral-200">
                        <div className="container mx-auto w-full flex flex-wrap">
                        {item.Children.map((child: Menu) => {
                            return (
                              child.Children.length ? (
                              <ul className="px-2 w-full sm:w-1/3 lg:w-1/6  pb-2 pt-2 lg:pt-3">
                                <li className='mb-3' key={child.Id}>
                                <a href={item.PageAddress} className="font-bold text-xs lg:text-sm text-neutral-800 text-bold border-teal-600 pr-1 border-r-2">{child.Title}</a>
                                </li>
                                {child.Children.map((gc: Menu) => { return (                                                                            
                                  <li key={gc.Id}>
                                    <a href={gc.PageAddress} className="block p-1 hover:bg-neutral-300 text-neutral-800 hover:text-neutral-950">{gc.Title}</a>
                                  </li>
                                )})}      
                              </ul>
                              ) :
                              (
                                <ul className="px-1 w-full sm:w-1/3 lg:w-1/6 pb-1 pt-2 lg:pt-3">
                                  <a href={item.PageAddress} className="font-bold text-xs text-neutral-800 text-bold mb-1 border-teal-600 pr-1 border-r-2">{child.Title}</a>     
                                </ul>
                              )
                            )
                            })}    
                            </div>
                      </div>
                    </li>
                  )
                 :(
                  <li className="text-neutral-800 hover:text-neutral-950 hover:underline dark:text-neutral-400 dark:hover:text-neutral-300" key={item.Id}>
                    <Link href={item.PageAddress} className="relative block py-2 px-2 lg:p-4 text-xs lg:text-sm font-bold">{item.Title}</Link>
                  </li>
                  )
               )})}
              </ul>
           ) : null}
      </div>
    </nav>
  );
}
