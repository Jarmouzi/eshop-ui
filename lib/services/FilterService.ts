import { FilterItem } from "../types/Filter";
import { GetData, PostData } from "./service";

export async function getFilter(id: string): Promise<FilterItem> {
  const res = await GetData<FilterItem>({
    path: "Filter/Get?" + id,
  });

  return res.body;
}
export async function getAllFilters(): Promise<FilterItem[]> {
  const res = await GetData<FilterItem[]>({
    path: "Filter/GetAll",
  });

  return res.body;
}
export async function getFilters(jp: string): Promise<FilterItem[]> {
  const res = await PostData<FilterItem[]>({
    path: "Filter/GetFiltered",
    variables: jp,
  });

  return res.body;
}
