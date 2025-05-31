import { collection, Image, Product, SimpleProduct } from '@/lib/types/Product';
import { Suspense } from 'react';
import { ProductDescription } from './product-description';
import TabInfo from '../tab/tab-info';
import { TabData } from '@/lib/types/TabData';
import FeatureList from '../list/feature-list';
import { Gallery } from './gallery';
import ProductBreadcrumb from '../layout/breadcrumb/product-breadcrumb';
import SwiperProducts from '../swiper/swiper-products';

export default async function ProductDetails({product, productCollections}: {product: Product, productCollections:Promise<collection[]>}) {

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
          {(await productCollections) && (await productCollections).map((c, i) => (
             c.products ? (
              <ProductCollections title={c.title} products={c.products} />
            ) : null
          ))}
          
        </Suspense>
      </div>
    </>
  );
}

async function ProductCollections({ title, products }: { title: string; products: SimpleProduct[]; }) {

    if (!products) return null;
  
    return (
      <div className="px-6 my-4 collection">
        <div className="collection">
          <h1>{title}</h1>
        </div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <SwiperProducts products={products} />
        </Suspense>
      </div>

    );
  }
