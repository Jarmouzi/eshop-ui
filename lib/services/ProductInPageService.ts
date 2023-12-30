import { GetData, PostData } from './service';

export async function getProductInPage(id: string): Promise<ProductInPage>  {

  const res = await GetData<ProductInPage>({
    path: 'ProductInPage/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<ProductInPage[]>  {

  const res = await GetData<ProductInPage[]>({
    path: 'ProductInPage/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<ProductInPage[]>  {

  const res = await PostData<ProductInPage[]>({
    path: 'ProductInPage/GetFiltered',
    variables: jp,
  });

  return res.body;
} 