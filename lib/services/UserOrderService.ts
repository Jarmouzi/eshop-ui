import { AuthGetData, PostData } from "./service";

export async function getUserOrder(id: string): Promise<UserOrder> {
  const res = await AuthGetData<UserOrder>({
    path: "UserOrder/Get?" + id,
  });

  return res.body;
}
export async function getAllUserOrders(): Promise<UserOrder[]> {
  const res = await AuthGetData<UserOrder[]>({
    path: "UserOrder/GetAll",
  });

  return res.body;
}
export async function getUserOrders(jp: string): Promise<UserOrder[]> {
  const res = await PostData<UserOrder[]>({
    path: "UserOrder/GetFiltered",
    variables: jp,
  });

  return res.body;
}
