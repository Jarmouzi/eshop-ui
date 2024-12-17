import { GetData, PostData } from './service';

export async function getGroupType(id: string): Promise<GroupType>  {

  const res = await GetData<GroupType>({
    path: 'GroupType/Get?' + id,
  });

  return res.body;
} 
export async function getAllGroupTypes(): Promise<GroupType[]>  {

  const res = await GetData<GroupType[]>({
    path: 'GroupType/GetAll',
  });

  return res.body;
} 
export async function getGroupTypes(jp: string): Promise<GroupType[]>  {

  const res = await PostData<GroupType[]>({
    path: 'GroupType/GetFiltered',
    variables: jp,
  });

  return res.body;
} 