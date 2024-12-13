import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';


export default async function Banner({title, src, path, size}: {title: string, src: string, path: string, size?: string | "sm"}) {
  const cartId = (await cookies()).get('cartId')?.value;
  
  let width = "w-1/4"
  if(size == "sm")
    width = "w-1/2";
  // var winSize = WindowSize();
  // let width = winSize.width == undefined ? 200 : ( winSize.width < 1000 ? (winSize.width - 64) /2 : (winSize.width - 96) /4);
  
  // if(size == "md")
  //   width = "col-span-3 md:col-span-6";
  // else if(size == "lg")
  //   width = "col-span-12";


  return (
    <Link className={`${width} min-h-32 h-full block relative m-3`} target="_blank" href={path}>
      <Image className='rounded-2xl hover:shadow-sm hover:shadow-stone-700' 
        src={src} 
        alt={title} 
        title={title} 
        fill
        // width={128}
        // height={128}
        style={{ objectFit: 'cover' }}/>
    </Link>
  );
}
