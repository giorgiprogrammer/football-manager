import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// this should be changed when the app is ready to be deployed
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Football Manager",
  description:
    "Football Manager - The best football manager game in the world! created by a Tsotne Darjania",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
