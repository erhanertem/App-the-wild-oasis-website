"use client";

import { useActionState, cloneElement, useEffect } from "react";
import Image from "next/image";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { updateProfile } from "@/app/_lib/server-actions";
import { userFormSchema } from "@/app/_lib/zod-schema";

// CLIENT COMPONENT BECAUSE IT WILL BE USED TO MUTATE SERVER-SIDE DATA PER CLIENT'S INPUT
function UpdateProfileForm({ children, guest }) {
  const { fullName, email, nationalID, nationality, countryFlag } = guest;

  // REACT SETUP FOR CONFORM SERVER ACTION
  const [error, action, isPending] = useActionState(updateProfile, null);
  // CLIENT-SIDE CONFIRM SETUP
  const [form, fields] = useForm({
    // LAST STATUS
    error,
    // CLIENT-SIDE VALIDATION - SAME AS SERVER SIDE VALIDATION
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: userFormSchema });
    },
    shouldValidate: "onBlur", // Leaving typein field triggers validation
    shouldRevalidate: "onInput", // Typing into field, triggers revalidation
  });

  return (
    <form
      // COMBINE
      id={form.id} // Conform form id
      onSubmit={form.onSubmit} // Execiye conform form
      action={action} // Define server action
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
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
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name={fields.nationalID.name}
          defaultValue={nationalID}
          disabled={isPending}
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
        {error && (
          <p className="mr-auto text-sm text-red-500">
            {error ? error : <span>&nbsp;</span>}
          </p>
        )}
        <button
          disabled={isPending}
          className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        >
          {isPending ? "Updating..." : "Update profile"}
        </button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
