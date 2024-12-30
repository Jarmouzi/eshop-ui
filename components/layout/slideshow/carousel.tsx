'use client'
import { Banner } from '@/lib/types/Banner';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function CarouselComponent({ banners }: { banners: Banner[] }) {

    return (
      <Carousel 
        autoPlay 
        infiniteLoop 
        stopOnHover
        transitionTime={2500}
        showIndicators={false} 
        showThumbs={false}
        interval={10000}>
      {banners.map((item, index) => (
        <div
            key={item.id}
            onClick={() => window.open(item.path)}
            className='h-[50vh] w-[85vw]'
        >
            <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }}/>
        </div>
      ))}
      </Carousel>
    );
  }
