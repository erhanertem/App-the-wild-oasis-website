import { auth } from "@/app/_lib/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Navigation() {
  // Get the current login session
  const currentSession = await auth();
  console.log(currentSession);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className="transition-colors hover:text-accent-400"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors hover:text-accent-400"
          >
            About
          </Link>
        </li>
        <li>
          {currentSession?.user?.image ? (
            <Link
              href="/account"
              className="flex items-center gap-3 transition-colors hover:text-accent-400"
            >
              <div className="relative aspect-square h-10">
                <Image
                  fill
                  quality={20}
                  className="rounded-full object-cover"
                  src={currentSession.user.image}
                  alt={currentSession.user.name}
                  referrerPolicy="no-referrer"
                  // By using referrerPolicy="no-referrer", you're ensuring that no referrer information is sent when loading currentSession.user.image. This can be useful if the image is from a third-party source and you don’t want to expose your page’s URL, for privacy reasons or to prevent potential tracking.
                />
              </div>
              <span>
                {currentSession.user.name
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="transition-colors hover:text-accent-400"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
