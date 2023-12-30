type Menu =  {
    "Id": string,
    "Title": string,
    "PageAddress": string,
    "Level": number,
    "DisplayOrder": number,
    "Confirmed": boolean,
    "CreateDate": Date | null,
    "Children": Menu[]
  }