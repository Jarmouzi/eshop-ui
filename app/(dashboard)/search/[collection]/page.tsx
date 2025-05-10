
import { Metadata } from 'next';

import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/services/ProductService';
import { getCategory } from '@/lib/services/CategoryService';
import SearchLayout from '../../../../components/layout/search/layout';
import CategoryBreadcrumb from '@/components/layout/breadcrumb/category-breadcrumb';

export const runtime = 'edge';

type Params = Promise<{ collection: string; }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Params;
  searchParams?: SearchParams;
}): Promise<Metadata> {

  const { collection } = await params; 
  const collectionItem = await getCategory(collection)
  const indexable = true; 
  
  return {
    title: collectionItem.title,
    description: 'جستجوی محصولات در گروه ' + (collectionItem.grandParentTitle + ' _ ' || '') + (collectionItem.parentTitle + ' _ ' || '') + collectionItem.title,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: Params;
  searchParams?: SearchParams;
}) {  
   const { collection } = await params; 
  // const { sort } = await searchParams as { [key: string]: string };
  // const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  // const products = await getProducts(JSON.stringify({ collection: collection, sk: sortKey, r: reverse}));

  return (
    <SearchLayout collection={collection} breadcrumb={<CategoryBreadcrumb />} children = {
    <section>
      {/* {products.length === 0 ? (
        <p className="py-3 text-lg">{`محصولی برای این گروه محصول یافت نشد`}</p>
      ) : ( 
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">*/}
          <ProductGridItems  />
        {/*</Grid>
       )} */}
    </section>} />
  );
}


// 'use client'
// import { Metadata } from 'next';
// import Grid from '@/components/grid';
// import ProductGridItems from '@/components/layout/product-grid-items';
// import { defaultSort, sorting } from '@/lib/constants';
// import { getProducts } from '@/lib/services/ProductService';
// import { getCategory } from '@/lib/services/CategoryService';
// import SearchLayout from '../../../../components/layout/search/layout';
// import CategoryBreadcrumb from '@/components/layout/breadcrumb/category-breadcrumb';
// import { useEffect, useRef, useState } from 'react';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { SimpleProduct } from '@/lib/types/Product';
// import { SearchParams } from 'next/dist/server/request/search-params';

// export const runtime = 'edge';

// type Params = Promise<{ collection: string; }>
// //type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

// export async function generateMetadata({
//   params,
//   searchParams
// }: {
//   params: Params;
//   searchParams?: SearchParams;
// }): Promise<Metadata> {

//   const { collection } = await params; 
//   const collectionItem = await getCategory(collection)
//   const indexable = true; 
  
//   return {
//     title: collectionItem.title,
//     description: 'جستجوی محصولات در گروه ' + (collectionItem.grandParentTitle + ' _ ' || '') + (collectionItem.parentTitle + ' _ ' || '') + collectionItem.title,
//     robots: {
//       index: indexable,
//       follow: indexable,
//       googleBot: {
//         index: indexable,
//         follow: indexable
//       }
//     },
//   };
// }

// export default async function CategoryPage({
//   params,
//   searchParams
// }: {
//   params: Params;
//   searchParams?: SearchParams;
// }) {  
//   const { collection } = await params; 
//   const { sort } = await searchParams as { [key: string]: string };
//   const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
//   const [products, setProducts] = useState([] as SimpleProduct[]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const observerRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Initial fetch
//     fetchMoreProducts(page);
//   }, []);

//   const fetchMoreProducts = async (nextPage: number) => {
//     setLoading(true);
//     const data = await getProducts(JSON.stringify({ collection: collection, sk: sortKey, r: reverse, i:nextPage})); 
//     setProducts((prev) => [...prev, ...data]);
//     setLoading(false);
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !loading) {
//           const nextPage = page + 1;
//           setPage(nextPage);
//           const pathname = usePathname();
//           const params = new URLSearchParams(searchParams as Record<string, string>);
//           params.set('i', nextPage.toString());
//           router.push(`${pathname}?${params}`, { scroll: false }); // Update URL without scrolling to top
//           fetchMoreProducts(nextPage);
//         }
//       },
//       { threshold: 1 }
//     );
//     if (observerRef.current) observer.observe(observerRef.current);
//     return () => observer.disconnect();
//   }, [page, loading]);

//   return (
//     <SearchLayout collection={collection} breadcrumb={<CategoryBreadcrumb />} children = {
//     <section>
//       {products.length === 0 ? (
//         <p className="py-3 text-lg">{`محصولی برای این گروه محصول یافت نشد`}</p>
//       ) : (
//         <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//           <ProductGridItems products={products} />
//           <div ref={observerRef}>{loading && 'Loading more...'}</div>
//         </Grid>
//       )}
//     </section>} />
//   );
// }

