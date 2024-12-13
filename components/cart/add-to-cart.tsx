'use client';

import clsx from 'clsx';
import { addItem } from '@/components/cart/actions';
import LoadingDots from '@/components/loading-dots';
import { ProductVariant } from '@/lib/types/Product';
import { useSearchParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { ShoppingBagIcon } from '@heroicons/react/16/solid';

import React, { startTransition, Suspense, useActionState } from 'react';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex items-center rounded-full left-0 bg-primary p-4 pr-16 tracking-wide text-white float-end';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        غیر قابل سفارش
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="لطفا مدل محصول را انتخاب نمایید"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute right-0 mr-4">
          {/* <PlusIcon className="h-5" /> */}
          <ShoppingBagIcon className='h-6' />
        </div>
        افزودن به سبد خرید
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="افزودن به سبد خرید"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        disabledClasses: pending
      })}
    >
      <div className="absolute right-0 mr-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <ShoppingBagIcon className='h-6' />}
      </div>
      افزودن به سبد خرید
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useActionState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.Id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.SelectedOptions.every(
      (option) => option.OptionValueId === searchParams.get(option.OptionId)
    )
  );
  const selectedVariantId = variant?.Id || defaultVariantId;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(() => {
      formAction(selectedVariantId); 
    });
  };
  //const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <Suspense>
      <form onSubmit={handleSubmit}>
        <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
        <p aria-live="polite" className="sr-only" role="status">
          {message}
        </p>
      </form>
    </Suspense>
  );
}
