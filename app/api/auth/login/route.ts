import { login } from "@/lib/services/AuthService";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // res: NextApiResponse) {
  //req: NextApiRequest, res: NextApiResponse) {
  try {
    //const { username, password } = req.body;
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "";
    const password = searchParams.get("password") || "";
    const res = await login(username, password);

    if (res) {
      const sessionData = res;

      cookies().set("currentUser", sessionData, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
      });
      //const encryptedSessionData = encrypt(sessionData)

      // const cookie = serialize('currentUser', sessionData, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   maxAge: 60 * 60 * 24 * 7, // One week
      //   path: '/',
      // })
      // res.setHeader('Set-Cookie', cookie)
      res.status(200).json({ message: "Successfully set cookie!" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // if (error.type === 'CredentialsSignin') {
    //   res.status(401).json({ error: 'Invalid credentials.' })
    // } else {
    return NextResponse.json({ error: error });
    // }
  }
}
