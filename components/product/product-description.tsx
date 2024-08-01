import { AddToCart } from '@/components/cart/add-to-cart';
import Price from '@/components/price';
import Prose from '@/components/prose';
import { VariantSelector } from './variant-selector';
import { Product } from '@/lib/types/Product';
import { Chip } from '@nextui-org/react';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-xl font-medium">{product.Title}</h1>
        
        <h6 className="flex mb-2 text-xs font-light text-neutral-600 justify-start">{product.Title_En}</h6>
        <div className="flex mr-auto w-auto rounded-full bg-teal-600 p-2 text-sm text-white justify-end">
          <Price
            amount={product.Price} //priceRange.maxVariantPrice.amount}
          />
        </div>
      </div>
      <VariantSelector options={product.Options} variants={product.Variants} />

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

      <AddToCart variants={product.Variants} availableForSale={product.AvailableForSale} />
    </>
  );
}
