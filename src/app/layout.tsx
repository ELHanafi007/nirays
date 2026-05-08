import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nirayas sushi & wok | Artisanal Japanese Dining",
  description:
    "An elevated Japanese dining experience where tradition meets contemporary artistry. Explore our curated menu of premium sushi, sashimi, and wok specialties.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="grain">{children}</body>
    </html>
  );
}
