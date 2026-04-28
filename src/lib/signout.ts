"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signOutAction() {
  const cookieStore = await cookies();
  // Clear all NextAuth session cookies (handles both dev and __Secure- prod prefix)
  cookieStore.getAll().forEach((cookie) => {
    if (cookie.name.includes("next-auth")) {
      cookieStore.delete(cookie.name);
    }
  });
  redirect("/signin");
}
