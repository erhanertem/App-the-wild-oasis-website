"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams(); // Reads current search parameters from the URL (such as query strings after ?).
  const router = useRouter(); // Allows programmatic navigation within the app. Provides methods like replace for navigation.
  const pathname = usePathname(); // Retrieves the current path (without query params).

  // -> #4. READ CURRENT ACTIVE FILTER FROM SEARCH PARAMS
  const activeFilter = searchParams.get("capacity") ?? "all";

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
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 ${filter !== activeFilter ? "hover:bg-accent-600" : "bg-primary-700"} ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
