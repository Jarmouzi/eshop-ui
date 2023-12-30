import { GetData, PostData } from './service';

export async function getSupplier_Contract(id: string): Promise<Supplier_Contract>  {

  const res = await GetData<Supplier_Contract>({
    path: 'Supplier_Contract/Get?' + id,
  });

  return res.body;
} 
export async function getAllCategories(): Promise<Supplier_Contract[]>  {

  const res = await GetData<Supplier_Contract[]>({
    path: 'Supplier_Contract/GetAll',
  });

  return res.body;
} 
export async function getCategories(jp: string): Promise<Supplier_Contract[]>  {

  const res = await PostData<Supplier_Contract[]>({
    path: 'Supplier_Contract/GetFiltered',
    variables: jp,
  });

  return res.body;
} 