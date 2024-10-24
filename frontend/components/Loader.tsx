"use client";

import { useEffect, useState } from "react";

export default function Loader({ text = "Loading" }: { text?: string }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-semibold text-white">
        {text}
        {dots}
      </p>
    </div>
  );
}
