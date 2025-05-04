import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridBoxImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    logo: string;
    signe: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (


<div className="relative h-[250px] rounded-xl overflow-hidden shadow-lg group">

{props.src ? (
<Image {...props} />
): 
<Image
  src="/notfound.png"
  alt="Background"
  fill
  className="object-cover"
  priority
/>
}
<div className="absolute inset-0 bg-black/10 pointer-events-none" />

<div className="absolute left-0 bottom-0 w-full bg-white">
  { label ? (
  <div
    className="relative bg-white px-6 py-2 flex flex-col items-center transition-all duration-500 group-hover:-translate-y-20" >
    <Image
      src={label.logo}
      alt={label.title}
      title={label.title}
      width={64}
      height={64}
      className="!object-contain !h-16"
    />
    {/* <div className="font-bold text-md text-gray-900">{label.title}</div> */}
    <div
      className="
        absolute left-0 right-0 -bottom-16
        opacity-0 max-h-0
        group-hover:opacity-100 group-hover:max-h-32
        transition-all duration-500
        px-6 py-2
        bg-white
        text-center
        text-gray-700
        pointer-events-none
        font-semibold
      "
    >
      {label.signe}
    </div>
  </div>) : null}
</div>
</div>
  );
}
