'use client';

import Grid from '@/components/grid';
import { GridTileImage } from '@/components/grid/tile';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/services/ProductService';
import { SimpleProduct } from '@/lib/types/Product';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function ProductGridItems() {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Sync page from URL param 'i'
  useEffect(() => {
    const iParam = searchParams.get('i');
    setPage(iParam ? parseInt(iParam, 10) : 1);
  }, [searchParams]);

  // Reset products if pathname or searchParams change (except page)
  useEffect(() => {
    setProducts([]);
    setHasMore(true);
  }, [pathname, searchParams]);

  const fetchMoreProducts = useCallback(
    async (nextPage: number, pathname: string, searchParams: URLSearchParams) => {
      if (!hasMore || loading) return;
      setLoading(true);

      let collection = '';
      const match = pathname.match(/\/search\/([^\/]+)/);
      if (match) {
        collection = match[1];
      }

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

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => (nextPage === 1 ? data : [...prev, ...data]));
      }
      setLoading(false);
    },
    [hasMore, loading]
  );

  // Fetch products when page changes
  useEffect(() => {
    fetchMoreProducts(page, pathname, searchParams);
  }, [page, pathname, searchParams, fetchMoreProducts]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);

          const params = new URLSearchParams(searchParams.toString());
          params.set('i', nextPage.toString());
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

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
            <Grid.Item key={product.Id} className="animate-fadeIn">
              <Link className="relative inline-block h-full w-full" href={`/product/${product.Id}`}>
                <GridTileImage
                  alt={product.Title}
                  label={{
                    title: product.Title,
                    amount: product.Price,
                    currencyCode: 'تومان',
                  }}
                  src={product.FeaturedImage}
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
