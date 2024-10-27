import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

// IMPORT TAILWIND CSS
import "@/app/_styles/globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-primary-950 text-primary-100">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
