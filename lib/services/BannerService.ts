import { GetData, PostData } from './service';
import { Banner } from '../types/Banner';

export async function getBanner(id: string): Promise<Banner>  {

  const res = await GetData<Banner>({
    path: 'Banner/Get?' + id,
  });

  return res.body;
} 
export async function getAllBanners(): Promise<Banner[]>  {

  const res = await GetData<Banner[]>({
    path: 'Banner/GetAll',
  });
  
  return res.body;
} 
export async function getBanners(jp: string): Promise<Banner[]>  {

  const res = await PostData<Banner[]>({
    path: 'Banner/GetFiltered',
    variables: jp,
  });

  return res.body;
} 