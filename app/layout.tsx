import Navbar from '@/components/layout/navbar';
//import { ensureStartsWith } from '@/lib/utils';
import { ReactNode, Suspense } from 'react';
import './globals.css';
import Footer from '@/components/layout/footer';
import { getMenu } from '@/lib/services/CategoryService';


const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const menu = await getMenu();
  return (
    <html lang="en">
      <head>

      </head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        
        <Navbar menu={menu}/>
        {/* <Suspense> */}
          <main>{children}</main>
        {/* </Suspense> */}
        <Suspense>
          <Footer menu={menu}/>
        </Suspense> 
      </body>
    </html>
  );
}
