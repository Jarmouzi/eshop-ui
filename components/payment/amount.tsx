
import Price from '@/components/price';
import { Cart } from '@/lib/types/Cart';

export default function CartAmount({ cart }: { cart: Cart | undefined }) {

  return (
    <div className="py-5 text-sm rounded-lg border border-neutral-200 bg-white px-8 mb-3 dark:border-neutral-800 dark:bg-black md:px-6 lg:flex-row lg:gap-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold">جزئیات پرداخت</p>
      </div>
      <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
          <p>مبلغ کل</p>
          <Price
          className="text-right text-base text-black dark:text-white"
          amount={cart? cart.TotalAmount : 0}
          />
      </div>
      <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
          <p>مالیات بر ارزش افزوده</p>
          <Price
          className="text-right text-base text-black dark:text-white"
          amount={cart? cart.TaxAmount : 0}
          />
      </div>
      <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
          <p>هزینه حمل</p>
          <p className="text-right">پس کرایه، به عهده مشتری</p>
      </div>
      <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700 text-teal-600 dark:text-teal-600">
          <p>سود شما از خرید</p>
          <Price
          className="text-right text-base"
          amount={cart? cart.DiscountAmount : 0}
          />
      </div>
      <div className="mb-4 font-bold flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
          <p>مبلغ قابل پرداخت</p>
          <Price
          className="text-right text-base text-black dark:text-white"
          amount={cart? cart.TotalAmount : 0}
          />
      </div>
      <a
      href={cart? cart.CheckoutUrl : ''}
      className="block w-full rounded-full bg-teal-600 p-3 mt-5 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
      >
      تایید و ادامه
      </a>
    </div>
  );
}
