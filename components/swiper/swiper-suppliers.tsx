'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
//import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { GridTileImage } from '../grid/tile';
import { Supplier } from '@/lib/types/Supplier';
import { GridBoxImage } from '../grid/box';

export default function SwiperSuppliers({ suppliers }: {suppliers: Supplier[];}) {

  console.log(suppliers)
  return (
      <Swiper
        //slidesPerView={6}
        breakpoints={{
          768: {
              slidesPerView: 1, 
          },
          1024: {
              slidesPerView: 2, 
          },
          1200: {
              slidesPerView: 4, 
          }
        }}
        spaceBetween={15}
        centeredSlides={false}
        // loop={true}
        // speed={1500}
        // autoplay={{
        //   delay: 7000,
        //   disableOnInteraction: false,
        //   waitForTransition: false,
        //   reverseDirection: true,
        //   pauseOnMouseEnter: true
        // }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[ Navigation]} //Autoplay,, Pagination
        //className="text-primary"
        color='primary'
      >
        { suppliers && suppliers.map((supplier, i) => (
            <SwiperSlide className='gap-4' key={supplier.id}>
              <Link href={`/supplier/${supplier.id}/${supplier.title}`} className="h-full w-full ">
                <GridBoxImage
                  alt={supplier.title}
                  label={{
                    title: supplier.title,
                    logo: supplier.logo, 
                    signe: supplier.signe 
                  }}
                  src={supplier.banner}//?.url}
                  fill
                  className="object-cover"
                  priority
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
  );
};