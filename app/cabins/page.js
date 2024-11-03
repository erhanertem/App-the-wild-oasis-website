import { Suspense } from "react";

import CabinList from "@/app/_components/CabinList";
import Filter from "@/app/_components/Filter";
import Spinner from "@/app/_components/Spinner";

// // > ROUTE LEVEL REVALIDATION
// // // ENFORCE DR
// // export const revalidate = 0;
// // // ENFORCE SSG+ISR
// export const revalidate = 15;

// OVERRIDE METADATA FROM THE ROOTLAYOUT
export const metadata = {
  title: "Cabins",
};

// NOTE: HAVING SEARCHPARAMS PROP OVERRIDES EXPLICIT REVALIDATION AS THE COMPONENT IS FULLY DYNAMICALLY RENDERED SC
export default async function Page({ searchParams }) {
  //  PAGE.JS PICKS UP THE SEARFCH PARAMS VALUE CHANGED BY FILTER CC COMPONENT
  const data = await searchParams;
  // console.log(data);
  // DESIGNATE A DEFAULT FALLBACK PARAM VALUE IF NONE PROVIDED
  const filter = data.capacity ?? "all";
  // console.log(filter);

  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      {/* CLIENT COMPONENT */}
      <div className="mb-8 flex justify-end">
        {/* MODIFIES SEARCH PARAMS VALUE @ URL */}
        <Filter />
      </div>

      {/* SUSPENSE APPLIED CODE */}
      <Suspense fallback={<Spinner />} key={filter}>
        {/* NOTE: key prop @ suspense allow us to show the Spinner fallback eachtime we load the cabinlist based on a new filter value. Otherwise, Suspense cant differentiate Suspenses and only one the loader will be displayed and later won't come out */}
        {/* FOR SUSPENSE WE MOVED ALL THE FETCHING DATA BUSINESS INTO ITS OWN COMPONENT WHERE THE CONTENT SUBJECT TO SUSPENSE IS CONTAINED */}
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
