'use client';

import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import Link from 'next/link';
export default function Breadcrumb({data}: {data: {href: string; title: string}[];}) {

    return (
        <>
            {data? (
                <Breadcrumbs className='py-2 px-5 text-sm' separator="/">
                <BreadcrumbItem key="home">
                    <Link href="/">فروشگاه انار چین</Link>
                </BreadcrumbItem>
                {data.map((crumb, idx) => (
                    
                    <BreadcrumbItem key={crumb.href}>
                        
                    {/* {idx === data.length - 1 ? (
                        <span>{crumb.title}</span>
                    ) : ( */}
                        <Link href={crumb.href}>{crumb.title}</Link>
                    {/* )} */}
                    </BreadcrumbItem>
                    
                ))}
                </Breadcrumbs>
            ) : null }
        </>
      );
}
      