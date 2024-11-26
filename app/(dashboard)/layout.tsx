import Navbar from '@/components/layout/navbar';
//import { ensureStartsWith } from '@/lib/utils';
import { ReactNode, Suspense } from 'react';
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

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const menu = await getMenu();
  return (
    <>
        <Navbar menu={menu}/>
        {/* <Suspense> */}
          <main>{children}</main>
        {/* </Suspense> */}
        <Suspense>
          <Footer menu={menu}/>
        </Suspense> 
    </>
  );
}
