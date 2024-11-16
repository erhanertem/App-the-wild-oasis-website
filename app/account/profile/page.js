import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import { getCountries } from "@/app/_lib/data-service";

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

  const countries = await getCountries();

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
      <UpdateProfileForm guest={guest} countries={countries} />
    </div>
  );
}
