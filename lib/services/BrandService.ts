import { GetData, PostData } from './service';

export async function getBrand(id: string): Promise<Brand>  {

  const res = await GetData<Brand>({
    path: 'Brand/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Brand[]>  {

  const res = await GetData<Brand[]>({
    path: 'Brand/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Brand[]>  {

  const res = await PostData<Brand[]>({
    path: 'Brand/GetFiltered',
    variables: jp,
  });

  return res.body;
} 