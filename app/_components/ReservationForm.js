// MAKE THIS CC AS WE WANT OT BRING IN DATA FROM A SIBLING CC
"use client";

import { formatISO, isValid } from "date-fns";
import { useReservation } from "@/app/_components/ReservationContext";
import { createReservation } from "@/app/_lib/server-actions";
import { capitalize } from "@/app/_utility/capitalize";
import { differenceInDays } from "@/node_modules/date-fns/differenceInDays";
import SubmitButton from "@/app/_components/SubmitButton";

function ReservationForm({ cabin, user }) {
  // PROVIDE CONTEXT API SERVED STATE/FUNCTIONS
  const { range } = useReservation();

  // CHANGE - DATA NEEDS OT BE FETCHED FROM CABIN DATA
  const { maxCapacity, regularPrice, discount, id } = cabin;

  // > OPTION#1 - EITHER CHANGE THESE TO ISO DATES BEFORE SUBMITTING TO DB OR ...
  const isValidStartDate = range.from && isValid(new Date(range.from));
  const isValidEndDate = range.to && isValid(new Date(range.to));
  const startDate = isValidStartDate
    ? formatISO(new Date(range.from), { representation: "date" })
    : null;
  const endDate = isValidEndDate
    ? formatISO(new Date(range.to), { representation: "date" })
    : null;
  // // > OPTION#2 - CONVERT LOCALHOURS TO UTC WITHOUT LIBRARY
  // function setLocalHoursToUTCOffset(date) {
  //   const offset = new Date().getTimezoneOffset();
  //   const hours = Math.floor(Math.abs(offset) / 60);
  //   const minutes = Math.abs(offset) % 60;
  //   date?.setHours(hours, minutes);
  //   return date;
  // }
  // const [startDate, endDate] = [
  //   setLocalHoursToUTCOffset(range.from),
  //   setLocalHoursToUTCOffset(range.to),
  // ];

  const numNights = differenceInDays(endDate, startDate) + 1; // Be able to select one night
  const cabinPrice = numNights * (regularPrice - discount);

  // DATA THAT NEEDS TO BE PASSED TO SERVER ACTION ALONG WITH FORMDATA INPUTS
  /**
   * FIRST METHOD: CREATE HIDDEN FIELDS TO SUBMIT AS FORMDATA
   * SECOND METHOD: BIND THIS DATA TO SERVER ACTION FUNCTION
   * THIRD METHOD: INSTEAD OF BINDING PROVIDE ADDITIONAL DATA RIGHT WHERE ACTION FUCNTION IS CALLED
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
        // 3RD OPTION OF PASSING MULTI ARGS TO A FORMDATA
        // action={(formData) => createReservation(bookingData, range, formData)}
        // 2ND OPTION OF PASSING MULTI ARGS TO A FORMDATA
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
          <p className="text-base text-primary-300">
            {!startDate && !endDate
              ? "Start by selecting dates"
              : startDate === endDate
                ? `Only for ${new Intl.DateTimeFormat(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(startDate))}`
                : `${new Intl.DateTimeFormat(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(startDate))} to ${new Intl.DateTimeFormat(
                    undefined,
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  ).format(new Date(endDate))}`}
          </p>

          <SubmitButton
            className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
            context="reserve"
          >
            Reserve now
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
