import { getCabin } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

// PLACEHOLDER DATA
const cabin = {
  id: 89,
  name: "001",
  maxCapacity: 2,
  regularPrice: 250,
  discount: 0,
  description:
    "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  image:
    "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
};

// EACH PAGE UNDER [...] FOLDER, RECEIVES A PARAMS PROP ex: @URL req as cabins/78 for a [cabinId] folder params returns {cabinId=78} object
export default async function Page({ params }) {
  // console.log(params.cabinId);
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <div className="mb-24 grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 px-10 py-3">
        <div className="relative -translate-x-3 scale-[1.15]">
          <Image
            src={image}
            className="object-cover"
            fill
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3 className="mb-5 w-[150%] translate-x-[-254px] bg-primary-950 p-6 pb-1 text-7xl font-black text-accent-100">
            Cabin {name}
          </h3>

          <p className="mb-10 text-lg text-primary-300">{description}</p>

          <ul className="mb-7 flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-center text-5xl font-semibold">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
