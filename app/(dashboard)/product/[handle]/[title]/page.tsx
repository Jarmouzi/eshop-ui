import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, getProductHandles, getProductRecommendations } from '@/lib/services/ProductService';
import ProductDetails from '@/components/product';

//export const runtime = 'edge';
type Params = Promise<{ handle: string; }>

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const { handle } = await params; 
  const product = await getProduct(handle);

  if (!product.Title) {
    return {
      title: 'محصول مورد نظر یافت نشد',
    }
  }
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

export default async function ProductTitlePage({ params }: { params: Params }) {
  const { handle } = await params; 
  const product = await getProduct(handle);

  if (!product.Title) return notFound();
  
  const relatedProducts = getProductRecommendations('fav'); 


  return (
    <ProductDetails product={product} relatedProducts={relatedProducts} />
  );
}

// export async function generateStaticParams() {
//   return await getProductHandles();
// }
