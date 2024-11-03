import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";
// import { unstable_noStore as noStore } from "next/cache";

export default async function CabinList({ filter }) {
  // COMPONENT LEVEL REVALIDATION
  // ENFORCE DR
  // noStore();

  // CHECK IF THERE IS NONE TO SHOW FOR EARLY RETURN
  const cabins = await getCabins();
  // GUARD CLAUSE
  if (!cabins.length) return null;

  // RECALC CABINS BASED ON URL FILTER SEARCHPARAMS
  let displayedCabins;
  switch (filter) {
    case "all":
      displayedCabins = cabins;
      break;
    case "small":
      displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
      break;
    case "medium":
      displayedCabins = cabins.filter(
        (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity < 8,
      );
      break;
    case "large":
      displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
      break;
    default:
      displayedCabins = cabins; // Fallback in case of an unknown filter
      break;
  }
  // if (filter === "all") displayedCabins = cabins;
  // if (filter === "small")
  //   displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  // if (filter === "medium")
  //   displayedCabins = cabins.filter(
  //     (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity < 8,
  //   );
  // if (filter === "large")
  //   displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
