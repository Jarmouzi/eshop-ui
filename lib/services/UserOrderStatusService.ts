import { AuthGetData, PostData } from "./service";

export async function getUserOrderStatus(id: string): Promise<UserOrderStatus> {
  const res = await AuthGetData<UserOrderStatus>({
    path: "UserOrderStatus/Get?" + id,
  });

  return res.body;
}
export async function getAllUserOrderStatuss(): Promise<UserOrderStatus[]> {
  const res = await AuthGetData<UserOrderStatus[]>({
    path: "UserOrderStatus/GetAll",
  });

  return res.body;
}
export async function getUserOrderStatuss(
  jp: string
): Promise<UserOrderStatus[]> {
  const res = await PostData<UserOrderStatus[]>({
    path: "UserOrderStatus/GetFiltered",
    variables: jp,
  });

  return res.body;
}
