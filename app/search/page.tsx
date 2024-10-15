import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/services/ProductService';
import Image from 'next/image';
import { notFound } from 'next/navigation';


export const runtime = 'edge';

export const metadata = {
  title: '[جستجو]',
  description: 'جستجوی محصولات در فروشگاه '
};

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
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
