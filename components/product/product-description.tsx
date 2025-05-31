import { AddToCart } from '@/components/cart/add-to-cart';
import Price from '@/components/price';
import Prose from '@/components/prose';
import { VariantSelector } from '../../app/(dashboard)/product/[handle]/variant-selector';
import { Product } from '@/lib/types/Product';
import { Chip } from '@nextui-org/react';
import { Suspense } from 'react';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-xl font-medium">{product.title}</h1>
        
        <h6 className="flex mb-2 text-xs font-light text-neutral-600 justify-start">{product.title_En}</h6>
        <div className="flex mr-auto w-auto rounded-full bg-primary p-2 text-sm text-white justify-end">
          <Price
            amount={product.price} //priceRange.maxVariantPrice.amount}
          />
        </div>
      </div>
      <Suspense>
        <VariantSelector options={product.options} variants={product.variants} />
      </Suspense>
      {/* {product.Description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.Description}
        />
      ) : null} */}
      {/* <Chip
        startContent={<h2></h2>}
        variant="faded"
        color="success"
      ></Chip> */}
      <Suspense>
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      </Suspense>
    </>
  );
}
