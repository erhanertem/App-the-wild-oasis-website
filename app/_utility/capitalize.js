export function capitalize(str) {
  // GUARD CLAUSE
  if (typeof str !== "string") return "";

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function onlyFirstName(str) {
  // GUARD CLAUSE
  if (typeof str !== "string") return "";
  const firstName = str.toLowerCase().split(" ").at(0);
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}
