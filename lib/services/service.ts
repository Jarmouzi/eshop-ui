const domain = process.env.API_Domain;

export async function GetData<T>({
    path = '',
    cache = 'force-cache', //'no-store',
    tags
  }: {
    path?: string,
    cache?: RequestCache;
    tags?: string[];
    variables?: T;
  }): Promise<{ status: number; body: T } | never> {
    try {
      const result = await fetch(domain + path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //'Accept': 'application/json'
          //"Authorization": `Bearer ${token}`,
        },
        //credentials: "include" // Include cookies for authorization
        cache,
        ...(tags && { next: { tags } })
      });
        

      const text = await result.text(); // Get raw text first
      let body;
      try {
        body = JSON.parse(text); // Attempt to parse as JSON
        // if (body.errors) {
        //   throw body.errors[0];
        // }

      } catch (error) {
        console.error('JSON Parse Error:', error);
        //throw new Error('Response is not valid JSON');
      }
      //const body = await result.json();
  
      // if (body.errors) {
      //   throw body.errors[0];
      // }
  
      return {
        status: result.status,
        body
      };
    } catch (e) {
      throw e;
      //handle error
    }
  }

export async function PostData<T>({
    path = '',
    cache = 'force-cache',
    tags,
    variables
  }: {
    path?: string,
    cache?: RequestCache;
    tags?: string[];
    variables?: string;
  }): Promise<{ status: number; body: T } | never> {
    try {
      const result = await fetch(domain + path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //"Authorization": `Bearer ${token}`,
        },
        //credentials: "include" // Include cookies for authorization
        body: JSON.stringify({
          ...(variables && { variables })
        }),
        cache,
        ...(tags && { next: { tags } })
      });
  
      const body = await result.json();
  
      if (body.errors) {
        throw body.errors[0];
      }
  
      return {
        status: result.status,
        body
      };
    } catch (e) {
      throw e;
      //handle error
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
