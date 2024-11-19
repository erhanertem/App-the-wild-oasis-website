"use client";

import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { updateProfile } from "@/app/_lib/server-actions";
import { userFormSchema } from "@/app/_lib/zod-schema";
import SelectCountry from "@/app/_components/SelectCountry";
import SubmitButton from "@/app/_components/SubmitButton";

// CLIENT COMPONENT BECAUSE IT WILL BE USED TO MUTATE SERVER-SIDE DATA PER CLIENT'S INPUT
function UpdateProfileForm({ guest, countries }) {
  // REACT SETUP FOR CONFORM SERVER ACTION
  /**
   * SADLY SINCE THIS PROJECT IS BASED ON NEXTJS 14, THEREFORE WE CAN'T USE
   * import { useActionState } from 'react';
   * import { SubmitButton } from '@/app/_components/SubmitButton';
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
   * FROM 'REACT 19' WHICH ONLY AVAILABLE TO NEXTJS 15 SETUPS
   */
  const [lastResult, action] = useFormState(updateProfile, undefined);
  // CLIENT-SIDE CONFIRM SETUP
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,
    // Reuse the validation logic on the client - SAME AS SERVER SIDE VALIDATION
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: userFormSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      // COMBINE
      id={form.id} // Conform form id
      onSubmit={form.onSubmit} // Execute conform form
      action={action} // Define server action
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
      <FormContent guest={guest} fields={fields} countries={countries} />
    </form>
  );
}

function FormContent({ guest, countries, fields }) {
  const { fullName, email, nationalID, nationality, countryFlag } = guest;

  //  GET ACCESS TO FORM PENDING STATE
  // IMPORTANT! useFormStatus react hook from 'react-dom' needs to be used inside a component which is part of this form body. So we have created Button hosting this react-dom hook and place it inside our form.
  const { pending } = useFormStatus();

  return (
    <>
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>
      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="relative aspect-video min-w-8">
            <Image
              src={countryFlag}
              fill
              className="h-5 rounded-sm object-cover"
              alt="Country flag"
            />
          </div>
        </div>
        <SelectCountry guest={guest} countries={countries} pending={pending} />
      </div>
      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name={fields.nationalID.name}
          defaultValue={nationalID}
          disabled={pending}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        />
        <p className="text-sm text-red-500">
          {fields.nationalID.errors ? (
            fields.nationalID.errors
          ) : (
            <span>&nbsp;</span>
          )}
        </p>
      </div>
      <div className="flex items-center justify-end gap-6">
        <SubmitButton
          className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          context="update"
          isPending={pending}
        >
          Update profile
        </SubmitButton>
      </div>
    </>
  );
}

export default UpdateProfileForm;
