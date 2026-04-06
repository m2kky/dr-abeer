import type { Metadata } from "next";
import { Figtree, Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "عبير عطالله | بناء التعليم ودعم الإنسان",
  description:
    "الموقع الرسمي لعضوة البرلمان المصرية عبير عطالله — خبرة طويلة، ورسالة أكبر.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${figtree.variable} antialiased`}
    >
      <body className="bg-black text-white" suppressHydrationWarning>
        {children}
        {/* Grain overlay for premium texture */}
        <div className="grain" aria-hidden="true" />
        {/* Vignette for depth */}
        <div className="vignette" aria-hidden="true" />
      </body>
    </html>
  );
}
