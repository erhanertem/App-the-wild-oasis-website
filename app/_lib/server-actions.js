// DIRECTIVE USED FOR FUNCTIONS SERVING SERVER ACTIONS
"use server";

import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import { supabase } from "@/app/_lib/supabase";
import { userFormSchema } from "@/app/_lib/zod-schema";
import { auth, signIn, signOut } from "@/app/_lib/auth";

export async function updateProfile(prevState, formData) {
  // console.log("👉Server action: ", formData);
  // AUTHENTICATION HANDLING: SERVER ACTIONS NEEDS TO BE CHECKED FOR AUTHENTICATION BEFORE PROCEEDING WITH MUTATIONS
  // GUARD CLAUSE - IT'S A COMMON PRACTICE NOT TO USE TRY...CATCH IN SERVER ACTIONS
  // AUTHENTICATION CHECK TO PROCEED WITH REST OF THE ACTIONS
  const session = await auth();
  // // HIT THE SERVER-SIDE CLOSEST ERROR BOUNDARY
  // // ERROR BOUNDARY HANDLING: IN ORDER TO CREATE CUSTOM ERROR BOUNDARY INSTEAD OF A GLOBAL ONE YOU CAN PLACE A NEW ERROR.JS TO THE ROUTE WHERE THIS FUNCTION IS TRIGGERED WHICH IS @ ACCOUNT/PROFILE
  if (!session) throw new Error("You must be logged in");

  // SETUP CONFORM+ZOD ON THE BACKEND FOR SERVER-SIDE RE-VALIDATION
  const submission = parseWithZod(formData, { schema: userFormSchema });
  // CHECK CONFORM FORM SUBMISSION SUCCESS
  if (submission.status !== "success") return submission.reply();

  // READ FORM DATA
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);
  if (error) {
    throw new Error("Profile could not be updated");
  }

  revalidatePath("/account/profile"); // Revalidate cache only on this endpoint
}

// SERVES SERVER ACTION @ SIGNINBUTTON
export async function signInAction() {
  await signIn(
    "google",
    { redirectTo: "/account" }, // Redirect to after sigin success
  );
}
// SERVES SERVER ACTION @ SIGNOUTBUTTON
export async function signOutAction() {
  await signOut(
    { redirectTo: "/" }, // Redirect to after sigout success
  );
}
