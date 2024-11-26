'use client'
import { Card, CardBody } from "@nextui-org/card";
import {Tabs, Tab} from "@nextui-org/tabs";
import { usePathname, useRouter } from "next/navigation";

export default function ProfileTabs(){
  const pathname = usePathname();
    const router = useRouter();
    const handleTabChange = (key: any) => {
        router.push(key ); 
    };
  return  (
    <Tabs 
      fullWidth
      size="lg"
      isVertical 
      variant="light"
      color="primary"
      aria-label="Options" 
      selectedKey={pathname} 
      onSelectionChange={handleTabChange}> 
      <Tab key="/profile" title="پروفایل کاربر">
      </Tab>
      <Tab key="/old-payments" title="سوابق خرید">
      </Tab>
      <Tab key="/message" title="پیام ها">
      </Tab>
      <Tab key="/support" title="پشتیبانی">
      </Tab>
      <Tab key="/help" title="راهنما">
      </Tab>
    </Tabs>);
}