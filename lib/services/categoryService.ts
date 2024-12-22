import { GetData, PostData } from "./service";
import { Category } from "../types/Category";
import { Menu } from "../types/Menu";

export async function getCategory(id: string): Promise<Category> {
  const res = await GetData<Category>({
    path: "Category/Get?id=" + id,
  });

  return res.body;
}
export async function getAllCategories(): Promise<Category[]> {
  const res = await GetData<Category[]>({
    path: "Category/GetAll",
  });

  return res.body;
}
export async function getCategories(jp: string): Promise<Category[]> {
  const res = await PostData<Category[]>({
    path: "Category/GetFiltered",
    variables: jp,
  });

  return res.body;
}

export async function getMenu(): Promise<Menu[]> {
  const res = await GetData<Menu[]>({
    path: "Category/GetMenu",
  });

  return res.body;
}

export async function getDataWithToken() {
  const token = "your-access-token";
  const response = await fetch("http://localhost:5291/api/Category/GetAll", {
    headers: {
      //"Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    //credentials: "include" // Include cookies for authorization
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    // Handle the error response
    return null;
  }
}

export async function getCollections(): Promise<Menu[]> {
  const res = await GetData<Menu[]>({
    path: "Category/GetFiltered",
  });

  const collections: Menu[] = [
    {
      Id: "1",
      Title: "همه",
      PageAddress: "/search",
      Children: [],
    },
    ...res.body,
  ];
  return collections;
}
