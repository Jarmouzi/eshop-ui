import type { Metadata } from 'next';

import Prose from '@/components/prose';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/services/PageService';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

type Params = Promise<{ page: string }>
export async function generateMetadata({params}: { params: Params;}): Promise<Metadata> {
  const { page } = await params;
  const currentPage = await getPage(page);

  if (!currentPage) return notFound();

  return {
    title: currentPage.seo?.Title || currentPage.title,
    description: currentPage.seo?.Description || currentPage.bodySummary,
    openGraph: {
      publishedTime: currentPage.createdAt,
      modifiedTime: currentPage.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: Params }) {
  const { page } = await params;
  const currentPage = await getPage(page);

  if (!currentPage) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{currentPage.title}</h1>
      <Prose className="mb-8" html={currentPage.body as string} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(currentPage.updatedAt))}.`}
      </p>
    </>
  );
}
