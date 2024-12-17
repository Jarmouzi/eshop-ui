import { UserAddress } from '../types/Product_Option';
import { GetData, PostData } from './service';

export async function getProduct_Option(id: string): Promise<Product_Option>  {

  const res = await GetData<Product_Option>({
    path: 'Product_Option/Get?' + id,
  });

  return res.body;
} 
export async function getAllProduct_Options(): Promise<Product_Option[]>  {

  const res = await GetData<Product_Option[]>({
    path: 'Product_Option/GetAll',
  });

  return res.body;
} 
export async function getProduct_Options(jp: string): Promise<Product_Option[]>  {

  const res = await PostData<Product_Option[]>({
    path: 'Product_Option/GetFiltered',
    variables: jp,
  });

  return res.body;
} 