import React from 'react'

export default async function getMenu() {
    const res = await fetch(`http://localhost:5291/api/Category/GetFiltered`)
    if(!res.ok) undefined //throw new Error ('Failed to fetch data!')
    return res.json()
}

export async function getDataWithToken() {
    const token = "your-access-token";
    const response = await fetch("http://localhost:5291/api/Category/GetFiltered", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      credentials: "include" // Include cookies for authorization
    });
  
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Handle the error response
      return null;
    }
  }