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
            "https://static.etma.ir/UserFiles/etmashop/Images/Slide/202312111533275526.png",
            path: "#"
        },
        {
          img:
            "https://static.etma.ir/UserFiles/etmashop/Images/Slide/202312111504595427.png",
            path: "#"
        },
        {
          img:
            "https://static.etma.ir/UserFiles/etmashop/Images/Slide/202311221552184514.png",
            path: "#"
        }
      ];
  
    return (
      <section dir='ltr' className="mx-auto grid max-w-screen-2xl gap-4 px-4 max-h-[287px] ">
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
