'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Price from '@/components/price';
import { DEFAULT_OPTION } from '@/lib/constants';
import { createUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import CloseCart from './close-cart';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';
import { Cart } from '@/lib/types/Cart';

type ProductVariantSearchParams = {
  [key: string]: string;
};

export default function CartModal({ cart }: { cart: Cart | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  //const quantityRef = useRef(cart?.Quantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // useEffect(() => {
  //   // Open cart modal when quantity changes.
  //   if (cart?.Quantity !== quantityRef.current) {
  //     // But only if it's not already open (quantity also changes when editing items in cart).
  //     if (!isOpen) {
  //       setIsOpen(true);
  //     }

  //     // Always update the quantity reference
  //     quantityRef.current = cart?.Quantity;
  //   }
  // }, [cart?.Quantity, isOpen]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.Quantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
              <div className="flex items-center justify-between text-neutral-500">
                <p className="text-lg font-semibold">سبد خرید</p>

                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart className='text-neutral-500' />
                </button>
              </div>

              {!cart || !cart.Items || cart.Items?.length === 0 ? (
                <div className="mt-20 flex text-neutral-500 w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">سبد خرید شما خالیست.</p>
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
                              onClick={closeCart}
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
                                className="flex justify-end space-y-2 text-right text-sm"
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
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>مالیات بر ارزش افزوده</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cart.TaxAmount}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>هزینه حمل</p>
                      <p className="text-right">پس کرایه، به عهده مشتری</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>مبلغ قابل پرداخت</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cart.TotalAmount}
                      />
                    </div>
                  </div>
                  <a
                    href={'/payment/'}
                    className="block w-full rounded-full bg-primary p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    تکمیل سفارش
                  </a>
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
