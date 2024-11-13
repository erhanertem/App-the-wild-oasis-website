import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

// OVERRIDE METADATA FROM THE ROOTLAYOUT
export const metadata = {
  title: "Update profile",
};

// SERVER COMPONENT
export default async function Page() {
  // READ SESSION DATA
  const session = await auth();
  // console.log(session);
  // GET DETAILS OF THE USER FROM DB BASED ON SESSION USER
  const guest = await getGuest(session.user.email);
  // console.log(guest);
  const { nationality } = guest;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400">
        Update your guest profile
      </h2>

      <p className="mb-8 text-lg text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      {/* CLIENT COMPONENT */}
      <UpdateProfileForm guest={guest}>
        {/* SERVER COMPONENT */}
        <SelectCountry
          name="nationality"
          id="nationality"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
