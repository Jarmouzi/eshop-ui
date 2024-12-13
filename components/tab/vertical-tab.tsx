'use client'
import { SimpleMenu } from "@/lib/types/Menu";
import {Tabs, Tab} from "@nextui-org/tabs";
import { usePathname, useRouter } from "next/navigation";

export default function VerticalTab({list}: {list: SimpleMenu[]}) {

    const pathname = usePathname();
    const router = useRouter();

    const handleTabChange = (key: any) => {
        console.log(key)
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
        selectedKey={`${pathname}`} 
        onSelectionChange={handleTabChange}> 
            {list.map((tab, i) => (
                <Tab key={`${tab.PageAddress}`} title={tab.Title}>            
                    {tab.Content} 
                </Tab>
            ))}
        </Tabs>);
}