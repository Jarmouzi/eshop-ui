import Grid from '@/components/grid';
import { GridTileImage } from '@/components/grid/tile';
import { SimpleProduct } from '@/lib/types/Product';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: SimpleProduct[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.Id} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${product.Id}`}>
            <GridTileImage
              alt={product.Title}
              label={{
                title: product.Title,
                amount: product.Price,
                currencyCode: "تومان"
              }}
              src={product.FeaturedImage}
              //fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
