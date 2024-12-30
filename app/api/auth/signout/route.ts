import { logout } from "@/lib/services/AuthService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("logout from server begins");
    const res = await logout();

    await (await cookies()).delete("currentUser");
    console.log("cookies deleted");
    if (res) {
      res
        .status(200)
        .json({ message: "Successfully signout and delete cookie!" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
