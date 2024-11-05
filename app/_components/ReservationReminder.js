// USING CONTEXT API REACT HOOK REQUIRES CC
"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

import { useReservation } from "@/app/_components/ReservationContext";
import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import { usePathname } from "@/node_modules/next/navigation";

// > REMINDER ALTERNATIVE #1
// function ReservationReminder() {
//   // PROVIDE CONTEXT API SERVED STATE/FUNCTIONS
//   const { range, resetRange } = useReservation();
//   // GUARD CLAUSE - IF CONTEXT API HASN'T GOT ANY RESERVATION MARKED UP EARLY RETURN
//   if (!range.from || !range.to) return null;

//   return (
//     <div className="text fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-8 rounded-full bg-accent-500 px-8 py-5 font-semibold text-primary-800 shadow-xl shadow-slate-900">
//       <p>
//         <span>👋</span> Don'f forget to reserve your dates <br /> from{" "}
//         {format(new Date(range.from), "MMM dd yyyy")} to{" "}
//         {format(new Date(range.to), "MMM dd yyyy")}
//       </p>
//       <button
//         className="rounded-full p-1 transition-all hover:bg-accent-600"
//         onClick={resetRange}
//       >
//         <XMarkIcon className="h-5 w-5" />
//       </button>
//     </div>
//   );
// }

// export default ReservationReminder;

// > REMINDER ALTERNATIVE #2
function ReservationReminder() {
  // PROVIDE CONTEXT API SERVED STATE/FUNCTIONS
  const { range, reminderCabin, handleReset } = useReservation();
  // console.log(reminderCabin, "♾️", range);

  // GUARD CLAUSE - If no cabin reservation interraction observed or any of range keys missing input return early
  if (reminderCabin === null || !range.to || !range.from) return null;

  const { id, name, regularPrice, discount, image } = reminderCabin;

  const reservationPrice = regularPrice - discount;

  return (
    <div className="w-30 fixed right-4 top-16 z-50 flex flex-row gap-2 rounded-md border border-transparent bg-primary-800 bg-opacity-95 px-4 py-3 hover:border hover:border-primary-700">
      <button
        className="self-start rounded-full p-1 transition-all hover:bg-accent-600"
        onClick={handleReset}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
      <Link href={`/cabins/${id}`} className="">
        <div className="flex flex-col">
          <p className="text-sm font-bold text-primary-200">
            Finish your booking!
          </p>
          <div className="space-x-15 flex gap-6">
            <div>
              <p className="text-xs font-normal text-primary-200">
                Cabin {name} for
              </p>
              <p className="text-2xl text-primary-50">${reservationPrice}</p>
            </div>
            <div className="mb-3 mt-1 flex-1">
              <Image
                width={80}
                height={80}
                src={image}
                alt="cabin image"
                quality={20}
              />
            </div>
          </div>
          <div>
            <p className="text-xs text-primary-200">
              from {format(new Date(range.from), "MMM dd yyyy")} to{" "}
              {format(new Date(range.to), "MMM dd yyyy")}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default ReservationReminder;
