"use client";

import { useFormStatus } from "react-dom";

// NOTE: BY ACCEPTING ISPENDIGN AS ARG, WE EXTEND THE USE OF IT TO WRAPPER COMPONENTS WHERE THEY DO UTILIZE USEFORMSTATUS PRIOR OR IMPLEMENT HERE FOR THE FIRST TIME IF NOT ELSEWHERE.
function SubmitButton({
  children,
  className,
  context,
  isPending,
  isLackingDayPick,
}) {
  //  GET ACCESS TO FORM PENDING STATE
  // IMPORTANT! useFormStatus react hook from 'react-dom' needs to be used inside a component which is part of this form body. So we have created Button hosting this react-dom hook and place it inside our form.
  if (!isPending) {
    const { pending } = useFormStatus();
    isPending = pending;
  }

  let buttonText;
  if (isPending) {
    switch (context) {
      case "update":
        buttonText = "Updating...";
        break;
      case "reserve":
        buttonText = "Reserving...";
        break;
      default:
        throw new Error("Incorrect context input for submit button");
    }
  } else {
    buttonText = children;
  }

  // GUARD CLAUSE - Handle cases where no day is picked
  if (isLackingDayPick) {
    return null; // Do not render anything if `isLackingDayPick` is true
  }

  return (
    <div>
      <button disabled={isPending || isLackingDayPick} className={className}>
        {buttonText}
      </button>
    </div>
  );
}

export default SubmitButton;
