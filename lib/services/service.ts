const domain = process.env.API_Domain;

export async function GetData<T>({
    path = '',
    cache = 'force-cache',
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
          //"Authorization": `Bearer ${token}`,
        },
        //credentials: "include" // Include cookies for authorization
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
