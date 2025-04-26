import type { Metadata } from "next";
import { Nunito_Sans, Work_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import TopInfoBar from "@/components/shared/TopInfoBar";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/provider/AuthProvider";
import Navbar from "@/components/shared/Navbar";
import FloatingChatbot from "@/components/chatbot/floating-chatbot";
import GlobalContextProvider from "@/context/GlobalContext";
import QueryProvider from "@/components/react-query/QueryProvider";

//
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700"],
});
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${workSans.variable} ${nunitoSans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <QueryProvider>
          <GlobalContextProvider>
            <AuthProvider>
              <Toaster position="top-right" reverseOrder={false} />
              <TopInfoBar />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingChatbot />
            </AuthProvider>
          </GlobalContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
