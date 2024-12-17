import { GetData, PostData } from './service';

export async function getImage(id: string): Promise<Image>  {

  const res = await GetData<Image>({
    path: 'Image/Get?' + id,
  });

  return res.body;
} 
export async function getAllImages(): Promise<Image[]>  {

  const res = await GetData<Image[]>({
    path: 'Image/GetAll',
  });

  return res.body;
} 
export async function getImages(jp: string): Promise<Image[]>  {

  const res = await PostData<Image[]>({
    path: 'Image/GetFiltered',
    variables: jp,
  });

  return res.body;
} 