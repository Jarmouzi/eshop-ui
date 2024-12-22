import { ProductSeo } from "../types/ProductSeo";
import { GetData, PostData } from "./service";

export async function getProductSeo(id: string): Promise<ProductSeo> {
  const res = await GetData<ProductSeo>({
    path: "ProductSeo/Get?" + id,
  });

  return res.body;
}
export async function getAllProductSeos(): Promise<ProductSeo[]> {
  const res = await GetData<ProductSeo[]>({
    path: "ProductSeo/GetAll",
  });

  return res.body;
}
export async function getProductSeos(jp: string): Promise<ProductSeo[]> {
  const res = await PostData<ProductSeo[]>({
    path: "ProductSeo/GetFiltered",
    variables: jp,
  });

  return res.body;
}
