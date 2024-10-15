import { SimpleProduct } from '@/lib/types/Product';
import React from 'react'
import SwiperProducts from './swiper-products';

export default async function Swiper({
    promise,
    title
  }: {
    promise: Promise<SimpleProduct[]>;
    title?: string;
  }) {
    const products = await promise;
    return (
        <div className="px-6 my-2 collection">
          <div className="collection">
            <h1>{title}</h1>
          </div>
          <SwiperProducts products={products} />
        </div>
      );
}
