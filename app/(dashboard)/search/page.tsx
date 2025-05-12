import ProductGridItems from '@/components/layout/product-grid-items';
import { getCategory } from '@/lib/services/CategoryService';
import { SearchParams } from '@/lib/types/searchParam';
import SearchLayout from '../../../components/layout/search/layout';
import CategoryBreadcrumb from '@/components/layout/breadcrumb/category-breadcrumb';

//export const runtime = 'edge';

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
   const { collection } = await searchParams as { [key: string]: string };
  // const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  // const products = await getProducts(JSON.stringify({ k: searchValue, sk: sortKey, r: reverse, c: collection, lp, hp, b}));
  //if(products.length === 0) return notFound();

  return (    
    <SearchLayout collection={collection} breadcrumb={<CategoryBreadcrumb />}>
        <ProductGridItems />
    </SearchLayout>
  );
}
