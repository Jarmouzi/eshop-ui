import { UserAddress } from '../types/Product_Image';
import { GetData, PostData } from './service';

export async function getProduct_Image(id: string): Promise<Product_Image>  {

  const res = await GetData<Product_Image>({
    path: 'Product_Image/Get?' + id,
  });

  return res.body;
} 
export async function getAllProduct_Images(): Promise<Product_Image[]>  {

  const res = await GetData<Product_Image[]>({
    path: 'Product_Image/GetAll',
  });

  return res.body;
} 
export async function getProduct_Images(jp: string): Promise<Product_Image[]>  {

  const res = await PostData<Product_Image[]>({
    path: 'Product_Image/GetFiltered',
    variables: jp,
  });

  return res.body;
} 