
import { Metadata } from 'next';

import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/services/ProductService';
import { getCategory } from '@/lib/services/CategoryService';

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
  const { sort } = await searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getProducts(JSON.stringify({ collection: collection, sk: sortKey, r: reverse}));

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`محصولی برای این گروه محصول یافت نشد`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
