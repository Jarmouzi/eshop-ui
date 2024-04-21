'use client'
import { GridTileImage } from '@/components/grid/tile';
import { getCollectionProducts } from '@/lib/shopify';
import type { Product } from '@/lib/shopify/types';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export async function SlideShowComponent() {
    //const homepageItems = await getHeadLines();

    const data = [
        {
          img:
            "/banner1.png",
            path: "#"
        },
        {
          img:
            "/202312111533275526.png",
            path: "#"
        }
      ];
  
    return (
      <section dir='ltr' className="mx-auto inline-block max-w-screen-2xl gap-4 px-4 max-h-[287px] ">
      <Carousel autoPlay infiniteLoop showIndicators={false} showThumbs={false}>
      {data.map((item, index) => (
        <div
            key={index}
            onClick={() => window.open(item.path)}
        >
            <img src={item.img} alt="img" />
        </div>
      ))}
      </Carousel>
  
      </section>
    );
  }
