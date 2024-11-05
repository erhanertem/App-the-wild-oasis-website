// CREATE ONE ROUTE HANDLER FOR EACH HTTP VERBS

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// Signature for GET in API routes typically is like export async function GET(request, { params }) { ... }
export async function GET(request, { params }) {
  console.log(request);
  console.log(params);
  // Extract the cabinId from PARAMS Object
  const { cabinId } = params;
  // NOTE: Response object is a browser feature but NextJS
  // SEND SOME RESPONSE - @ http://localhost:3000/api/cabins/90
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
// export async function POST() {}
// export async function PATCH() {}
// export async function DELETE() {}

// // EXAMPLE: CONSUMING THE API ROUTES IN A CC
// const fetchCabinData = async (cabinId) => {
//   const response = await fetch(`/api/cabins/${cabinId}`);
//   const data = await response.json();
//   return data;
// };
