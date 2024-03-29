import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StylesProvider } from "./setDarkMode";

export interface PageProps {
  pageProps: string;
}

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
      <body className={`${montserrat.className} antialised fw-semibold`}>
        <StylesProvider>{children}</StylesProvider>
      </body>
    </html>
  );
}
