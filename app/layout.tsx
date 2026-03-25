import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext"; // ← add import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tou FC Anniversary – 10 Years",
  description: "Celebrating 10 years of FC Tou with matches, galas, and community events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>   {/* ← wrap everything with LanguageProvider */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}