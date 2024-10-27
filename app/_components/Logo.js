import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      {/* INLINE IMAGE REFERENCING */}
      {/* src attr uses anything from public folder just like vite */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      {/* EXTERNAL IMAGE REFERENCING */}
      <Image
        src={logo}
        quality={100} // This attr defines the quality of image. The lesser quality the more image degradation
        height="60"
        width="60"
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
