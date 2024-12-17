import { GetData, PostData } from './service';

export async function getUserOrder(id: string): Promise<UserOrder>  {

  const res = await GetData<UserOrder>({
    path: 'UserOrder/Get?' + id,
  });

  return res.body;
} 
export async function getAllUserOrders(): Promise<UserOrder[]>  {

  const res = await GetData<UserOrder[]>({
    path: 'UserOrder/GetAll',
  });

  return res.body;
} 
export async function getUserOrders(jp: string): Promise<UserOrder[]>  {

  const res = await PostData<UserOrder[]>({
    path: 'UserOrder/GetFiltered',
    variables: jp,
  });

  return res.body;
} 