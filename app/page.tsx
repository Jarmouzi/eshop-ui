import { AnimatedCarousel } from '@/components/animated-carousel';
import { ThreeItemGrid } from '@/components/grid/three-items';
import Footer from '@/components/layout/footer';
import { SlideShowComponent } from '@/components/layout/slideshow';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <SlideShowComponent />
      <Suspense>
        <AnimatedCarousel collectionName='fav' title='پیشنهادات ویژه' />
        <Suspense>
          <Footer />
        </Suspense> 
      </Suspense>
    </>
  );
}
