import { cookies } from 'next/headers';
import CartModal from './modal';
import { getCart } from '@/lib/services/CartService';

export default async function Cart() {
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = await getCart(cartId);

  return <CartModal cart={cart} />;
}
