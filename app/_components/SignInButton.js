import Image from "next/image";
import { signInAction } from "@/app/_lib/server-actions";

// IMPORTANT! THIS IS A SC. MEANING WE CANT HAVE INTERRACTIVITY SUCH AS ONCLICK FOR BUTTON TO CALL A SIGNIN/SIGNOUT FNs BUT WE HAVE SERVER ACTIONS TO ADD INTERACTIVITY FOR SCs
function SignInButton() {
  return (
    /* WE CAN'T USE ONCLICK IN SCs SO WE NEED TO CREATE A  SERVER ACTION VIA FORM ELEMENT WHICH WAS ESSENTIAL NON-EXISTING - JUST A WRAPPER AROUND BUTTON ELEMENT TO INSTIGATE SIME ACTION */
    <form action={signInAction}>
      <button className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
