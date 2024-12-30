'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
//import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { GridTileImage } from '../grid/tile';
import { SimpleProduct } from '@/lib/types/Product';

export default function SwiperProducts({ products }: {products: SimpleProduct[];}) {

  return (
      <Swiper
        //slidesPerView={6}
        breakpoints={{
          640: {
              slidesPerView: 2, 
          },
          768: {
              slidesPerView: 3, 
          },
          1024: {
              slidesPerView: 6, 
          },
          1200: {
              slidesPerView: 7, 
          }
        }}
        spaceBetween={15}
        centeredSlides={false}
        loop={true}
        speed={1500}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          waitForTransition: false,
          reverseDirection: true,
          pauseOnMouseEnter: true
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Autoplay, Navigation]} //, Pagination
        //className="text-primary"
        color='primary'
      >
        {products.map((product, i) => (
            <SwiperSlide className='mb-3' key={product.Id}>
              <Link href={`/product/${product.Id}`} className="relative h-full w-full">
                <GridTileImage
                  alt={product.Title}
                  label={{
                    title: product.Title,
                    amount: product.Price, //product.priceRange.maxVariantPrice.amount,
                    currencyCode: 'IRI' //product.priceRange.maxVariantPrice.currencyCode
                  }}
                  src={product.FeaturedImage}//?.url}
                  fill
                  //style={{ objectFit: 'cover' }}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
  );
};