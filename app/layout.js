import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "True Cost of Hire | Ivory Hill Wealth Management",
  description:
    "Calculate the all-in employer cost of a new hire — federal & state taxes, benefits, 401(k), workers' comp, and overhead. A tool by Ivory Hill Wealth Management.",
  openGraph: {
    title: "True Cost of Hire | Ivory Hill Wealth Management",
    description:
      "Know the real number before you hire. State-specific taxes, benefits, and an affordability test built for business owners.",
    url: "https://ivoryhill.com",
    siteName: "Ivory Hill Wealth Management",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>{children}</body>
    </html>
  );
}
