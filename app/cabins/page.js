import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

// OVERRIDE METADATA FROM THE ROOTLAYOUT
export const metadata = {
  title: "Cabins",
};

export default async function Page() {
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

      {/* SUSPENSE APPLIED CODE */}
      <Suspense fallback={<Spinner />}>
        {/* FOR SUSPENSE WE MOVED ALL THE FETCHING DATA BUSINESS INTO ITS OWN COMPONENT WHERE THE CONTENT SUBJECT TO SUSPENSE IS CONTAINED */}
        <CabinList />
      </Suspense>
      {/* PRE-SUSPENSE CODE */}
      {/* {cabins.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )} */}
    </div>
  );
}
