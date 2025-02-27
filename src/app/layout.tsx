import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prayer Mode - Enjoy Your Prayer Time Without Interruptions",
  description: "Experience profound tranquility during your spiritual moments. Prayer Mode intelligently manages your digital presence with sophisticated Do Not Disturb technology, featuring our exclusive VIP contact system that ensures you remain connected to what truly matters while immersed in devotion.",
  icons: {
    icon: '/app-icon.png',
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
