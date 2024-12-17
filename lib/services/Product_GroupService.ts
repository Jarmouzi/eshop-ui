import { UserAddress } from '../types/Product_Group';
import { GetData, PostData } from './service';

export async function getProduct_Group(id: string): Promise<Product_Group>  {

  const res = await GetData<Product_Group>({
    path: 'Product_Group/Get?' + id,
  });

  return res.body;
} 
export async function getAllProduct_Groups(): Promise<Product_Group[]>  {

  const res = await GetData<Product_Group[]>({
    path: 'Product_Group/GetAll',
  });

  return res.body;
} 
export async function getProduct_Groups(jp: string): Promise<Product_Group[]>  {

  const res = await PostData<Product_Group[]>({
    path: 'Product_Group/GetFiltered',
    variables: jp,
  });

  return res.body;
} 