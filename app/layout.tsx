import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Prueba grupo delsud",
  description: "prueba tecnica para grupo delsud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialised`}>{children}</body>
    </html>
  );
}
