import { UserAddress } from '../types/OptionValue';
import { GetData, PostData } from './service';

export async function getOptionValue(id: string): Promise<OptionValue>  {

  const res = await GetData<OptionValue>({
    path: 'OptionValue/Get?' + id,
  });

  return res.body;
} 
export async function getAllOptionValues(): Promise<OptionValue[]>  {

  const res = await GetData<OptionValue[]>({
    path: 'OptionValue/GetAll',
  });

  return res.body;
} 
export async function getOptionValues(jp: string): Promise<OptionValue[]>  {

  const res = await PostData<OptionValue[]>({
    path: 'OptionValue/GetFiltered',
    variables: jp,
  });

  return res.body;
} 