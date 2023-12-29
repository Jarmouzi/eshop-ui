// export async function login() {
//     const response = await fetch("http://localhost:5290/api/Auth/Login", {
//       body: {{
//         "userName": "admin",
//         "password": "Etm@14863"
//       },
//       credentials: "include" // Include cookies for authorization
//     }});
  
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       // Handle the error response
//       return null;
//     }
//   }

export async function login(userName: string, password: string ) {
    const data = { userName: userName, password: password }; 
    const response = await fetch("http://localhost:5290/api/Auth/Login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      // Handle the error response
      return null;
    }
  }