import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function ImageTile({
  isInteractive = true,
  active,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group items-center justify-center flex h-full w-full top-1 overflow-hidden rounded-lg border bg-white hover:border-primary-600 dark:bg-black',
        {
          'border-2 border-primary-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
    </div>
  );
}
