
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/services/ProductService';

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
  // const { sort } = searchParams as { [key: string]: string };
  // const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  // const products = await getProducts(JSON.stringify({ collection: params.collection, sk: sortKey, r: reverse}));

  // if (!products) return notFound();
  const { collection } = await params; 
  return {
    title: collection, 
    description: 'جستجو بر اساس گروه محصول'
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
  const { sort } = await searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getProducts(JSON.stringify({ collection: collection, sk: sortKey, r: reverse}));

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
