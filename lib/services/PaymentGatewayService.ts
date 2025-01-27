import { PaymentGateway } from "../types/PaymentGateway";
import { AuthGetData, PostData } from "./service";

export async function getPaymentGateway(id: string): Promise<PaymentGateway> {
  const res = await AuthGetData<PaymentGateway>({
    path: "PaymentGateway/Get?" + id,
  });

  return res.body;
}
export async function getAllPaymentGateways(): Promise<PaymentGateway[]> {
  const res = await AuthGetData<PaymentGateway[]>({
    path: "PaymentGateway/GetAll",
  });

  return res.body;
}
export async function getPaymentGateways(
  jp: string
): Promise<PaymentGateway[]> {
  const res = await PostData<PaymentGateway[]>({
    path: "PaymentGateway/GetFiltered",
    variables: jp,
  });

  return res.body;
}
