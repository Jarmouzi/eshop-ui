import { AuthGetData, PostData, PutData } from "./service";

export async function updateUserOrder(data: UserOrder): Promise<UserOrder> {
  const res = await PutData<UserOrder>({
    path: "UserOrder/Update",
    model: data,
  });

  return res.body; //return reshapeUserOrder(res.body.data.UserOrderLinesUpdate.UserOrder);
}
export async function getUserOrder(id: string): Promise<UserOrder> {
  const res = await AuthGetData<UserOrder>({
    path: "UserOrder/Get?id=" + id,
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
