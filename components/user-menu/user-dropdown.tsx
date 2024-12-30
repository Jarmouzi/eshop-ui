'use client'
import { UserProfile } from "@/lib/types/UserProfile";
import { UserIcon } from "@heroicons/react/24/outline";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { useRouter } from 'next/navigation'

export default function UserDropdown({userProfile} :{userProfile: UserProfile | undefined}) {
  const user = userProfile?.Name? `${userProfile.Name} ${userProfile.Family} `: 'کاربر گرامی ';

  const router = useRouter()
  return (
    <div className={'relative flex h-11 w-11 ml-2 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white'}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
            <UserIcon className='h-4 transition-all ease-in-out hover:scale-110' />
          {/* <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          /> */}
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Profile Actions" 
          variant="light"
          color="primary"
          onAction={(key) => { router.push(`/${key}`)}}>

          <DropdownItem key="profile/" className="h-14 min-w-24 gap-2">
            <p className="font-semibold"> {user} <span className="font-normal">خوش آمدید</span></p>            
          </DropdownItem>
          <DropdownItem key="profile">
            پروفایل
          </DropdownItem>
          <DropdownItem key="orders">
            سوابق خرید
          </DropdownItem>
          <DropdownItem key="message">پیام ها</DropdownItem>
          <DropdownItem key="support">پشتیبانی</DropdownItem>
          <DropdownItem key="help">
            راهنما
          </DropdownItem>
          <DropdownItem key="signout" color="danger">
            خروج
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="@tonyreichert"
            name="Tony Reichert"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@tonyreichert</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
    </div>
  );
}