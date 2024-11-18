'use client';

import React from "react";
import { Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import { TabData } from "@/lib/types/TabData";


export default function TabInfo({
    title,
    list,
    fullWidth

  }: {
    title: string;
    list: TabData[];
    fullWidth?: boolean
  }) {

  return (
    <Tabs 
    aria-label="Options" 
    color="primary" 
    variant="underlined"
    fullWidth= {fullWidth}
    classNames={{
      tabList: "gap-6 relative rounded-none p-0 border-b",
      cursor: "w-full bg-primary",
      tab: "min-w-fit w-1/3 px-0 h-12 border-0",
      tabContent: "group-data-[selected=true]:text-primary"

    }}
  >
    {/* <Tabs aria-label={title} color="primary" radius="full"> */}
    {list.map((tab, i) => (
        <Tab key={tab.Id} title={tab.Title}>            
            <div className="flex rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-black md:p-12">
                {tab.Content}
            </div>  
        </Tab>
    ))}
    </Tabs>
  );
}
