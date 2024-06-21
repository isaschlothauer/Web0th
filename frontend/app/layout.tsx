import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Head from "next/head";

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
      <Head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`${manrope.className} layoutStyle`}>{children}</body>
    </html>
  );
}
