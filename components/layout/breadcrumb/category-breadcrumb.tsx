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
  const [collection, setCollection] = useState<Category | null>(null);

  useEffect(() => {
    if (!categoryId) return;
    async function fetchData() {
      const res = await getCategory(categoryId || '');
      setCollection(res);
    }
    fetchData();
  }, [categoryId]);

  let breadcrumbs: { href: string; title: string }[] = [];
  if (collection) {
    if (collection.grandParentId && collection.grandParentTitle) {
      breadcrumbs.push({ href: `/search/${collection.grandParentId}`, title: collection.grandParentTitle });
    }
    if (collection.parentId && collection.parentTitle) {
      breadcrumbs.push({ href: `/search/${collection.parentId}`, title: collection.parentTitle });
    }
    breadcrumbs.push({ href: `/search/${collection.id}`, title: collection.title });
  }

  return (
    <Breadcrumb data={breadcrumbs} />
  );
}
