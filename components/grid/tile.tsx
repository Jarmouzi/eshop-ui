import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: number;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group overflow-hidden flex flex-col items-stretch justify-start h-full border bg-white dark:bg-black hover:border-primary',
        {
          relative: label,
          'border-2 border-primary': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
    {/* <div className="flex items-center justify-start mb-1">
      <div className="ml-1 w-28 h-3">
        <h3> tags</h3>
        <Image class="w-full inline-block" src="/statics/img/svg/productCard/topBadge/IncredibleOffer.svg" width="116" height="14" alt="" title="" style="object-fit: contain;">
      </div>
      <div className="grow"><br /></div>
    </div> */}
    <div className="flex grow relative flex-col">
      {/* <div className="flex items-stretch flex-col relative mb-1"> */}
        <div className="flex items-start mx-auto">
          <div className="w-60 h-60 leading-none"></div>
  
  
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={clsx('relative h-full w-full p-2 pb-14 min-h-36 object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          // currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
      </div>
      </div>
    </div>
  );
}
