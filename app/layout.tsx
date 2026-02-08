import type { Metadata } from "next";
import { Geist, Geist_Mono, Indie_Flower } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/main/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nailart AI - AI 유튜브 썸네일 생성기",
  description: "AI가 클릭을 부르는 유튜브 썸네일을 자동으로 생성합니다. 디자인 경험 없이도 전문가 수준의 썸네일을 만들어보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${indieFlower.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
