import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "大麦·Matrix ∞ AI",
  description: "面向汽车营销创作者的 AI 内容生产平台"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
