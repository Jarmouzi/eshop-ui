import { SelectItem } from "../types/SelectItem";
import { GetData, PostData } from "./service";

export async function getState(id: string): Promise<State> {
  const res = await GetData<State>({
    path: "State/Get?" + id,
  });

  return res.body;
}
export async function getAllStates(): Promise<SelectItem[]> {
  const res = await GetData<SelectItem[]>({
    path: "State/GetAll",
  });

  return res.body;
}
export async function getStates(jp: string): Promise<State[]> {
  const res = await PostData<State[]>({
    path: "State/GetFiltered",
    variables: jp,
  });

  return res.body;
}
