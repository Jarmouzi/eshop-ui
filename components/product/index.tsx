import { Image, Product, SimpleProduct } from '@/lib/types/Product';
import { Suspense } from 'react';
import { ProductDescription } from './product-description';
import TabInfo from '../tab/tab-info';
import { GridTileImage } from '../grid/tile';
import Link from 'next/link';
import { TabData } from '@/lib/types/TabData';
import FeatureList from '../list/feature-list';
import { Gallery } from './gallery';
import Swiper from '../swiper';
import ProductBreadcrumb from '../layout/breadcrumb/product-breadcrumb';

export default async function ProductDetails({product, relatedProducts}: {product: Product, relatedProducts:Promise<SimpleProduct[]>}) {

    const tabData: Array<TabData> = [{
      Id: "1",
      Title: "معرفی محصول",
      Content: <p className='p-5 text-justify'>{product.description}</p>
    }];
    if(product.features)
      tabData.push({
        Id: "2",
        Title: "ویژگی های محصول",
        Content: <FeatureList list={product.features} title='ویژگی های محصول' ></FeatureList> 
      });

 return (
    <>
      <ProductBreadcrumb />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 mb-3 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-2/6 md:basis-1/2">
            <Suspense>
              <Gallery 
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div> 
          <div className="basis-full lg:basis-4/6 md:basis-1/2">
            <ProductDescription product={product} />
          </div>
        </div>
        
        <TabInfo key="54564787" title='جزئیات محصول' list={tabData}></TabInfo>

        <Suspense>
          <RelatedProducts relatedProducts={relatedProducts} />
        </Suspense>
      </div>
    </>
  );
}

async function RelatedProducts({ relatedProducts }: { relatedProducts: Promise<SimpleProduct[]> }) {

    //if (!relatedProducts.length) return null;
  
    return (
      
      <Suspense fallback={<h1>Loading...</h1>}>
        <Swiper promise={relatedProducts} title='محصولات مشابه' />
      </Suspense>
      // <div className="py-4">
      //   <div className="px-4 collection">
      //     <h1>محصولات مشابه</h1>
      //   </div>
      //   <ul className="flex w-full gap-4 overflow-x-auto overflow-y-hidden pt-1">
      //     {relatedProducts.map((product) => (
      //       <li
      //         key={product.id}
      //         className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6"
      //       >
      //         <Link className="relative h-full w-full" href={`/product/${product.id}`}>
      //           <GridTileImage
      //             alt={product.title}
      //             label={{
      //               title: product.title,
      //               amount: product.price, //.priceRange.maxVariantPrice.amount,
      //               currencyCode: 'IRI', //product.priceRange.maxVariantPrice.currencyCode
      //             }}
      //             src={product.featuredImage}
      //             fill
      //             sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
      //           />
      //         </Link>
      //       </li>
      //     ))}
      //   </ul>
      // </div>
    );
  }
