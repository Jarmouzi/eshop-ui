import { GetData, PostData } from './service';

export async function getItem_Feature_Detail(id: string): Promise<Item_Feature_Detail>  {

  const res = await GetData<Item_Feature_Detail>({
    path: 'Item_Feature_Detail/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Item_Feature_Detail[]>  {

  const res = await GetData<Item_Feature_Detail[]>({
    path: 'Item_Feature_Detail/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Item_Feature_Detail[]>  {

  const res = await PostData<Item_Feature_Detail[]>({
    path: 'Item_Feature_Detail/GetFiltered',
    variables: jp,
  });

  return res.body;
} 