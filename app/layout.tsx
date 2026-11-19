import type { Metadata } from "next";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "./globals.css";
import "./header-hero.css";
import ScrollToTop from "./components/scroll-to-top";

export const metadata: Metadata = {
  title: "Lemar Accountants | Chartered Certified Accountants",
  description: "Professional accountancy, tax and business advisory services across Northolt and the wider UK.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<ScrollToTop /></body>
    </html>
  );
}
