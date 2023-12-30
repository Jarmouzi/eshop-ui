import { GetData, PostData } from './service';

export async function getProduct_Feature(id: string): Promise<Product_Feature>  {

  const res = await GetData<Product_Feature>({
    path: 'Product_Feature/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Product_Feature[]>  {

  const res = await GetData<Product_Feature[]>({
    path: 'Product_Feature/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Product_Feature[]>  {

  const res = await PostData<Product_Feature[]>({
    path: 'Product_Feature/GetFiltered',
    variables: jp,
  });

  return res.body;
} 