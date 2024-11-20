// MAKE THIS CC AS WE ARE USING CLIENT-SIDE REACT-DAY-PICKER LIBRARY
"use client";

import { useReservation } from "@/app/_components/ReservationContext";
import { differenceInDays } from "@/node_modules/date-fns/differenceInDays";
import { isPast } from "@/node_modules/date-fns/isPast";
import { isSameDay } from "@/node_modules/date-fns/isSameDay";
import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/src/style.css";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  // PROVIDE CONTEXT API SERVED STATE/FUNCTIONS
  const { range, setRange, setReminderCabin, handleReset } = useReservation();

  // GUARD CLAUSE - CHECK FOR RANGE SPAN OVERLAPPING WITH EXISTING BOOKED DATES
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  // CHANGE - DATA NEEDS OT BE FETCHED FROM CABIN DATA
  // console.log(cabin);
  console.log(bookedDates);
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from) + 1;
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  // WRITE OFF CABIN DATA TO CONTEXT FOR CABIN REMINDER BORROW
  setReminderCabin(cabin);

  function handleSelect(selectedRange) {
    setRange((prevs) => ({ ...prevs, ...selectedRange }));
  }

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-12"
        mode="range"
        min={minBookingLength - 1}
        max={maxBookingLength}
        onSelect={handleSelect} // Write the state if selected a date
        selected={displayRange} // Read the state
        // // OLD API
        // fromMonth={new Date()}
        // fromDate={new Date()}
        // toYear={new Date().getFullYear() + 5}
        // BASED ON NEW API
        startMonth={new Date()}
        startDate={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)} // December of the year 5 years from now
        captionLayout="dropdown"
        numberOfMonths={2} // Show only 2 months
        disabled={
          (curDate) =>
            isPast(curDate) || // Disable dates in the past and current day for booking
            bookedDates.some((date) => isSameDay(date, curDate)) // disable upcoming dates
        }
      />

      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={handleReset}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
