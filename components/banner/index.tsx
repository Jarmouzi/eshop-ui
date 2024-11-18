import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';


export default async function Banner({title, src, path, size}: {title: string, src: string, path: string, size?: string | "sm"}) {
  const cartId = cookies().get('cartId')?.value;
  let width = "w-1/4 md:w-1/2 sm:w-full";
  
  if(size == "md")
    width = "w-1/2 md:w-full";
  else if(size == "lg")
    width = "w-full";


  return (
    <Link className={`${width} block relative h-full`} target="_blank" href={path}>
      <Image className='p-2 rounded-3xl  hover:shadow-md hover:shadow-primary' 
        src={src} 
        alt={title} 
        title={title} 
        fill 
        style={{ objectFit: 'cover' }}/>
    </Link>
  );
}
