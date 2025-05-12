
import { Metadata } from 'next';

import ProductGridItems from '@/components/layout/product-grid-items';
import { getCategory } from '@/lib/services/CategoryService';
import SearchLayout from '../../../../components/layout/search/layout';
import CategoryBreadcrumb from '@/components/layout/breadcrumb/category-breadcrumb';

//export const runtime = 'edge';

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

export default async function CategoryPage({params}: {params: Params;}) {  

  const { collection } = await params; 

  return (
    <SearchLayout collection={collection} breadcrumb={<CategoryBreadcrumb />}>
      <section>
        <ProductGridItems  />
      </section>
    </SearchLayout>
  );
}
