// export async function login() {
//     const response = await fetch("http://localhost:5290/api/Auth/Login", {
//       body: {{
//         "userName": "admin",
//         "password": "Etm@14863"
//       },
//       credentials: "include" // Include cookies for authorization
//     }});

import { cookies } from "next/headers";

//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       // Handle the error response
//       return null;
//     }
//   }
const domain = process.env.AUTH_Domain;

export async function login(username: string, password: string) {
  const data = { Username: username, Password: password };
  const response = await fetch(`${domain}api/Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      Username: username,
      Password: password,
      grant_type: "password",
    }),
  });

  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    return null;
  }
}
export async function isAuthenticated() {
  const token = (await cookies()).get("currentUser")?.value;
  const response = await fetch(
    `${process.env.API_Domain}Account/IsAuthenticated`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: null,
    }
  );
  if (response.ok) {
    const result = await response.json();

    if (!result)
      (await cookies()).set("currentUser", "", { expires: new Date(0) });

    return result;
  } else {
    return null;
  }
}

export async function logout() {
  const token = (await cookies()).get("currentUser")?.value;
  const response = await fetch(`${domain}api/Auth/Logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: null,
  });

  (await cookies()).set("currentUser", "", { expires: new Date(0) });

  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    return null;
  }
}
