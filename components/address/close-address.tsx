import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CloseAddress({ className }: { className?: string }) {
  return (
    <div className="relative flex h-9 w-9 m-2 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <XMarkIcon className={clsx('h-7 transition-all ease-in-out hover:scale-110 font-semibold text-neutral-500', className)} />
    </div>
  );
}
