"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  // CONTEXT STATES & FUNCTIONS
  const [range, setRange] = useState(initialState);
  const [reminderCabin, setReminderCabin] = useState(null);

  useEffect(() => {
    console.log(range);
  }, [range]);

  function handleReset() {
    setRange(initialState);
    setReminderCabin(null);
  }

  return (
    <ReservationContext.Provider
      value={{
        // SHARED CONTEXT STATES & FUNCTIONS
        range,
        setRange,
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
