"use client";

export default function SelectCountry({ countries, guest, pending }) {
  const { nationality: defaultCountry, countryFlag: flag } = guest;
  const defaultValue = `${defaultCountry}%${flag}`;

  return (
    <select
      name="nationality"
      id="nationality"
      className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={defaultValue}
      disabled={pending} // Disable dropdown if form is pending
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
