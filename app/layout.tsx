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
    default: "АРКА 123 — пространство для встреч в Минске",
    template: "%s · АРКА 123",
  },
  description:
    "Пространство для презентаций, переговоров и событий напротив Национальной библиотеки. Минск, Мстиславца, 10.",
  openGraph: {
    title: "АРКА 123 — место, где встречаются идеи",
    description:
      "Светлое пространство для встреч и событий напротив Национальной библиотеки.",
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
