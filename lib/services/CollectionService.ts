import { GetData, PostData } from './service';

export async function getCollection(id: string): Promise<Collection>  {

  const res = await GetData<Collection>({
    path: 'Collection/Get?' + id,
  });

  return res.body;
} 
export async function getAllCollections(): Promise<Collection[]>  {

  const res = await GetData<Collection[]>({
    path: 'Collection/GetAll',
  });

  return res.body;
} 
export async function getCollections(jp: string): Promise<Collection[]>  {

  const res = await PostData<Collection[]>({
    path: 'Collection/GetFiltered',
    variables: jp,
  });

  return res.body;
} 