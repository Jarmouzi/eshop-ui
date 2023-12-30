import { GetData, PostData } from './service';

export async function getSupplier(id: string): Promise<Supplier>  {

  const res = await GetData<Supplier>({
    path: 'Supplier/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Supplier[]>  {

  const res = await GetData<Supplier[]>({
    path: 'Supplier/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Supplier[]>  {

  const res = await PostData<Supplier[]>({
    path: 'Supplier/GetFiltered',
    variables: jp,
  });

  return res.body;
} 