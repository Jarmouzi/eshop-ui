"use client";
import React from "react";
import { Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import { TabData } from "@/lib/types/TabData";


export default function TabInfo({
    title,
    list
  }: {
    title: string;
    list: TabData[];
  }) {

  return (
    <Tabs aria-label={title} color="primary" radius="full">
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
