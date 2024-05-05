import { Console } from 'console';
import { GetData, PostData } from './service';

export async function getBrand(id: string): Promise<Brand>  {

  const res = await GetData<Brand>({
    path: 'Brand/Get?' + id,
  });

  return res.body;
} 
export async function getAllBrands(): Promise<Brand[]>  {

  const res = await GetData<Brand[]>({
    path: 'Brand/GetAll',
  });
  console.log(res.body);
  return res.body;
} 
export async function getBrands(jp: string): Promise<Brand[]>  {

  const res = await PostData<Brand[]>({
    path: 'Brand/GetFiltered',
    variables: jp,
  });

  return res.body;
} 