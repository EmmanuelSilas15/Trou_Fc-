"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const links = [
    { href: "/", label: "home" },
    { href: "/schedule", label: "schedule" },
    { href: "/gallery", label: "gallery" },
    { href: "/reservation", label: "rsvp" },
  ];

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:justify-center">
          {/* Logo */}
          <div className="flex-shrink-0 md:absolute md:left-4">
            <Link href="/" className="block">
              <Image
                src="/Tou_fc_logo.jpeg"
                alt="FC Tou Logo"
                width={40}
                height={40}
                className="h-auto w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-20">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-lg font-bold transition-colors ${
                    pathname === link.href
                      ? "bg-gray-800 text-yellow-400"
                      : "hover:bg-gray-800 hover:text-yellow-400"
                  }`}
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Switcher */}
          <div className="hidden md:block md:absolute md:right-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="px-3 py-2 rounded-md text-lg font-bold bg-gray-800 hover:bg-yellow-300 transition"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-lg font-bold ${
                    pathname === link.href
                      ? "bg-gray-800 text-yellow-400"
                      : "hover:bg-gray-800 hover:text-yellow-400"
                  }`}
                >
                  {t(link.label)}
                </Link>
              ))}
              {/* Mobile language switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                className="block w-full text-left px-3 py-2 rounded-md text-lg font-bold hover:bg-yellow-300"
              >
                {language === 'en' ? 'Français' : 'English'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}