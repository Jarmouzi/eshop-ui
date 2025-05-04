'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { getCategory } from '@/lib/services/CategoryService';
import { useEffect, useState } from 'react';
import { Category } from '@/lib/types/Category';
import Breadcrumb from '.';
export default function CategoryBreadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean); 
    const searchParams = useSearchParams(); 
    const categoryId = searchParams.get('collection') || pathSegments[pathSegments.length - 1];
    let breadcrumbs: {href: string; title: string}[] = [];
    
    if(categoryId)
    {
        const [collection, setCollection] = useState({} as Category);

        useEffect(() => {
          async function fetchData() {
            const res = await getCategory(categoryId || '')
            setCollection(res);
          }
          fetchData();
        }, []);

        if(collection.grandParentId && collection.grandParentTitle)
        {
            breadcrumbs.push({ href:`/search/${collection.grandParentId}`, title:collection.grandParentTitle})
        }
        if(collection.parentId && collection.parentTitle)
        {
            breadcrumbs.push({ href:`/search/${collection.parentId}`, title:collection.parentTitle})
        }
        breadcrumbs.push({ href:`/search/${collection.id}`, title:collection.title})
    }
    // else find related group to link to
    
    return (
        <Breadcrumb data={breadcrumbs} />
      );
    }
      