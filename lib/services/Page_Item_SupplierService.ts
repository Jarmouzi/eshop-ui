import { GetData, PostData } from './service';

export async function getPage_Item_Supplier(id: string): Promise<Page_Item_Supplier>  {

  const res = await GetData<Page_Item_Supplier>({
    path: 'Page_Item_Supplier/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Page_Item_Supplier[]>  {

  const res = await GetData<Page_Item_Supplier[]>({
    path: 'Page_Item_Supplier/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Page_Item_Supplier[]>  {

  const res = await PostData<Page_Item_Supplier[]>({
    path: 'Page_Item_Supplier/GetFiltered',
    variables: jp,
  });

  return res.body;
} 