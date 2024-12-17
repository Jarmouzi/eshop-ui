import { UserAddress } from '../types/Option';
import { GetData, PostData } from './service';

export async function getOption(id: string): Promise<Option>  {

  const res = await GetData<Option>({
    path: 'Option/Get?' + id,
  });

  return res.body;
} 
export async function getAllOptions(): Promise<Option[]>  {

  const res = await GetData<Option[]>({
    path: 'Option/GetAll',
  });

  return res.body;
} 
export async function getOptions(jp: string): Promise<Option[]>  {

  const res = await PostData<Option[]>({
    path: 'Option/GetFiltered',
    variables: jp,
  });

  return res.body;
} 