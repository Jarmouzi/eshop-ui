import { GetData, PostData } from './service';

export async function getFeatureValue(id: string): Promise<FeatureValue>  {

  const res = await GetData<FeatureValue>({
    path: 'FeatureValue/Get?' + id,
  });

  return res.body;
} 
export async function getAllFeatureValues(): Promise<FeatureValue[]>  {

  const res = await GetData<FeatureValue[]>({
    path: 'FeatureValue/GetAll',
  });

  return res.body;
} 
export async function getFeatureValues(jp: string): Promise<FeatureValue[]>  {

  const res = await PostData<FeatureValue[]>({
    path: 'FeatureValue/GetFiltered',
    variables: jp,
  });

  return res.body;
} 