"use client";

import { useOptimistic } from "react";

import ReservationCard from "@/app/_components/ReservationCard";
import { deleteReservation } from "@/app/_lib/server-actions";

function ReservationList({ bookings }) {
  const [
    optimisticBookings, // optimisticState
    optimisticDelete, // applyOptimisticUpdate
  ] = useOptimistic(
    bookings, // initialState
    (
      curBookings, // current state - bookings
      bookingId, // data subject to mutation
    ) => {
      return curBookings.filter((booking) => booking.id !== bookingId); // Remove the item from the initial state and this is the expected optimistic state data
    }, // updateFunction that calculates the expected state - If the async mutation fails then optimistic rolls back to initial state
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId); // apply optimistic update
    await deleteReservation(bookingId); // actual data mutator
  }

  return (
    <ul className="space-y-6">
      {/* {bookings.map((booking) => ( */}
      {/* In optimistic updates bookings gets replaces with optimisticBookings state since initial optimistic bookings state is assigned 'bookings' */}
      {optimisticBookings.map((booking) => (
        <ReservationCard
          key={booking.id}
          booking={booking}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
