import React from 'react'
import { GetData, PostData } from './service';
import { Category, Collection } from '../types/Category';

export async function getCategory(id: string): Promise<Category>  {

  const res = await GetData<Category>({
    path: 'Category/Get?' + id,
  });

  return res.body;
}
export async function getAllCategories(): Promise<Category[]>  {

  const res = await GetData<Category[]>({
    path: 'Category/GetAll',
  });

  return res.body;
}
export async function getCategories(jp: string): Promise<Category[]>  {

  const res = await PostData<Category[]>({
    path: 'Category/GetFiltered',
    variables: jp,
  });

  return res.body;
}

export async function getMenu(): Promise<Menu[]>  {

  const res = await GetData<Menu[]>({
    path: 'Category/GetMenu',
  });

  return res.body;
}

export async function getDataWithToken() {
    const token = "your-access-token";
    const response = await fetch("http://localhost:5291/api/Category/GetAll", {
      headers: {
        //"Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
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

  export async function getCollections(): Promise<Collection[]> {
    const res = await GetData<Collection[]>({
      path: 'Category/GetFiltered',
    });

    const collections: Collection[] = [
      {
        Id: '1',
        //Handle: '',
        Title: 'همه',
        //Description: 'همه محصولات',
        // Seo: {
        //   Title: 'All',
        //   Description: 'All products',
        //   IsName: false
        // },
        Path: '/search',
        //updatedAt: new Date().toISOString()
      },
      ...res.body
    ];
  
    return collections;
  }