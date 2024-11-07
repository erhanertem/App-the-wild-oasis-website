import { auth } from "@/app/_lib/auth";
import { onlyFirstName } from "@/app/_utility/capitalize";

// OVERRIDE METADATA FROM THE ROOTLAYOUT
export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  // console.log(session);

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Welcome, {onlyFirstName(session.user.name)}
      </h2>
    </div>
  );
}
