'use client';
import { useParams, usePathname } from 'next/navigation';
import { getProductCategory } from '@/lib/services/CategoryService';
import { useEffect, useState } from 'react';
import { Category } from '@/lib/types/Category';
import Breadcrumb from '.';

export default function ProductBreadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean); 
    const [collection, setCollection] = useState({} as Category);
    let breadcrumbs: {href: string; title: string}[] = [];

    const params = useParams();
    let handle = params.handle;
      
    useEffect(() => {
      if(!handle || handle == undefined) return;
      async function fetchData() {
        const res = await getProductCategory(handle?.toString() || '')
        setCollection(res);
      }
      fetchData();
    }, [handle]);

    if(handle)
    {
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
      