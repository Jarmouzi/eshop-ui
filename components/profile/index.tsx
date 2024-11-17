import { cookies } from 'next/headers';
import { getCart } from '@/lib/services/CartService';
//import UserDropdown from './user-dropdown';

export default async function Profile() {
  const currentUser = cookies().get("currentUser")?.value;

  // return <UserDropdown  />;
}
