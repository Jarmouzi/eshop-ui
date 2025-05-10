import { Feature } from "../types/Product";
import { GetData, PostData } from "./service";
import { SelectItem } from "@/lib/types/SelectItem";

export async function getFeature(id: string): Promise<Feature> {
  const res = await GetData<Feature>({
    path: "Feature/Get?" + id,
  });

  return res.body;
}
export async function getAllFeatures(): Promise<Feature[]> {
  const res = await GetData<Feature[]>({
    path: "Feature/GetAll",
  });

  return res.body;
}
export async function GetCollectionFeatures(cn: string): Promise<SelectItem[]> {
  const res = await GetData<SelectItem[]>({
    path: "Feature/GetCollectionFeatures?cn=" + cn,
  });

  return res.body;
}
