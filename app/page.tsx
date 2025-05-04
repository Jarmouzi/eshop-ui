import Banner from '@/components/banner';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import SlideShowComponent from '@/components/layout/slideshow';
import Swiper from '@/components/swiper';
import SwiperSuppliers from '@/components/swiper/swiper-suppliers';
import { getAllBanners } from '@/lib/services/BannerService';
import { getMenu } from '@/lib/services/CategoryService';
import { getCollectionProducts } from '@/lib/services/ProductService';
import { getAllSupplier_Brands } from '@/lib/services/Supplier_BrandService';
import { getAllSuppliers } from '@/lib/services/SupplierService';
import { SimpleProduct } from '@/lib/types/Product';
import { Supplier } from '@/lib/types/Supplier';
import { Suspense } from 'react';

//export const runtime = 'edge';
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

export const metadata = {
  description: ' فروشگاه اینترنتی انار چین امکان خرید نقدی، اقساطی و چکی را به صورت حضوری و غیر حضوری برای شما مشتریان گرامی فراهم می نماید | ✓فرهنگیان ✓دارندگان کارت های اعتباری حکمت، کارکنان تامین اجتماعی و سایر کارمندان می توانند به آسانی از این مجموعه فروشگاهی خرید نمایند',
  openGraph: {
    type: 'website',
    site_name: `%s | ${SITE_NAME}`,
    title: 'انار چین',
    description: ' فروشگاه اینترنتی انار چین امکان خرید نقدی، اقساطی و چکی را به صورت حضوری و غیر حضوری برای شما مشتریان گرامی فراهم می نماید | ✓فرهنگیان ✓دارندگان کارت های اعتباری حکمت، کارکنان تامین اجتماعی و سایر کارمندان می توانند به آسانی از این مجموعه فروشگاهی خرید نمایند',
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
  const headings = getAllBanners();
  const offeredProducts: Promise<SimpleProduct[]> = getCollectionProducts('fav');
  const offeredCategories = getAllBanners();
  const bestSellingProducts: Promise<SimpleProduct[]> = getCollectionProducts('fav');
  const suppliers: Promise<Supplier[]> = getAllSuppliers();

  const menu = await getMenu();

  return (
    <>
        <Navbar menu={menu}/>
      <Suspense fallback={<h1>Loading...</h1>}>
        <SlideShowComponent promise={headings}/>
      </Suspense>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Swiper promise={offeredProducts} title='پیشنهادات ویژه' />
      </Suspense>
      <Suspense>
        <div className='flex pl-2 pr-6 py-3 my-3 justify-center'>
          <Banner title='لوازم خانگی' src='202302071335259013.png' path='' />
          <Banner title='گوشی و تبلت' src='202302071337043448.png' path='' />
          <Banner title='لوازم جانبی' src='202302071338425222.png' path='' />
          <Banner title='ساعت هوشمند' src='202302071358587162.png' path='' />
        </div>
      </Suspense>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Swiper promise={bestSellingProducts} title='پرفروش ترین ها' />
      </Suspense>      
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="px-6 my-4 collection">
          <div className="collection">
            <h1>فروشگاه ها</h1>
          </div>
          <SwiperSuppliers suppliers={await suppliers}  />
        </div>      
      </Suspense> 
      <Suspense>
        <Footer menu={menu}/>
      </Suspense> 
    </>
  );
}


