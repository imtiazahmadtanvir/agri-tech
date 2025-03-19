import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";

import TopInfoBar from "@/components/shared/TopInfoBar";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/provider/AuthProvider";
import Navbar from "@/components/shared/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agri-Tech",
  description:
    "Agri-Tech is a digital platform designed to empower farmers by providing easy access to essential agricultural resources, market trends, and expert advice. Whether you're looking for guidance on crop production, staying updated with the latest market prices, or seeking expert recommendations to optimize your farming practices, Agri-Tech offers all the tools you need to succeed. With real-time data, weather insights, and a community of agricultural professionals, Agri-Tech helps farmers improve crop yield, make informed decisions, and boost their sales, all in one place. Join Agri-Tech today and cultivate smarter farming for a sustainable future.",
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
        <Toaster position="top-right" reverseOrder={false} />
        <TopInfoBar />
        <AuthProvider>
          <Navbar></Navbar>
        </AuthProvider>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
