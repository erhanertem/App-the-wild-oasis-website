import { signOutAction } from "@/app/_lib/actions";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

// THIS IS A CC
function SignOutButton() {
  return (
    // USE EITHER A SERVER ACTIONS WHICH IS AVAILABLE TO CCs AND SCs
    <form action={signOutAction}>
      <button
        // onClick={() => signOut({ callbackUrl: "/" })}
        className="flex w-full items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
