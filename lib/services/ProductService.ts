import { SimpleProduct, Product, collection } from "../types/Product";
import { GetData, PostData } from "./service";

export async function getProduct(id: string): Promise<Product> {
  const res = await GetData<Product>({
    path: `Product/Get?id=${id}`,
  });

  return res.body;
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await GetData<Product[]>({
    path: "Product/GetAll",
  });

  return res.body;
}
export async function getProducts(jp: string): Promise<SimpleProduct[]> {
  const res = await GetData<SimpleProduct[]>({
    path: "Product/GetFiltered?variables=" + jp,
  });

  return res.body;
}

export async function getCollectionProducts(
  cn: string
): Promise<SimpleProduct[]> {
  const res = await GetData<SimpleProduct[]>({
    path: "Product/GetCollectionProducts?cn=" + cn,
  });

  return res.body;
}

export async function getCollectionsForProduct(
  variantId: string
): Promise<collection[]> {
  const res = await GetData<collection[]>({
    path: `Product/getCollectionsForProduct?v=${variantId}`,
  });

  return res.body;
}

export async function getProductHandles(): Promise<{ handle: string }[]> {
  const res = await GetData<{ handle: string }[]>({
    path: "Product/GetAll",
  });

  return res.body;
}
