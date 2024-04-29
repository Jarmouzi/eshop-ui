'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from '@/components/cart/actions';
import LoadingDots from '@/components/loading-dots';
import { ProductVariant } from '@/lib/types/Product';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { ShoppingBagIcon } from '@heroicons/react/16/solid';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex items-center rounded-full left-0 bg-teal-600 p-4 pr-16 tracking-wide text-white float-end';
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
      <div className="absolute right-0 ml-4">
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
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.Id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.SelectedOptions.every(
      (option) => option.OptionValueId === searchParams.get(option.OptionId)
    )
  );
  const selectedVariantId = variant?.Id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
