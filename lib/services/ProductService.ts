import { GetData, PostData } from './service';

export async function getProduct(id: string): Promise<Product>  {

  const res = await GetData<Product>({
    path: 'Product/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Product[]>  {

  const res = await GetData<Product[]>({
    path: 'Product/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Product[]>  {

  const res = await PostData<Product[]>({
    path: 'Product/GetFiltered',
    variables: jp,
  });

  return res.body;
} 