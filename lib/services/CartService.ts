import { Cart } from "../types/Cart";
import { AuthGetData } from "./service";

export async function createCart(): Promise<Cart> {
  const res = await AuthGetData<Cart>({
    path: "Cart/Add",
    cache: "no-store",
  });
  return res.body; //return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  productVariantId: string,
  quantity: number
): Promise<Cart> {
  const res = await AuthGetData<Cart>({
    path: `Cart/AddToCart?json=${JSON.stringify({ id: cartId, pv: productVariantId, q: quantity })}`,
    cache: "no-store",
  });

  return res.body; // return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(
  cartId: string,
  cardItemId: number
): Promise<Cart> {
  const res = await AuthGetData<Cart>({
    path: `Cart/RemoveFromCart?json=${JSON.stringify({ id: cartId, ci: cardItemId })}`,
    cache: "no-store",
  });

  return res.body; //return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  productVariantId: number,
  quantity: number
): Promise<Cart> {
  const res = await AuthGetData<Cart>({
    path: `Cart/Update?json=${JSON.stringify({ id: cartId, pv: productVariantId, q: quantity })}`,
    cache: "no-store",
  });

  return res.body; //return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(
  cartId: string | undefined
): Promise<Cart | undefined> {
  const res = await AuthGetData<Cart>({
    path: `Cart/Get?id=${cartId}`,
    cache: "no-store",
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body) {
    return undefined;
  }

  return res.body; //return reshapeCart(res.body.data.cart);
}
