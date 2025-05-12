'use client';
import { usePathname } from 'next/navigation';
import { getProductCategory } from '@/lib/services/CategoryService';
import { useEffect, useState } from 'react';
import { Category } from '@/lib/types/Category';
import Breadcrumb from '.';

export default function ProductBreadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean); 
    let productId: string | null = null;
    const [collection, setCollection] = useState({} as Category);
    let breadcrumbs: {href: string; title: string}[] = [];

    const match = pathname.match(/\/product\/([^\/]+)/);
    if (match) {
      productId = match[1]; 
    }
      
    useEffect(() => {
      if(!productId) return;
      async function fetchData() {
        const res = await getProductCategory(productId || '')
        setCollection(res);
      }
      fetchData();
    }, [productId]);

    if(productId)
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
      