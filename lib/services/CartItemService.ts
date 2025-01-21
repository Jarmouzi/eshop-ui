import { AuthGetData, PostData } from "./service";

export async function getCartItem(id: string): Promise<CartItem> {
  const res = await AuthGetData<CartItem>({
    path: "CartItem/Get?" + id,
  });

  return res.body;
}
export async function getAllCartItems(): Promise<CartItem[]> {
  const res = await AuthGetData<CartItem[]>({
    path: "CartItem/GetAll",
  });

  return res.body;
}
export async function getCartItems(jp: string): Promise<CartItem[]> {
  const res = await PostData<CartItem[]>({
    path: "CartItem/GetFiltered",
    variables: jp,
  });

  return res.body;
}
