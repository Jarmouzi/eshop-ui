import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/constants';
import { getCategory } from '@/lib/services/CategoryService';
import { getProducts } from '@/lib/services/ProductService';
import { SearchParams } from '@/lib/types/searchParam';
import { notFound } from 'next/navigation';


export const runtime = 'edge';


// export const metadata = {
//   title: '[جستجو]',
//   description: 'جستجوی محصولات در فروشگاه '
// };

export async function generateMetadata({
  searchParams
}: {
  searchParams?: SearchParams
}) {
  const sp =  await searchParams 
  const { collection } = sp as { [key: string]: string };
  const collectionItem = await getCategory(collection)

  if (!collectionItem || !collectionItem.title) {
    return {
      title: 'جستجو',
      description: 'جستجوی محصولات در فروشگاه انار چین '
    }
  }
  const indexable = true; //!product.Tags.includes(HIDDEN_PRODUCT_TAG);

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
    // openGraph: url
    //   ? {
    //       images: [
    //         {
    //           url,
    //           width,
    //           height,
    //           alt
    //         }
    //       ]
    //     }
    //   : null
  };
}

export default async function SearchPage({
  searchParams
}: {
  searchParams?: SearchParams
}) {
  const { sort, q: searchValue, collection, lp, hp, b } = await searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts(JSON.stringify({ k: searchValue, sk: sortKey, r: reverse, c: collection, lp, hp, b}));

  if(products.length === 0) return notFound();

  return (    
    <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <ProductGridItems products={products} />
    </Grid>
  );
}
