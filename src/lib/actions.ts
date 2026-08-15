"use server"

import { signOut } from "@/auth";

export async function deslogar() {
  await signOut({ redirectTo: "/login" })
}