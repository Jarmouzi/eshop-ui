import { GetData, PostData } from "./service";
import { Supplier } from "../types/Supplier";
import { SelectItem } from "../types/SelectItem";

export async function getSupplier(id: string): Promise<Supplier> {
  const res = await GetData<Supplier>({
    path: "Supplier/Get?" + id,
  });

  return res.body;
}
export async function getAllSuppliers(): Promise<Supplier[]> {
  const res = await GetData<Supplier[]>({
    path: "Supplier/GetAll",
  });

  return res.body;
}
export async function getSuppliers(jp: string): Promise<Supplier[]> {
  const res = await PostData<Supplier[]>({
    path: "Supplier/GetFiltered",
    variables: jp,
  });

  return res.body;
}
export async function GetCollectionSuppliers(
  cn: string
): Promise<SelectItem[]> {
  const res = await GetData<SelectItem[]>({
    path: "Supplier/GetCollectionSuppliers?cn=" + cn,
  });

  return res.body;
}
