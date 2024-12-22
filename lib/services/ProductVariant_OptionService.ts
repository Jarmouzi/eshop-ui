import { ProductVariant_Option } from "../types/ProductVariant_Option";
import { GetData, PostData } from "./service";

export async function getProductVariant_Option(
  id: string
): Promise<ProductVariant_Option> {
  const res = await GetData<ProductVariant_Option>({
    path: "ProductVariant_Option/Get?" + id,
  });

  return res.body;
}
export async function getAllProductVariant_Options(): Promise<
  ProductVariant_Option[]
> {
  const res = await GetData<ProductVariant_Option[]>({
    path: "ProductVariant_Option/GetAll",
  });

  return res.body;
}
export async function getProductVariant_Options(
  jp: string
): Promise<ProductVariant_Option[]> {
  const res = await PostData<ProductVariant_Option[]>({
    path: "ProductVariant_Option/GetFiltered",
    variables: jp,
  });

  return res.body;
}
