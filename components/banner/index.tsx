import { getCart } from '@/lib/shopify';
import { Image } from '@/lib/types/Product';
import { cookies } from 'next/headers';
import Link from 'next/link';


export default async function Banner({title, src, path, size}: {title: string, src: string, path: string, size?: string | "sm"}) {
  const cartId = cookies().get('cartId')?.value;
  let width = "w-1/4 md:w-1/2 sm:w-full";
  
  if(size == "md")
    width = "w-1/2 md:w-full";
  else if(size == "lg")
    width = "w-full";


  return (
    <Link className={`${width} block relative`} target="_blank" href={path}>
      <img className='p-2 rounded-3xl  hover:shadow-md hover:shadow-teal-600' src={src} alt={title} title={title} />
    </Link>
  );
}
