"use client";

import { useForm } from "react-hook-form";

import Image from "next/image";

import { updateProfile } from "@/app/_lib/server-actions";

// CLIENT COMPONENT BECAUSE IT WILL BE USED TO MUTATE SERVER-SIDE DATA PER CLIENT'S INPUT
function UpdateProfileForm({ children, guest }) {
  const { fullName, email, nationalID, nationality, countryFlag } = guest;

  const {
    register, // Register form field values
    handleSubmit, // Dial in actual form submission cb fn
    reset, // Resets the form fields
    formState: { errors }, // Gets the errors from onErrorFn handler out of RHF to be used in practical UI error handling mediums such as toaster
  } = useForm();

  // FORM SUBMISSION CB FN CALLING SERVER-ACTION MUTATION FN
  const onSubmit = async (e) => {
    const formData = new FormData(e.target);
    console.log("💊", Object.fromEntries(formData));
    await updateProfile(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // SERVER ACTION TO MUTATE DATA ON SERVER-SIDE
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
          {...register("nationalID", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9]{6,12}$/,
              message: "Please provide a valid national ID",
            },
          })}
          defaultValue={nationalID}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        />
        {errors?.nationalID?.message && (
          <span className="text-red-500">{errors.nationalID.message}</span>
        )}
      </div>

      <div className="flex items-center justify-end gap-6">
        <button className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
          Update profile
        </button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
