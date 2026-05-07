import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import ChatBot from "@/components/ChatBot";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM Lead Management System",
  description: "Full-stack CRM Lead Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}