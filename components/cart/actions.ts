'use server';

import { TAGS } from '@/lib/constants';
//import { addToCart, createCart, getCart, removeFromCart, updateCart } from '@/lib/shopify';
import { addToCart, createCart, getCart, removeFromCart, updateCart } from '@/lib/services/CartService';
import { Console } from 'console';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addItem(prevState: any, selectedVariantId: string | undefined) {
  let cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.Id;
    cookies().set('cartId', cartId);    
  }

  if (!selectedVariantId) {
    return 'مدل محصول را انتخاب نمایید';//'Missing product variant ID';
  }

  try {    
    await addToCart(cartId, selectedVariantId, 1 );
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'خطا در افزودن محصول به سبد خرید';//'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, itemId: number) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'اشکال در بازیابی سبد خرید';//'Missing cart ID';
  }

  try {
    await removeFromCart(cartId, itemId);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'خطا در حذف محصول از سبد خرید';//'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    itemId: number;
    variantId: number;
    quantity: number;
  }
) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'سبد خرید یافت نشد';//'Missing cart ID';
  }

  const { itemId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, itemId);
      revalidateTag(TAGS.cart);
      return;
    }

    await updateCart(cartId, variantId, quantity);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'خطا در بازیابی اطلاعات';//'Error updating item quantity';
  }
}
