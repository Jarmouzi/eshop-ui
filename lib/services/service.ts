"use server";
import { SearchParams } from "next/dist/server/request/search-params";
import { cookies } from "next/headers";

const domain = process.env.API_Domain;

export async function GetData<T>({
  path = "",
  cache = "force-cache", //'no-store',
  tags,
}: {
  path?: string;
  cache?: RequestCache;
  tags?: string[];
  variables?: T;
}): Promise<{ status: number; body: T } | never> {
  try {
    const token = (await cookies()).get("currentUser")?.value;
    const result = await fetch(domain + path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //'Accept': 'application/json'
        Authorization: `Bearer ${token}`,
      },
      //credentials: "include" // Include cookies for authorization
      cache,
      ...(tags && { next: { tags } }),
    });

    try {
      if (!result.ok)
        return {
          status: 500,
          body: undefined as T,
        };

      let body;
      const text = await result.text();

      body = JSON.parse(text);

      if (body.errors) {
        console.log(` Server Error on GetData from "${path}": ${body.error}`);
      }

      return {
        status: result.status,
        body,
      };
    } catch (error) {
      console.error(`JSON Parse Error on GetData from "${path}": `, error);
    }
  } catch (e) {
    console.log(`an error acourd on GetData from "${path}": `, e);
  }
  return {
    status: 500,
    body: undefined as T,
  };
}

export async function PostData<T>({
  path = "",
  //cache = "force-cache",
  tags,
  variables,
}: {
  path?: string;
  //cache?: RequestCache;
  tags?: string[];
  variables?: string;
}): Promise<{ status: number; body: T } | never> {
  try {
    console.log(
      JSON.stringify({
        ...(variables && { variables }),
      })
    );
    const token = (await cookies()).get("currentUser")?.value;
    const result = await fetch(domain + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //credentials: "include" // Include cookies for authorization
      body: JSON.stringify({
        ...(variables && { variables }),
      }),
      //cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      console.log(`Post Data Server Error for "${path}": ${body.error}`);
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    console.log(`PostData Fetch Error for "${path}": ${e}`);
    return {
      status: 500,
      body: {} as T,
    };
  }
}

export async function PostDataModel<T>({
  path = "",
  //cache = "force-cache",
  tags,
  model,
}: {
  path?: string;
  //cache?: RequestCache;
  tags?: string[];
  model?: T;
}): Promise<{ status: number; body: T } | never> {
  try {
    console.log(JSON.stringify(model));
    const token = (await cookies()).get("currentUser")?.value;
    const result = await fetch(domain + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //credentials: "include" // Include cookies for authorization
      body: JSON.stringify(model),
      //cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      console.log(`PostDataModel Error for "${path}": ${body.error}`);
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    console.log(`PostDataModel Fetch Error for "${path}": ${e}`);
    return {
      status: 500,
      body: {} as T,
    };
  }
}

export async function PutData<T>({
  path = "",
  //cache = "force-cache",
  tags,
  model,
}: {
  path?: string;
  //cache?: RequestCache;
  tags?: string[];
  model?: T;
}): Promise<{ status: number; body: T } | never> {
  try {
    console.log(JSON.stringify(model));
    const token = (await cookies()).get("currentUser")?.value;
    const result = await fetch(domain + path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //credentials: "include" // Include cookies for authorization
      body: JSON.stringify(model),
      //cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      console.log(`Update Data Error for "${path}": ${body.error}`);
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    console.log(`Update Fetch Error for "${path}": ${e}`);
    return {
      status: 500,
      body: {} as T,
    };
  }
}

// export async function apiFetch<T>({
//   cache = 'force-cache',
//   headers,
//   query,
//   tags,
//   variables
// }: {
//   cache?: RequestCache;
//   headers?: HeadersInit;
//   query: string;
//   tags?: string[];
//   variables?: ExtractVariables<T>;
// }): Promise<{ status: number; body: T } | never> {
//   try {
//     const result = await fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'API-Access-Token': key,
//         ...headers
//       },
//       body: JSON.stringify({
//         ...(query && { query }),
//         ...(variables && { variables })
//       }),
//       cache,
//       ...(tags && { next: { tags } })
//     });

//     const body = await result.json();

//     if (body.errors) {
//       throw body.errors[0];
//     }

//     return {
//       status: result.status,
//       body
//     };
//   } catch (e) {
//     if (isAPIError(e)) {
//       throw {
//         cause: e.cause?.toString() || 'unknown',
//         status: e.status || 500,
//         message: e.message,
//         query
//       };
//     }

//     throw {
//       error: e,
//       query
//     };
//   }
// }
