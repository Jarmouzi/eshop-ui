import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/services/ProductService';
import { notFound } from 'next/navigation';


export const runtime = 'edge';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export const metadata = {
  title: '[جستجو]',
  description: 'جستجوی محصولات در فروشگاه '
};

export default async function SearchPage({
  searchParams
}: {
  searchParams?: SearchParams
}) {
  const { sort, q: searchValue } = await searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  //const products = await getProducts(`{"k": "${searchValue}", "sk": "${sortKey}", "r": "${reverse}"}`);
  const products = await getProducts(JSON.stringify({ k: searchValue, sk: sortKey, r: reverse}));

  if(products.length === 0) return notFound();

  return (    
    <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <ProductGridItems products={products} />
    </Grid>
  );
}
