import Link from "next/link";
import Navigation from "./components/Navigation";

function Page() {
  return (
    <div>
      <Navigation />
      <h1>The Wild Oasis. Welcome to paradise.</h1>
      <Link href='/cabins'>Explore luxury cabins</Link>
    </div>
  );
}

export default Page;
