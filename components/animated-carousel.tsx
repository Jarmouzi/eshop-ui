import { getCollectionProducts } from '@/lib/services/ProductService';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function AnimatedCarousel({
  collectionName = 'fav',
  title
}: {
  collectionName?: string;
  title?: string;
}) {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts(collectionName);

  if (!products?.length) return null;

  const imageLoader = ( { src }: any ) => {
    const imgString = `https://fakestoreapi.com/${ src }`
    return imgString;
}

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  //const carouselProducts = [...products, ...products, ...products];

  
  return (
    <>
    <div className="px-4 collection">
      <h1>{title}</h1>
    </div>
    <div className="w-full px-4 overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-1">
        {products.map((product, i) => (
          <li
            key={`${product.Id}${i}`}
            className="relative aspect-square h-1/3 min-h-96 w-1/2 flex-none md:w-1/5" //max-h-[275px] max-w-[475px]
          >
            <Link href={`/product/${product.Id}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.Title}
                label={{
                  title: product.Title,
                  amount: product.Price, //product.priceRange.maxVariantPrice.amount,
                  currencyCode: 'IRI' //product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.FeaturedImage}//?.url}
                //fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
