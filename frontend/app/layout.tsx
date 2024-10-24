import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ToastProvider from "@/providers/toastProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Demo S3 Image Upload",
  description: "Testing uploading images to S3 from a Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <ToastProvider>
            <Header />
            <main className="flex-grow bg-slate-700">{children}</main>
            <Footer />
          </ToastProvider>
        </div>
      </body>
    </html>
  );
}
