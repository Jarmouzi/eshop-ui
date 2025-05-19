import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, getProductHandles, getProductRecommendations } from '@/lib/services/ProductService';
import ProductDetails from '@/components/product';

//export const runtime = 'edge';
type Params = Promise<{ handle: string; }>

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const { handle } = await params; 
  const product = await getProduct(handle);

  if (!product.title) {
    return {
      title: 'محصول مورد نظر یافت نشد',
    }
  }
  const { url: url, width: width, height: height, altText: alt } = product.featuredImage || {};
  const indexable = true; //!product.Tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
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

export default async function ProductPage({ params }: { params: Params }) {
  const { handle } = await params; 
  const product = await getProduct(handle);
  console.log(product)

  if (!product.title) return notFound();
  
  const relatedProducts = getProductRecommendations('fav'); 

  // const productJsonLd = {
  //   //'@context': 'https://schema.org',
  //   //'@type': 'Product',
  //   name: product.title,
  //   description: product.Description,
  //   image: product.featuredImage.Url,
  //   offers: {
  //     '@type': 'AggregateOffer',
  //     availability: product.AvailableForSale
  //       ? 'https://schema.org/InStock'
  //       : 'https://schema.org/OutOfStock',
  //     //priceCurrency: 'IRI', product.priceRange.minVariantPrice.currencyCode,
  //     // highPrice: product.priceRange.maxVariantPrice.amount,
  //     // lowPrice: product.priceRange.minVariantPrice.amount
  //     price: product.price,
  //   }
  // };

  return (
    <ProductDetails product={product} relatedProducts={relatedProducts} />
  );
}

export async function generateStaticParams() {
  return await getProductHandles();
}
