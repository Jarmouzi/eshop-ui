// type Page =  {
// 	'Title': string,
// 	'ThemeAndOtherOptions': string | null,
// 	'CategoryId': number | null,
// 	'BrandId': string | null,
// 	'Confirmed': boolean | null,
// 	'seo': string | null,

import { SEO } from "./Product";

// }
export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};
