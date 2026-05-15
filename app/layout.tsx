import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";

const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Rahul Kampati — Data Engineer",
  description: "Data Engineer · ETL · AWS · Snowflake. Six years building the invisible plumbing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${body.variable} ${display.variable} ${mono.variable}`}>
      <body className="grain bg-ink text-white selection:bg-primary">
        <MouseGlow />
        <Header />
        <main className="relative min-h-screen z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
