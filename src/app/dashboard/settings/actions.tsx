"use server";

import { getServerSession } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

function mergeJson(
  base: Prisma.JsonValue | null | undefined,
  patch: Record<string, unknown>
): Prisma.JsonObject {
  const baseObj =
    base && typeof base === "object" && !Array.isArray(base)
      ? (base as Prisma.JsonObject)
      : {};
  return Object.fromEntries(
    Object.entries({ ...baseObj, ...patch }).map(([key, value]) => [key, value as Prisma.JsonValue])
  );
}

export async function loadMeAndSettings() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;

  return prisma.user.findUnique({
    where: { email: session.user.email },
    include: { settings: true },
  });
}

export async function updateProfile(formData: FormData): Promise<void> {
  const session = await getServerSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const name = (formData.get("name") as string | null) ?? null;
  const school = (formData.get("school") as string | null) ?? null;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name },
  });

  const existing = await prisma.settings.findUnique({
    where: { userId: session.user.id },
    select: { json: true },
  });
  const newJson = mergeJson(existing?.json ?? {}, { school });

  await prisma.settings.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, json: newJson },
    update: { json: newJson },
  });

  revalidatePath("/dashboard/settings");
}

export async function updateSettings(formData: FormData): Promise<void> {
  const session = await getServerSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const theme = (formData.get("theme") as string) || "system";
  const editorFontSize = Number(formData.get("editorFontSize") ?? 14);
  const lockDefault = formData.get("lockDefault") === "on";
  const slidesPerPage = Number(formData.get("slidesPerPage") ?? 1);

  await prisma.settings.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, theme, editorFontSize, lockDefault, slidesPerPage },
    update: { theme, editorFontSize, lockDefault, slidesPerPage },
  });

  revalidatePath("/dashboard/settings");
}