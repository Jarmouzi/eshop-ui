import { Page } from "../types/Page";
import { GetData, PostData } from "./service";

export async function getPage(id: string): Promise<Page> {
  const res = await GetData<Page>({
    path: "Page/Get?" + id,
  });

  return res.body;
}
export async function getAllCategories(): Promise<Page[]> {
  const res = await GetData<Page[]>({
    path: "Page/GetAll",
  });

  return res.body;
}
export async function getCategories(jp: string): Promise<Page[]> {
  const res = await PostData<Page[]>({
    path: "Page/GetFiltered",
    variables: jp,
  });

  return res.body;
}
