"use client";
import React from "react";
import {Listbox, ListboxItem, ListboxSection, cn} from "@nextui-org/react";
import { ProductFeature } from "@/lib/types/Product";
import { ListboxWrapper } from "./Listbox-wrapper";
// import {AddNoteIcon} from "./AddNoteIcon.jsx";
// import {CopyDocumentIcon} from "./CopyDocumentIcon.jsx";
// import {EditDocumentIcon} from "./EditDocumentIcon.jsx";
// import {DeleteDocumentIcon} from "./DeleteDocumentIcon.jsx";

export default function FeatureList({
    title,
    list,
    iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0"
  }: {
    title: string;
    list: ProductFeature[];
    iconClasses?: string;
  }) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                
    {list.map((parent, i) => (
      <ListboxWrapper key={i}>
        <Listbox variant="flat" aria-label={title}>  
          <ListboxSection key={parent.Id} title={parent.Title}>  
          {parent.Features.map((feature, i) => (
            <ListboxItem
              key={feature.Id} 
              description={feature.Value}
              //startContent={<AddNoteIcon className={iconClasses} />}
            >
              {feature.Title}
            </ListboxItem>
          ))}
          </ListboxSection> 
        </Listbox>
      </ListboxWrapper>
    ))}
    </div>
  );
}
