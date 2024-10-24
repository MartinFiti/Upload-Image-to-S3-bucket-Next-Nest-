"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Demo S3 Image Upload
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col space-y-2 py-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
