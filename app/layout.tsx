import { ReactNode, Suspense } from 'react';
import './globals.css';
import { Providers } from './providers';


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
  return (
    <html lang="en" dir='rtl'>
      <head>

      </head>
      <body className="bg-neutral-50 text-black selection:bg-primary dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Providers>
        {/* <Suspense> */}
          <main>{children}</main>
        {/* </Suspense> */} 
        </Providers>                                                                                        
      </body>
    </html>
  );
}
