import { AnimatedCarousel } from '@/components/animated-carousel';
import Banner from '@/components/banner';
import { ThreeItemGrid } from '@/components/grid/three-items';
import SlideShowComponent from '@/components/layout/slideshow';
import SwiperProducts from '@/components/swiper-products';
import { getAllBanners } from '@/lib/services/BannerService';
import { getCollectionProducts } from '@/lib/services/ProductService';
import { Suspense } from 'react';

export const runtime = 'edge';
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

export const metadata = {
  description: ' فروشگاه اینترنتی "فلان" امکان خرید نقدی، اقساطی و چکی را به صورت حضوری و غیر حضوری برای شما مشتریان گرامی فراهم می نماید | ✓فرهنگان ✓دارندگان کارتهای اعتباری حکمت، کارکنان تامین اجتماعی و ... می توانند به آسانی از این مجموعه فروشگاهی خرید نمایند',
  openGraph: {
    type: 'website',
    site_name: `%s | ${SITE_NAME}`,
    title: 'Acme',
    description: 'Acme is a...',
  },
  twitter: {
    site: `%s | ${SITE_NAME}`,
    card: '',
    title: '',
    description: '',
    image: '',
    type: '',
    url: ''
  },
};

export default async function HomePage() {
  const banners = await getAllBanners();
  const products = await getCollectionProducts('fav');
  return (
    <>
      <Suspense>
        <SlideShowComponent banners={banners}/>
      </Suspense>
      {/* <Suspense>
        <AnimatedCarousel collectionName='fav' title='پیشنهادات ویژه' />
      </Suspense> */}
      <Suspense>
        <SwiperProducts products={products} title='پیشنهادات ویژه' />
      </Suspense>
      <Suspense>
        <div className='inline-flex pl-2 pr-6 py-3 justify-center'>
          <Banner title='لوازم خانگی' src='https://localhost:7029/Statistics?path=202302071335259013.png' path='' />
          <Banner title='گوشی و تبلت' src='https://localhost:7029/Statistics?path=202302071337043448.png' path='' />
          <Banner title='لوازم جانبی' src='https://localhost:7029/Statistics?path=202302071338425222.png' path='' />
          <Banner title='ساعت هوشمند' src='https://localhost:7029/Statistics?path=202302071358587162.png' path='' />
        </div>
      </Suspense>
    </>
  );
}
