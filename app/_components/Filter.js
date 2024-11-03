"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams(); // Reads current search parameters from the URL (such as query strings after ?).
  const router = useRouter(); // Allows programmatic navigation within the app. Provides methods like replace for navigation.
  const pathname = usePathname(); // Retrieves the current path (without query params).

  function handleFilter(filter) {
    // -> #1.BUILD A COPY OF THE CURRENT URL USING NATIVE WEB API - Enables manuplating complex query params URLs
    const params = new URLSearchParams(searchParams); // URLSearchParams creates a mutable version of the current search parameters. This lets you modify query strings and convert them back to a URL string.
    // -> #2.UPDATE CAPACITY SEARCH PARAMS W/ FILTER PROP VALUE
    params.set("capacity", filter);
    // -> #3.IMPERATIVE NAVIGATION BY UPDATING THE URL: CORE URL ADDRESS BEFORE QUERIES+UPDATED SEARCH PARAMS STRING
    // This updates the URL to include the modified search parameters. router.replace changes the URL without reloading the page, keeping the current scroll position intact (scroll: false) so that when page changes it won't scroll up.
    router.replace(`${pathname}?${String(params)}`, { scroll: false });
  }

  return (
    <div className="flex border border-primary-800">
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("all")}
      >
        All cabins
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 guests
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("medium")}
      >
        4&mdash;7 guests
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("large")}
      >
        8&mdash;12 guests
      </button>
    </div>
  );
}

export default Filter;
