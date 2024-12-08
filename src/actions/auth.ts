"use server";

import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";

export async function signInWithProvider(
  provider: string,
  callbackUrl: string,
) {
  try {
    await signIn(provider, {
      redirectTo: callbackUrl,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      return { success: false, error: error.type };
    }
    return { success: false, error: "default" };
  }
}
