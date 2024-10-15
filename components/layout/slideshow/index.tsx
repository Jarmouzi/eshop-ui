import { Banner } from '@/lib/types/Banner';
import React from 'react'
import CarouselComponent from './carousel';

export default async function SlideShow({
    promise,
    title
  }: {
    promise: Promise<Banner[]>;
    title?: string;
  }) {
    const banners = await promise;
    return (
      <section dir='ltr' className="mx-auto inline-block max-w-screen-2xl gap-4 px-4 max-h-[287px] ">
        <CarouselComponent banners={banners} />  
      </section>
    );
}
