'use client';

import Grid from '@/components/grid';
import { GridTileImage } from '@/components/grid/tile';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/services/ProductService';
import { SimpleProduct } from '@/lib/types/Product';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function ProductGridItems() {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset state when filters change
  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
  }, [pathname, searchParams]);

  const dparams = useParams();
  const fetchMoreProducts = useCallback(
    async (nextPage: number) => {
      if (!hasMore || loading) return;
      setLoading(true);
      const collection = dparams.collection;

      const params: Record<string, string> = Object.fromEntries(searchParams.entries());
      const { sortKey, reverse } = sorting.find((item) => item.slug === params['sort']) || defaultSort;
      const { sort, i, ...restParams } = params;

      const requestObj = {
        collection,
        sk: sortKey,
        r: reverse,
        i: nextPage,
        ...restParams,
      };

      const data = await getProducts(JSON.stringify(requestObj));
      console.log(data)
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => (nextPage === 1 ? data : [...prev, ...data]));
      }
      setLoading(false);
    },
    [hasMore, loading]
  );

  // // Fetch products when page changes
  // useEffect(() => {
  //   fetchMoreProducts(page, pathname, searchParams);
  // }, [page, pathname, searchParams, fetchMoreProducts]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);

          // const params = new URLSearchParams(searchParams.toString());
          // params.set('i', nextPage.toString());
          // router.push(`${pathname}?${params.toString()}`, { scroll: false });
          fetchMoreProducts(nextPage);//, pathname, searchParams);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [page, loading, hasMore, pathname, searchParams, router]);

  return (
    <>
      {products.length === 0 ? (
        <p className="py-3 text-lg">محصولی یافت نشد</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Grid.Item key={product.id} className="animate-fadeIn">
              <Link className="relative inline-block h-full w-full" href={`/product/${product.id}`}>
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.price,
                    currencyCode: 'تومان',
                  }}
                  src={product.featuredImage}
                  fill
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </Link>
            </Grid.Item>
          ))}
        </Grid>
      )}
      <div ref={observerRef}>
        {loading && 'بارگذاری محصولات...'}
        {!hasMore && products.length > 0 && <p className="py-3">محصولات بیشتری یافت نشد</p>}
      </div>
    </>
  );
}
