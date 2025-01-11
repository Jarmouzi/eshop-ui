import Image from 'next/image';
import Link from 'next/link';


export default async function Banner({title, src, path, size}: {title: string, src: string, path: string, size?: string | "sm"}) {

  let width = "w-1/4"
  if(size == "sm")
    width = "w-1/2";

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
