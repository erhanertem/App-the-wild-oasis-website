import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";

// CHILD SERVER COMPONENT
async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    // FETCH SETTINGS DATA FOR CC
    getSettings(),
    // FETCH CABIN BOOKING DATA FOR CC
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      {/* CLIENT COMPONENT - REQUIRES CABIN DATA + SETTINGS DATA */}
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {/* CLIENT COMPONENT - REQUIRES CABIN DATA */}
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
