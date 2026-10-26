import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Тестовое задание · АРКА 123",
    template: "%s · АРКА 123",
  },
  description:
    "Cover и готовый сайт пространства АРКА 123: анимация логотипа, персонаж, видео героя и коммерческая витрина.",
  openGraph: {
    title: "АРКА 123 — тестовое задание",
    description:
      "Анимация логотипа, фирменный персонаж, видео героя и готовый сайт пространства напротив Национальной библиотеки.",
    locale: "ru_BY",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
