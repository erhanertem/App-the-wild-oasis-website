import Link from "next/link";

// OVERRIDE METADATA FROM THE ROOTLAYOUT
export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">This cabin can not be found :(</h1>
      <Link
        href="/cabins"
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
      >
        Back to all cabins
      </Link>
    </main>
  );
}
