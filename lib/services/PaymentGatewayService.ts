import { UserAddress } from '../types/PaymentGateway';
import { GetData, PostData } from './service';

export async function getPaymentGateway(id: string): Promise<PaymentGateway>  {

  const res = await GetData<PaymentGateway>({
    path: 'PaymentGateway/Get?' + id,
  });

  return res.body;
} 
export async function getAllPaymentGateways(): Promise<PaymentGateway[]>  {

  const res = await GetData<PaymentGateway[]>({
    path: 'PaymentGateway/GetAll',
  });

  return res.body;
} 
export async function getPaymentGateways(jp: string): Promise<PaymentGateway[]>  {

  const res = await PostData<PaymentGateway[]>({
    path: 'PaymentGateway/GetFiltered',
    variables: jp,
  });

  return res.body;
} 