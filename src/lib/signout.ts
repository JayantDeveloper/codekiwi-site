"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signOutAction() {
  // Clear the NextAuth session cookie
  const cookieStore = await cookies();
  
  // Delete all NextAuth cookies
  cookieStore.getAll().forEach((cookie) => {
    if (cookie.name.includes('next-auth')) {
      cookieStore.delete(cookie.name);
    }
  });
  
  // Redirect to signin page
  redirect("/signin");
}