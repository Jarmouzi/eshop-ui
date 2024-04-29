import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { GridTileImage } from '@/components/grid/tile';
import Footer from '@/components/layout/footer';
import { Gallery } from '@/components/product/gallery';
import { ProductDescription } from '@/components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants';
import Link from 'next/link';
import { getProduct, getProductRecommendations } from '@/lib/services/ProductService';
import { Image } from '@/lib/types/Product';

//export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { Url: url, Width: width, Height: height, AltText: alt } = product.FeaturedImage || {};
  const indexable = true; //!product.Tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.Seo.Title || product.Title,
    description: product.Seo.Description || product.Description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.Title,
    description: product.Description,
    image: product.FeaturedImage.Url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.AvailableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      //priceCurrency: 'IRI', product.priceRange.minVariantPrice.currencyCode,
      // highPrice: product.priceRange.maxVariantPrice.amount,
      // lowPrice: product.priceRange.minVariantPrice.amount
      price: product.Price,
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-2/6 md:basis-1/2">
            <Gallery
              images={product.Images.map((image: Image) => ({
                src: image.Url,
                altText: image.AltText
              }))}
            />
          </div>

          <div className="basis-full lg:basis-4/6 md:basis-1/2">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts id={product.Id} />
        </Suspense>
      </div>
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations('fav'); //id

  if (!relatedProducts.length) return null;

  return (
    <div className="py-4">
      {/* <h2 className="mb-4 text-xl font-bold">محصولات مشابه</h2> */}
      <div className="px-4 collection">
        <h1>محصولات مشابه</h1>
      </div>
      <ul className="flex w-full gap-4 overflow-x-auto overflow-y-hidden pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.Id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6"
          >
            <Link className="relative h-full w-full" href={`/product/${product.Id}`}>
              <GridTileImage
                alt={product.Title}
                label={{
                  title: product.Title,
                  amount: product.Price, //.priceRange.maxVariantPrice.amount,
                  currencyCode: 'IRI', //product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.FeaturedImage}
                //fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
