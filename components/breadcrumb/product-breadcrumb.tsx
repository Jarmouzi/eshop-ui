'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { getCategory, getProductCategory } from '@/lib/services/CategoryService';
import { useEffect, useState } from 'react';
import { Category } from '@/lib/types/Category';
import Breadcrumb from '.';
import { Product } from '@/lib/types/Product';
import { getProduct } from '@/lib/services/ProductService';

export default function ProductBreadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean); 
    let productId: string | null = null;

    const match = pathname.match(/\/product\/([^\/]+)/);
    if (match) {
      productId = match[1]; 
    }

    let breadcrumbs: {href: string; title: string}[] = [];
    if(productId)
    {
      const [collection, setCollection] = useState({} as Category);
      
      useEffect(() => {
        async function fetchData() {
          const res = await getProductCategory(productId || '')
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
      