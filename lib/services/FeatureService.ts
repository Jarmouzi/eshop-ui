import { GetData, PostData } from './service';

export async function getFeature(id: string): Promise<Feature>  {

  const res = await GetData<Feature>({
    path: 'Feature/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Feature[]>  {

  const res = await GetData<Feature[]>({
    path: 'Feature/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Feature[]>  {

  const res = await PostData<Feature[]>({
    path: 'Feature/GetFiltered',
    variables: jp,
  });

  return res.body;
} 