// MAKE THIS CC AS WE ARE USING CLIENT-SIDE REACT-DAY-PICKER LIBRARY
"use client";

import { useEffect, useState } from "react";
import { useReservation } from "@/app/_components/ReservationContext";
import { isAlreadyBooked } from "@/app/_utility/isAlreadyBooked";
import { differenceInDays } from "@/node_modules/date-fns/differenceInDays";
import { isPast } from "@/node_modules/date-fns/isPast";
import { isSameDay } from "@/node_modules/date-fns/isSameDay";
import { DayPicker } from "react-day-picker";
import "react-day-picker/src/style.css";

function DateSelector({ settings, bookedDates, cabin }) {
  // PROVIDE CONTEXT API SERVED STATE/FUNCTIONS
  const { initialState, range, setRange, setReminderCabin, handleReset } =
    useReservation();

  // GUARD CLAUSE - CHECK FOR RANGE SPAN OVERLAPPING WITH EXISTING BOOKED DATES
  // VERY IMPORTANT! NOTE THAT THIS IS CLIENT-SIDE CHECK, MEANING, ANY MALICIOUS ACTOR CAN EASILY HACK INTO CREATING AN OVERLLAPING DATE RESERVATION BY PLAYING AROUND WITH THE DISABLED PROPETY OF THE DAYPICKER COMPONENT - MEANING A SERVER-SIDE DATE OVERLLAPING CHECK HAS TO BE ALSO IMPLEMENTED BEFORE PROCEEDING WITH ANY MUTATION TO DB.
  // // > TEST: SIMULATE MALICIOUS ACTOR ATTEMPT
  // const displayRange = range;
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  // CHANGE - DATA NEEDS OT BE FETCHED FROM CABIN DATA
  // console.log(cabin);
  // console.log(bookedDates);
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from) + 1; // Be able to select a single night not a range of nights
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  // WRITE OFF CABIN DATA TO CONTEXT FOR CABIN REMINDER BORROW
  setReminderCabin(cabin);

  function handleSelect(selectedRange) {
    setRange((prevs) => ({ ...prevs, ...selectedRange }));
  }

  const [clickCount, setClickCount] = useState(1);

  // RESET SELECTION UPON DOUBLE CLICK ON THE SAME DATE
  useEffect(() => {
    console.log(initialState);
    // console.log(clickCount);
    if (
      range.to !== undefined &&
      range.from !== undefined &&
      String(range.from) === String(range.to) &&
      clickCount === 0
    ) {
      // IF SAME DATE CLICKED TWICE RESET SELECTION
      setRange(initialState);
    } else {
      // SET CLICK COUNT
      setClickCount((clickCount) => (clickCount + 1) % 2);
    }
  }, [range]);

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

        {range.to !== undefined && range.from !== undefined ? (
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
