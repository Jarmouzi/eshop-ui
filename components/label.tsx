import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  // currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: number;
  // currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={clsx('absolute bottom-0 right-0 flex w-full px-1 pb-2 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="grid items-center rounded border bg-white/70 p-1 text-sm font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <h3 className="mr-1 line-clamp-3 flex-grow pr-2 leading-normal tracking-tight">{title}</h3>
        <div className="mr-auto w-auto rounded-full  p-2 text-sm text-primary">
          <Price
            //className="inline-block text-left rounded-lg bg-primary p-2 text-white"
            amount={amount}
            // currencyCode={currencyCode}
            // currencyCodeClassName="hidden @[275px]/label:inline"
          />
        </div>
      </div>
    </div>
  );
};

export default Label;
