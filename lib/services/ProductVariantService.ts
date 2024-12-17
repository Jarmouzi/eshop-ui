import { UserAddress } from '../types/ProductVariant';
import { GetData, PostData } from './service';

export async function getProductVariant(id: string): Promise<ProductVariant>  {

  const res = await GetData<ProductVariant>({
    path: 'ProductVariant/Get?' + id,
  });

  return res.body;
} 
export async function getAllProductVariants(): Promise<ProductVariant[]>  {

  const res = await GetData<ProductVariant[]>({
    path: 'ProductVariant/GetAll',
  });

  return res.body;
} 
export async function getProductVariants(jp: string): Promise<ProductVariant[]>  {

  const res = await PostData<ProductVariant[]>({
    path: 'ProductVariant/GetFiltered',
    variables: jp,
  });

  return res.body;
} 