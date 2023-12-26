type Product =  {
    "id": string,
    "parentId": string | null,
    "title": string,
    "path": string | '#',
    "level": number,
    "grandParentId": string | null,
    "displayOrder": number,
    "confirmed": boolean,
    "parentTitle": string | null,
    "primaryCategories": null,
    "secondaryCategories": null,
    "modifiedBy": string | null,
    "createDate": Date | null,
    "modifyDate": Date | null,
    "expireDate": Date | null
  }