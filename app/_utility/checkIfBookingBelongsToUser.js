import { getBookings } from "@/app/_lib/data-service";

export async function bookingAuthroizationCheck(session, bookingId, context) {
  const guestBookings = await getBookings(session.user.guestId);
  const bookingIdsBelongingToUser = guestBookings.map((booking) => booking.id);
  if (!bookingIdsBelongingToUser.includes(bookingId))
    throw new Error(`You are not allowed to ${context} this booking`);
}
