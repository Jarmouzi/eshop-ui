import { SEO } from "./Product";

export type Category =  {
    'Id': string,
    "ParentId": string | null,
    "Title": string,
    "Path": string | '#',
    "Level": number,
    "GrandParentId": string | null,
    "DisplayOrder": number,
    "Confirmed": boolean,
    "ParentTitle": string | null,
    "PrimaryCategories": null,
    "SecondaryCategories": null,
    "modifiedBy": string | null,
    "createDate": Date | null,
    "modifyDate": Date | null,
    "expireDate": Date | null
  }

  export type Collection = {
    Id: string,
    //Handle: string;
    Path: string | '#',
    Title: string;
    //Description: string;
    //Seo: SEO;
    //updatedAt: string;
  };