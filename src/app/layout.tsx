import type { Metadata } from "next";
import { Source_Serif_4, Geist_Mono, Albert_Sans} from "next/font/google";
import "./globals.css";

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  weight: "300",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  weight: "300",
  subsets: ["latin"],  // You can add other subsets if needed
});


export const metadata: Metadata = {
  title: "Evelyn Zane",
  description: "Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSerif4.variable} ${geistMono.variable} 
        ${albertSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
