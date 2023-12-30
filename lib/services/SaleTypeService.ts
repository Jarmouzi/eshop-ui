import { GetData, PostData } from './service';

export async function getSaleType(id: string): Promise<SaleType>  {

  const res = await GetData<SaleType>({
    path: 'SaleType/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<SaleType[]>  {

  const res = await GetData<SaleType[]>({
    path: 'SaleType/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<SaleType[]>  {

  const res = await PostData<SaleType[]>({
    path: 'SaleType/GetFiltered',
    variables: jp,
  });

  return res.body;
} 