"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#techstack" },
    { name: "Works", href: "#works" },
    { name: "Contact", href: "/contact" },
  ];

  const contactItem = navItems.find((item) => item.name === "Contact");
  const otherItems = navItems.filter((item) => item.name !== "Contact");

  return (
    <header
      className={` top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#f8f7f3]${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="header-content max-w-full mx-auto px-14 py-4 bg-transparent">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex space-x-1">
              <img src="/header-cropped.svg" alt="header svg" />
            </div>
            <span className="text-[1.7rem] font-bold text-black">Ladu</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6 bg-[#7C7B79] px-4 py-2 rounded-3xl">
            {/* Other Links */}
            <div className="flex items-center gap-5 h-16 ">
              {otherItems.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="relative font-thin transition-colors duration-200 text-gray-100 pl-2"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative font-thin transition-colors duration-200 text-gray-100 pl-2"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Contact Link */}
            {contactItem && (
              <div>
                <Link
                  href={contactItem.href}
                  className="bg-gradient-to-b from-gray-200 to-gray-100 text-black px-6 py-4 rounded-2xl shadow-sm text-sm font-thin"
                >
                  {contactItem.name}
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
