import DateSelector from "@/app/_components/DateSelector";
import LoginMessage from "@/app/_components/LoginMessage";
import ReservationForm from "@/app/_components/ReservationForm";
import { auth } from "@/app/_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";

// CHILD SERVER COMPONENT
async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    // FETCH SETTINGS DATA FOR CC
    getSettings(),
    // FETCH CABIN BOOKING DATA FOR CC
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      {/* CLIENT COMPONENT - REQUIRES CABIN DATA + SETTINGS DATA */}
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {/* CLIENT COMPONENT - REQUIRES CABIN DATA & SESSION USER */}
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
