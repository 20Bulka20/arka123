import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "АРКА 123 — пространство для встреч в Минске",
  description:
    "Пространство для презентаций, переговоров и событий напротив Национальной библиотеки. Минск, Мстиславца, 10.",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
