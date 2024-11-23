"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  // CONTEXT STATES & FUNCTIONS
  const [range, setRange] = useState(initialState);
  const [displayRange, setDisplayRange] = useState(null);
  const [reminderCabin, setReminderCabin] = useState(null);

  // // RANGE LOGGER FOR DEVELOPEMENT
  // useEffect(() => {
  //   console.log(range);
  // }, [range]);

  function handleReset(callback) {
    setRange(initialState);
    setReminderCabin(null);

    if (typeof callback === "function") {
      callback(); // Invoke the callback if provided
    }
  }

  return (
    <ReservationContext.Provider
      value={{
        // SHARED CONTEXT STATES & FUNCTIONS
        initialState,
        range,
        setRange,
        displayRange,
        setDisplayRange,
        reminderCabin,
        setReminderCabin,
        handleReset,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  // GUARD CLAUSE
  if (context === undefined)
    throw new Error(
      "ReservationContext was used outside of the ReservationProvider",
    );

  return context;
}

export { ReservationProvider, useReservation };
