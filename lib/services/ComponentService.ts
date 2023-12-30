import { GetData, PostData } from './service';

export async function getComponent(id: string): Promise<Component>  {

  const res = await GetData<Component>({
    path: 'Component/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Component[]>  {

  const res = await GetData<Component[]>({
    path: 'Component/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Component[]>  {

  const res = await PostData<Component[]>({
    path: 'Component/GetFiltered',
    variables: jp,
  });

  return res.body;
} 