// MAKE THIS CC AS WE WANT OT BRING IN DATA FROM A SIBLING CC
"use client";

import { useReservation } from "@/app/_components/ReservationContext";
import { createReservation } from "@/app/_lib/server-actions";
import { capitalize } from "@/app/_utility/capitalize";
import { differenceInDays } from "@/node_modules/date-fns/differenceInDays";

function ReservationForm({ cabin, user }) {
  // PROVIDE CONTEXT API SERVED STATE/FUNCTIONS
  const { range } = useReservation();

  // CHANGE - DATA NEEDS OT BE FETCHED FROM CABIN DATA
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate) + 1; // Be able to select one night
  const cabinPrice = numNights * (regularPrice - discount);

  // DATA THAT NEEDS TO BE PASSED TO SERVER ACTION ALONG WITH FORMDATA INPUTS
  /**
   * FIRST METHOD: CREATE HIDDEN FIELDS TO SUBMIT AS FORMDATA
   * SECOND METHOD: BIND THIS DATA TO SERVER ACTION FUNCTION
   */
  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };
  const createReservationWithBookingData = createReservation.bind(
    null,
    bookingData,
    range, // Data for checking server-side overllaping reservation re-validation
  );

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <img
            referrerPolicy="no-referrer" // Important to display google profile images
            className="h-8 rounded-full"
            src={user.image}
            alt={capitalize(user.name)}
          />
          <p>{capitalize(user.name)}</p>
        </div>
      </div>

      <form
        // action={createReservation} //Server-action for creating a reservation
        action={createReservationWithBookingData} //Server-action for creating a reservation with additional data passed onto this function
        className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <p className="text-base text-primary-300">Start by selecting dates</p>

          <button className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
