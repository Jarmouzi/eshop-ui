import { GetData, PostData } from './service';

export async function getStock(id: string): Promise<Stock>  {

  const res = await GetData<Stock>({
    path: 'Stock/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Stock[]>  {

  const res = await GetData<Stock[]>({
    path: 'Stock/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Stock[]>  {

  const res = await PostData<Stock[]>({
    path: 'Stock/GetFiltered',
    variables: jp,
  });

  return res.body;
} 