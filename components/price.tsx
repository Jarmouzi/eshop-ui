//import { Money } from '@/lib/types/product';
import clsx from 'clsx';

const Price = ({
  amount,
  className,
  // currencyCode = 'USD',
  // currencyCodeClassName
}: {
  amount: number;
  className?: string;
  // currencyCode: string;
  // currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat('fa-IR').format(amount)}`}
    <span className="ml-1 pr-2 inline" >تومان</span>
  </p>

  // <p suppressHydrationWarning={true} className={className}>
  //   {`${new Intl.NumberFormat(undefined, {
  //     style: 'currency',
  //     currency: currencyCode,
  //     currencyDisplay: 'narrowSymbol'
  //   }).format(parseFloat(amount))}`}
  //   <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
  // </p>
);

export default Price;
