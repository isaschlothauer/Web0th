import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fullstack authentication demo",
  description: "React, Express and MySQL?MariaDB authentication app demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} layoutStyle`}>{children}</body>
    </html>
  );
}
