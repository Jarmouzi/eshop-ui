'use client'
import { HelpMenuData } from '@/lib/constants';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function HelpMenu() {    
  const router = useRouter()
    
  return (
    <div className={'relative flex h-11 w-11 ml-2 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white'}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
            <QuestionMarkCircleIcon className='h-5 transition-all ease-in-out hover:scale-110' />
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Profile Actions" 
          variant="light"
          color="primary"
          onAction={(key) => { router.push(`${key}`)}}>

            {HelpMenuData.map((tab, i) => (
                <DropdownItem key={tab.PageAddress}>            
                    {tab.Title}
                </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </div>)
}
