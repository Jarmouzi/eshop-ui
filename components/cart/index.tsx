import { cookies } from 'next/headers';
import CartModal from './modal';
import { getCart } from '@/lib/services/CartService';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);

    console.log(cart);
  }

  return <CartModal cart={cart} />;
}
