import Navigation from "./components/Navigation";

export const metadata = {
  title: "The Wild Oasis - Luxury Cabins in Paradise",
  description: "Discover luxury cabins in our beautiful and serene paradise.",
  keywords: "luxury cabins, paradise, vacation rentals, travel",
  author: "Erhan Ertem",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Navigation />
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
