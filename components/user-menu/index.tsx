import { cookies } from 'next/headers';
import UserDropdown from './user-dropdown';
import { UserIcon } from '@heroicons/react/24/outline';

export default async function UserMenu() {    
  const currentUser = cookies().get("currentUser")?.value;
  
  if(!currentUser) 
  {
    return (
      <a href={'/login/'}>
        <div className="ml-2 relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
          <UserIcon className='h-4 transition-all ease-in-out hover:scale-110' />
        </div>
      </a> );
  }
  else 
    return <UserDropdown  />;
}
