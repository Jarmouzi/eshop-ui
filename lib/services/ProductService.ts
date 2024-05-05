import { SimpleProduct, Product } from '../types/Product';
import { GetData, PostData } from './service';

export async function getProduct(id: string): Promise<Product>  {
  const res = await GetData<Product>({
    path: 'Product/Get?id=' + id,
  });

  return res.body;
} 

export async function getAllProducts(): Promise<Product[]>  {

  const res = await GetData<Product[]>({
    path: 'Product/GetAll',
  });

  return res.body;
} 
export async function getProducts(jp: string): Promise<SimpleProduct[]>  {
  console.log('Product/GetFiltered?variables=' + jp);
  const res = await GetData<SimpleProduct[]>({
    path: 'Product/GetFiltered?variables=' + jp,
  });
  console.log(res.body);
  return res.body;
} 


export async function getCollectionProducts(cn: string): Promise<SimpleProduct[]>  {

  const res = await GetData<SimpleProduct[]>({
    path: 'Product/GetCollectionProducts?cn=' + cn
  });

  return res.body;
} 

export async function getProductRecommendations(cn: string): Promise<SimpleProduct[]>  {

  const res = await GetData<SimpleProduct[]>({
    path: 'Product/GetCollectionProducts?cn=' + cn
  });

  return res.body;
} 

