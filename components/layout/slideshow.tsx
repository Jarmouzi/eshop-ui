'use client'
import { GridTileImage } from '@/components/grid/tile';
import { getAllBanners } from '@/lib/services/BannerService';
import { Banner } from '@/lib/types/Banner';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export default function SlideShowComponent({ banners }: { banners: Banner[] }) {
    //const banners1 = await getAllBanners()
    console.log(banners)

    // const banners = [
    //     {
    //       id: '895ba62a-5b8f-4862-b9d3-059867abd884',
    //       image: "/banner1.png",
    //       title: "فروش ویژه اقساطی خودرو",
    //       path: "#"
    //     },
    //     {
    //       id: '895ba62a-325f-4862-b9d3-059867abd884',
    //       image:"/202312111533275526.png",
    //       title: "فروش ویژه اقساطی خودرو",
    //       path: "#"
    //     }
    //   ];
  
    return (
      <section dir='ltr' className="mx-auto inline-block max-w-screen-2xl gap-4 px-4 max-h-[287px] ">
      <Carousel autoPlay infiniteLoop showIndicators={false} showThumbs={false}>
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
