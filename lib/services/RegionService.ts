import { GetData, PostData } from './service';

export async function getRegion(id: string): Promise<Region>  {

  const res = await GetData<Region>({
    path: 'Region/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Region[]>  {

  const res = await GetData<Region[]>({
    path: 'Region/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Region[]>  {

  const res = await PostData<Region[]>({
    path: 'Region/GetFiltered',
    variables: jp,
  });

  return res.body;
} 