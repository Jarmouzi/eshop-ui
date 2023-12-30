import { GetData, PostData } from './service';

export async function getItem_Feature_Details(id: string): Promise<Item_Feature_Details>  {

  const res = await GetData<Item_Feature_Details>({
    path: 'Item_Feature_Details/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Item_Feature_Details[]>  {

  const res = await GetData<Item_Feature_Details[]>({
    path: 'Item_Feature_Details/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Item_Feature_Details[]>  {

  const res = await PostData<Item_Feature_Details[]>({
    path: 'Item_Feature_Details/GetFiltered',
    variables: jp,
  });

  return res.body;
} 