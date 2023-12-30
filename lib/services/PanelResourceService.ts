import { GetData, PostData } from './service';

export async function getPanelResource(id: string): Promise<PanelResource>  {

  const res = await GetData<PanelResource>({
    path: 'PanelResource/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<PanelResource[]>  {

  const res = await GetData<PanelResource[]>({
    path: 'PanelResource/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<PanelResource[]>  {

  const res = await PostData<PanelResource[]>({
    path: 'PanelResource/GetFiltered',
    variables: jp,
  });

  return res.body;
} 