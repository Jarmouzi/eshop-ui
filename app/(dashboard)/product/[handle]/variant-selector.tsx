'use client';

import clsx from 'clsx';
import { OptionValue, ProductOption, ProductVariant } from '@/lib/types/Product';
import { createUrl } from '@/lib/utils';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// type Combination = {
//   id: string;
//   availableForSale: boolean;
//   [key: string]: string | boolean; 
// };
function findBestVariantForOption(
  options: ProductOption[],
  variants: ProductVariant[],
  selectedVariant: ProductVariant,
  option: ProductOption,
  optionValue: OptionValue
): ProductVariant | null {
  // Create candidate selectedOptions by replacing the current option's value
  const candidateOptions = selectedVariant.selectedOptions.map(opt => {
    if (opt.optionId === option.id) {
      return { optionId: option.id, optionValueId: optionValue.id };
    }
    return opt;
  });

  // Find the first variant that matches candidateOptions and is available
  return variants.find(variant =>
    variant.availableForSale &&
    variant.selectedOptions.every((opt, i) =>
      opt.optionId === candidateOptions[i].optionId &&
      opt.optionValueId === candidateOptions[i].optionValueId
    )
  ) || null;
}

function getBestVariantMap(
  options: ProductOption[],
  variants: ProductVariant[],
  selectedVariant: ProductVariant
): Record<string, Record<string, ProductVariant | null>> {
  const map: Record<string, Record<string, ProductVariant | null>> = {};

  for (const option of options) {
    map[option.id] = {};
    for (const value of option.values) {
      map[option.id][value.id] = findBestVariantForOption(
        options,
        variants,
        selectedVariant,
        option,
        value
      );
    }
  }

  return map;
}

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const selectedVariant = variants.findLast((v) => (v.selected == true)) || variants[0];
  const bestVariantMap = getBestVariantMap(options, variants, selectedVariant);

  // const combinations: Combination[] = variants.map((variant) => ({
  //   id: variant.id,
  //   availableForSale: variant.availableForSale,
  //   ...variant.selectedOptions.reduce(
  //     (accumulator, option) => ({ ...accumulator, ['o' + option.optionId]: option.optionValueId }),
  //     {}
  //   )
  // }));

  return options.map((option) => (
    <Suspense key={option.id}>
      <dl className="mb-8" key={option.id}>
        <dt className="mb-4 text-sm uppercase tracking-wide">{option.title}</dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {            
            
            const bestVariant = bestVariantMap[option.id][value.id];
            // const optionNameLowerCase = option.title.toLowerCase();
            // const optionSearchParams = new URLSearchParams(searchParams.toString());
            // optionSearchParams.set(optionNameLowerCase, value.title);
            const optionUrl = `/product/${bestVariant?.id}`;

            return (
              <button
                key={value.id}
                aria-disabled={!bestVariant}
                disabled={!bestVariant}
                onClick={() => {
                  router.replace(optionUrl, { scroll: false });
                }}
                title={`${option.title} ${value}${!bestVariant ? ' غیر قابل سفارش' : ''}`}
                className={clsx(
                  'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                  {
                    'cursor-default ring-2 ring-primary': bestVariant?.selected,
                    'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-primary ':
                      !bestVariant?.selected && bestVariant,
                    'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
                      !bestVariant
                  }
                )}
              >
                {value.title}
              </button>
            );
          })}
        </dd>
      </dl>
    </Suspense>
  ));
}
