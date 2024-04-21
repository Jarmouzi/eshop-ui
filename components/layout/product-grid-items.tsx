import Grid from '@/components/grid';
import { GridTileImage } from '@/components/grid/tile';
import { SimpleProduct } from '@/lib/types/Product';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: SimpleProduct[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${product.id}`}>
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.price,
                currencyCode: "تومان"
              }}
              src={product.featuredImage}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
