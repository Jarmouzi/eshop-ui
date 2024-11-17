import { login } from "@/lib/services/AuthService";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export async function POST(request: Request, res: NextApiResponse) {
  //req: NextApiRequest, res: NextApiResponse) {
  try {
    //const { username, password } = req.body;
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "";
    const password = searchParams.get("password") || "";
    await login(username, password);

    // if (res.statusCode === 200) {
    //   const sessionData = req.body;

    //   cookies().set("currentUser", sessionData, {
    //     httpOnly: true,
    //     secure: true,
    //     maxAge: 60 * 60 * 24,
    //   });
    //   //const encryptedSessionData = encrypt(sessionData)

    //   // const cookie = serialize('currentUser', sessionData, {
    //   //   httpOnly: true,
    //   //   secure: process.env.NODE_ENV === 'production',
    //   //   maxAge: 60 * 60 * 24 * 7, // One week
    //   //   path: '/',
    //   // })
    //   // res.setHeader('Set-Cookie', cookie)
    //   res.status(200).json({ message: "Successfully set cookie!" });
    // }

    return res.status(200).json({ success: true });
  } catch (error) {
    // if (error.type === 'CredentialsSignin') {
    //   res.status(401).json({ error: 'Invalid credentials.' })
    // } else {
    return res.status(500).json({ error: error });
    // }
  }
}
