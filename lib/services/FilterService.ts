import { GetData, PostData } from './service';

export async function getFilter(id: string): Promise<Filter>  {

  const res = await GetData<Filter>({
    path: 'Filter/Get?' + id,
  });

  return res.body;
} 
export async function getAllFilters(): Promise<Filter[]>  {

  const res = await GetData<Filter[]>({
    path: 'Filter/GetAll',
  });

  return res.body;
} 
export async function getFilters(jp: string): Promise<Filter[]>  {

  const res = await PostData<Filter[]>({
    path: 'Filter/GetFiltered',
    variables: jp,
  });

  return res.body;
} 