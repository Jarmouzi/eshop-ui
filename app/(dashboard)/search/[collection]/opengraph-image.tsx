import OpengraphImage from '@/components/opengraph-image';
import { getCategory } from '@/lib/services/CategoryService';

export const runtime = 'edge';

export default async function Image({ params }: { params: { collection: string } }) {
  const collection = await getCategory(params.collection);
  const title = collection.title || '';

  return await OpengraphImage({ title });
}
