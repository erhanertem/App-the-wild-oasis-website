// DIRECTIVE USED FOR FUNCTIONS SERVING SERVER ACTIONS
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";

import { supabase } from "@/app/_lib/supabase";
import { userFormSchema } from "@/app/_lib/zod-schema";
import { auth, signIn, signOut } from "@/app/_lib/auth";
import { bookingAuthroizationCheck } from "@/app/_utility/checkIfBookingBelongsToUser";

export async function updateReservation(formData) {
  // GUARD CLAUSE - AUTHENTICATION - CHECK TO PROCEED WITH REST OF THE ACTIONS
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const bookingId = Number(formData.get("bookingId"));

  // GUARD CLAUSE - AUTHORIZATION - ANY MALICIOUS USER CAN UPDATE THE RESERVATIONS NOT BELONGING THEM. IN ORDER TO AVOID SUCH SCENARIO, THE BOOKINGID NEEDS TO BE THE RESERVATION OF THE USER AND ONLY THEN IT SHOULD BE UPDATED.
  bookingAuthroizationCheck(session, bookingId, "update");

  // MUTATE DATA
  const updatedData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000), // Limti words input into the observations field - precaution
  };
  // console.log(formData);

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be updated");
  }

  // REVALIDATE STALE CACHE
  // REVALIDATE @ STATIC ROUTE
  revalidatePath("/account/reservations");
  // REVALIDATE @ DYNAMIC ROUTE
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // REDIRECT TO ...
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  // // TESTING OPTIMISTIC DELETE
  // await new Promise((res) => setTimeout(res, 2000)); // Test actual deletion lag a bit to see the affect of otimistic delete action taking over UI
  // throw new Error("I FAILED TO DELETE"); // Simulates not going further with the deleting to test optimistic delete and reverting back to oirigin state as data deletion has failed.

  // GUARD CLAUSE - AUTHENTICATION - CHECK TO PROCEED WITH REST OF THE ACTIONS
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // GUARD CLAUSE - AUTHORIZATION - ANY MALICIOUS USER CAN DELETE THE RESERVATIONS NOT BELONGIGN THEM. IN ORDER TO AVOID SUCH SCENARIO, THE BOOKINGID NEEDS TO BE THE RESERVATION OF THE USER AND ONLY THEN IT SHOULD BE DELETED.
  bookingAuthroizationCheck(session, bookingId, "delete");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations"); // Revalidate cache only on this endpoint
}

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
