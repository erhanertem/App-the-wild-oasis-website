import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
// console.log(josefin); // Look out for log @ server side and note that the josefin object is comprised of { className, fontFamily, fontStyle }
// IMPORT TAILWIND CSS
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "@/app/_components/ReservationContext";

export const metadata = {
  // title: "The Wild Oasis - Luxury Cabins in Paradise",
  title: {
    template: "%s | The Wild Oasis", //Prints the other routes with their title name (%s) + this content
    default: "Welcome | The Wild Oasis - Luxury Cabins in Paradise",
  },
  description: "Discover luxury cabins in our beautiful and serene paradise.",
  keywords: "luxury cabins, paradise, vacation rentals, travel",
  author: "Erhan Ertem",
};

// // COMPLETED AUTOMATICALLY AND NOT NEEDED
// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
// };

// PARENTING SC
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} relative flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
      >
        <Header />

        <div className="grid flex-1 px-8 py-12">
          <main className="mx-auto w-full">
            {/* CC CONTEXT API */}
            <ReservationProvider>
              {/* CCs & SCs - SCs are kept intact */}
              {children}
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
