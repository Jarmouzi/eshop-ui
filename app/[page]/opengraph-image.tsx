import OpengraphImage from '@/components/opengraph-image';
import { getPage } from '@/lib/services/PageService';


export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);
  const title = page.seo?.Title || page.title;

  return await OpengraphImage({ title });
}
