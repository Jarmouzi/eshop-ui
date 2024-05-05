import { GetData, PostData } from './service';

export async function getComponent(id: string): Promise<Component>  {

  const res = await GetData<Component>({
    path: 'Component/Get?' + id,
  });

  return res.body;
} 
export async function getAllComponents(): Promise<Component[]>  {

  const res = await GetData<Component[]>({
    path: 'Component/GetAll',
  });

  return res.body;
} 
export async function getComponents(jp: string): Promise<Component[]>  {

  const res = await PostData<Component[]>({
    path: 'Component/GetFiltered',
    variables: jp,
  });

  return res.body;
} 