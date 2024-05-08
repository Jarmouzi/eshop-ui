import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/services/ProductService';


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

  return (    
    <>
      {products.length === 0 ? 
        (
          <div className='grid h-full w-full p-14 m-24 sm:{ m-3 p-3 } justify-center max-w-96 max-h-96 overflow-hidden rounded-lg border bg-white hover:border-teal-600 dark:bg-black'>
            <img src='notfound.png' alt='کالای مورد نظر یافت نشد' className='relative h-full w-full object-contain'/>
            <h5 className='text-teal-600 font-semibold'> محصولی با این مشخصات یافت نشد!</h5>
            <p className='text-sm'> خواهشمند است فیلتر های جستجوی خود را تغییر دهید</p>
          </div>
        ) : 
        (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </>
  );
}
