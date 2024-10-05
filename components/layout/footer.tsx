import Link from 'next/link';

import FooterMenu from '@/components/layout/footer-menu';
import LogoSquare from '@/components/logo-square';
import {getMenu} from '@/lib/services/CategoryService';
import { Suspense } from 'react';
import { menu } from '@nextui-org/theme';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer({menu}: {menu: Menu[];}) {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024 + (currentYear > 2024 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  const Footer = (m: Menu[]) => {
    m = menu;
    return (<footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link className="flex items-center gap-2 text-black dark:text-white md:pt-1" href="/">
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={m} />
        </Suspense>
        <div className="md:mr-auto">
          <a
            className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white"
            aria-label="طراحی و پیاده سازی توسط تیم کاسب یار"
            href="https://kasebyar.com/"
          >
            <span className="px-3">▲</span>
            <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
            <span className="px-3">Deploy</span>
          </a>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} 
            تمامی حقوق این سامانه متعلق به {copyrightName} می باشد.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p className="md:mr-auto">
            <a href="https://kasebyar.com" className="text-black dark:text-white">
              طراحی، پیاده سازی و پشتیبانی توسط تیم ▲ کاسب یار 
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
};
}
