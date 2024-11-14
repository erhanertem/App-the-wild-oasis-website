// DIRECTIVE USED FOR FUNCTIONS SERVING SERVER ACTIONS
"use server";

import { revalidatePath } from "next/cache";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "@/app/_lib/supabase";

export async function updateProfile(formData) {
  // console.log("👉Server action: ", formData);
  // AUTHENTICATION HANDLING: SERVER ACTIONS NEEDS TO BE CHECKED FOR AUTHENTICATION BEFORE PROCEEDING WITH MUTATIONS
  // GUARD CLAUSE - IT'S A COMMON PRACTICE NOT TO USE TRY...CATCH IN SERVER ACTIONS
  // AUTHENTICATION CHECK TO PROCEED WITH REST OF THE ACTIONS
  const session = await auth();
  // HIT THE SERVER-SIDE CLOSEST ERROR BOUNDARY
  // ERROR BOUNDARY HANDLING: IN ORDER TO CREATE CUSTOM ERROR BOUNDARY INSTEAD OF A GLOBAL ONE YOU CAN PLACE A NEW ERROR.JS TO THE ROUTE WHERE THIS FUNCTION IS TRIGGERED WHICH IS @ ACCOUNT/PROFILE
  if (!session) throw new Error("You must be logged in");

  // READ FORM DATA
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // CLIENT SIDE ENTRY ERROR TO BE PASSED ONTO CLIENT AS FEEDBACK
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID");
  }

  const updateData = { nationality, countryFlag, nationalID };
  // console.log(updateData);

  // SERVER RELATED ERROR TO BE PASSED ONTO CLIENT AS FEEDBACK
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  // REVALIDATE PATH TO REFRESH THE CACHE
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
