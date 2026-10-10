import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { church } from "./content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${church.name} | Worship, Prayer & Community`,
  description: church.description,
  metadataBase: new URL(church.siteUrl),
  openGraph: {
    title: church.name,
    description: church.description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
