import Image from 'next/image'
import React from 'react'

export default function NotFound() {
  return (
    <div className='grid h-full w-full p-14 m-24 sm:{ m-3 p-3 } justify-center max-w-96 max-h-96 overflow-hidden rounded-lg border bg-white hover:border-primary dark:bg-black'>
    <Image 
      src='/notfound.png' 
      alt='محصول مورد نظر یافت نشد' 
      className='relative object-contain' 
      fill 
      style={{ objectFit: 'cover' }}/>
    <h5 className='text-primary font-semibold'> محصولی با این مشخصات یافت نشد!</h5>
    <p className='text-sm'> خواهشمند است فیلتر های جستجوی خود را تغییر دهید</p>
  </div>
  )
}
