import { Suspense } from "react";

import { getCabin, getCabins } from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

// OVERRIDE METADATA FROM THE ROOTLAYOUT - STATIC
// export const metadata = {
//   title: "Cabin",
// };
// OVERRIDE METADATA FROM THE ROOTLAYOUT - DYNAMIC
export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  // console.log(cabinId);
  const { name } = await getCabin(cabinId);
  // console.log(name);
  return {
    title: `Cabin ${name}`,
  };
}

// ADOPT ISR ON TOP OF SSG
// export const revalidate = 60;
/**
 * In Next.js, the generateStaticParams function is used to specify which dynamic routes should be statically generated at build time when using Static Site Generation (SSG). The idsArr array returned by generateStaticParams is a list of objects, each containing parameters (like cabinId) that Next.js will use to pre-render each page specified by those parameters.
1.	This is especially useful when you have a known set of routes at build time (e.g., specific cabin IDs) and want to generate static pages for each one.
2.	It optimizes performance because the pages are pre-generated and do not require a server request when accessed.
*/
export async function generateStaticParams() {
  // FETCH THE CABINS
  const cabins = await getCabins();
  // console.log(cabins);
  // RETURN AN ARRAY OF cabinId objects w/ stringified params [{cabinId: '88'}, {cabinId: '123'}, ...]
  const idsArr = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  // console.log(idsArr);
  return idsArr;
}

// EACH PAGE UNDER [...] FOLDER, RECEIVES A PARAMS PROP ex: @URL req as cabins/78 for a [cabinId] folder params returns {cabinId=78} object
export default async function Page({ params }) {
  // console.log(params.cabinId);
  const { cabinId } = await params;
  // // ERROR BOUNDARY TESTER
  // const { cabinIds } = await params;
  // // > problem: WATERFALL FETCHES - TAKES SO MUCH TIME TO COMPLETE AS EACH FETCH BLOCKS OTHERS
  // const cabin = await getCabin(cabinId);
  // // FETCH SETTINGS DATA FOR CCs
  // const settings = await getSettings();
  // // FETCH CABIN DATA FOR CCs
  // const bookedDates = await getBookedDatesByCabinId(cabinId);
  // // > ALT#1. PROMSIFY ALL FETCHES - FAST AS FAST AS THE SLOWEST FETCH - NOT PERFECT!
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(cabinId),
  // ]);

  // > ALT#3. ONLY REQUIRED DATA FETCHER IS KEPT. THE REST IS SUB-OUT TO SUB SC.
  const cabin = await getCabin(cabinId);

  const { name } = cabin;

  return (
    <>
      <div className="mx-auto mt-8 max-w-6xl">
        <Cabin cabin={cabin} />
      </div>

      <div>
        <h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>

        {/* USE SUSPENSE MECHANISM TO STOP SC BLOCKING THE ENTIRE PAGE LOADDUE TO ON-GOING FETCHING OPERATIONS INSIDE */}
        <Suspense fallback={<Spinner />}>
          {/* // >#3. CREATE A SUB SC TO HANDLE REST OF FETCHING FOR THE CCs ITS RESPONSIBLE FOR TO MAKE USE OF RPGRESSIVE STREAMING */}
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </>
  );
}
