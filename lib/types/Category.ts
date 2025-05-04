import { SEO } from "./Product";

export type Category = {
  id: string;
  title: string;
  parentId: string | null;
  parentTitle: string | null;
  grandParentId: string | null;
  grandParentTitle: string | null;
  //Description: string;
  //Seo: SEO;
};
