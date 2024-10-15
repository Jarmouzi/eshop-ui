'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { createUrl } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <Suspense>
      <form onSubmit={onSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          placeholder="جستجو"
          autoComplete="off"
          defaultValue={searchParams?.get('q') || ''}
          className="w-full rounded-lg border bg-white py-2 px-10 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          🔎
          <MagnifyingGlassIcon className="h-4" />
        </div>
      </form>
    </Suspense>
  );
}
