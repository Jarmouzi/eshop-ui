'use client';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Price from '@/components/price';
import { DEFAULT_OPTION } from '@/lib/constants';
import { createUrl } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { DeleteItemButton } from '../cart/delete-item-button';
import { EditItemQuantityButton } from '../cart/edit-item-quantity-button';
import { Cart } from '@/lib/types/Cart';
import Link from 'next/link';
import Image from 'next/image';

type ProductVariantSearchParams = {
  [key: string]: string;
};

export default function PaymentBasket({ cart }: { cart: Cart | undefined }) {

  const [quantity, setQuantity] = useState(cart?.Quantity);

  useEffect(() => {
    if (cart?.Quantity !== quantity) {
      setQuantity(cart?.Quantity);
    }
  }, [cart?.Quantity, quantity]);

  return (
    <div className="">

        {!cart || !cart.Items || cart.Items?.length === 0 ? (
        <div className="m-24 flex text-neutral-300 w-full items-center justify-center overflow-hidden">
            <ShoppingCartIcon className="h-16" />
            <p className="text-center text-2xl font-bold">سبد خرید شما خالیست.</p>
        </div>
        ) : (
        <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="flex-grow overflow-auto py-4">
            {cart.Items.map((item, i) => {
                const ProductVariantSearchParams = {} as ProductVariantSearchParams;
                item.ProductVariant.SelectedOptions.forEach(({ OptionId, OptionValueId }) => {
                if (OptionValueId !== DEFAULT_OPTION) {
                    ProductVariantSearchParams[OptionId.toLowerCase()] = OptionValueId;
                }
                });

                const ProductVariantUrl = createUrl(
                `/product/${item.ProductVariant.Product.Id}`,
                new URLSearchParams(ProductVariantSearchParams)
                );

                return (
                  <li
                  key={i}
                  className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                >
                  <div className="relative flex w-full flex-row justify-between px-1 py-4">
                    <div className="absolute z-40 -mt-2 float-right">
                      <DeleteItemButton item={item} />
                    </div>
                    <Link
                      href={ProductVariantUrl}
                      className="z-30 flex flex-row space-x-2"
                    >
                      <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                        <Image
                          className="h-full w-full object-cover"
                          width={64}
                          height={64}
                          alt={
                            item.ProductVariant.Product.FeaturedImage.AltText ||
                            item.ProductVariant.Product.Title
                          }
                          src={item.ProductVariant.Product.FeaturedImage.Url}
                        />
                      </div>
                      <div className="flex flex-1 flex-col text-base">
                        <span className="leading-tight text-sm pr-1">
                          {item.ProductVariant.Product.Title}
                        </span>
                        {/* {item.ProductVariant.Title !== DEFAULT_OPTION ? (
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {item.ProductVariant.Title}
                          </p>
                        ) : null} */}
                      </div>
                    </Link>
                    <div className="flex h-16 flex-col justify-between">
                      <Price
                        className="flex justify-end space-y-2 text-right text-sm font-semibold"
                        amount={item.Amount}
                      />
                      <div className="mr-auto flex h-9 flex-row items-center rounded-full border border-neutral-300 dark:border-neutral-700">
                        <EditItemQuantityButton item={item} type="minus" />
                        <p className="w-6 text-center">
                          <span className="w-full text-sm">{item.Quantity}</span>
                        </p>
                        <EditItemQuantityButton item={item} type="plus" />
                      </div>
                    </div>
                  </div>
                </li>
                );
            })}
            </ul>
        </div>
        
        )}
    </div>
  );
}
