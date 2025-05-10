import { Option } from "../types/Option";
import { GetData, PostData } from "./service";

// export async function getOption(id: string): Promise<Option> {
//   const res = await GetData<Option>({
//     path: "Option/Get?" + id,
//   });

//   return res.body;
// }
// export async function getAllOptions(): Promise<Option[]> {
//   const res = await GetData<Option[]>({
//     path: "Option/GetAll",
//   });

//   return res.body;
// }

export async function GetCollectionOptions(cn: string): Promise<Option[]> {
  const res = await GetData<Option[]>({
    path: "Option/GetCollectionOptions?cn=" + cn,
  });

  return res.body;
}
