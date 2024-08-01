'use client'
import { GridTileImage } from '@/components/grid/tile';
import { Banner } from '@/lib/types/Banner';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export default function SlideShowComponent({ banners }: { banners: Banner[] }) {
  
    return (
      <section dir='ltr' className="mx-auto inline-block max-w-screen-2xl gap-4 px-4 max-h-[287px] ">
      <Carousel autoPlay infiniteLoop 
      transitionTime={1500}
      showIndicators={false} showThumbs={false}>
      {banners.map((item, index) => (
        <div
            key={item.id}
            onClick={() => window.open(item.path)}
        >
            <img src={item.image} alt={item.title} />
        </div>
      ))}
      </Carousel>
  
      </section>
    );
  }
