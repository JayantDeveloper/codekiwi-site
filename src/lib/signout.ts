"use server";

import { redirect } from "next/navigation";

export async function signOutAction(_formData: FormData): Promise<void> {
  void _formData; 
  redirect("/api/auth/signout?callbackUrl=/");
}