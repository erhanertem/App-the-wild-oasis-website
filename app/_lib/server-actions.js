// DIRECTIVE USED FOR FUNCTIONS SERVING SERVER ACTIONS
"use server";

import { signIn } from "@/app/_lib/auth";

// SERVES SERVER ACTION @ SIGNINBUTTON
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
