import { GetData, PostData } from './service';

export async function getPage_Item_Feature(id: string): Promise<Page_Item_Feature>  {

  const res = await GetData<Page_Item_Feature>({
    path: 'Page_Item_Feature/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Page_Item_Feature[]>  {

  const res = await GetData<Page_Item_Feature[]>({
    path: 'Page_Item_Feature/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Page_Item_Feature[]>  {

  const res = await PostData<Page_Item_Feature[]>({
    path: 'Page_Item_Feature/GetFiltered',
    variables: jp,
  });

  return res.body;
} 