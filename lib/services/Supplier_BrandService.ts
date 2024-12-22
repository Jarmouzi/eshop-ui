import { Supplier_Brand } from "../types/Supplier_Brand";
import { GetData, PostData } from "./service";

export async function getSupplier_Brand(id: string): Promise<Supplier_Brand> {
  const res = await GetData<Supplier_Brand>({
    path: "Supplier_Brand/Get?" + id,
  });

  return res.body;
}
export async function getAllSupplier_Brands(): Promise<Supplier_Brand[]> {
  const res = await GetData<Supplier_Brand[]>({
    path: "Supplier_Brand/GetAll",
  });

  return res.body;
}
export async function getSupplier_Brands(
  jp: string
): Promise<Supplier_Brand[]> {
  const res = await PostData<Supplier_Brand[]>({
    path: "Supplier_Brand/GetFiltered",
    variables: jp,
  });

  return res.body;
}
