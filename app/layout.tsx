import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ソーシャルゲーム情報まとめブログ",
  description:
    "最新のソーシャルゲーム情報、イベント、攻略情報をお届けするブログサイトです。",
  keywords:
    "ソーシャルゲーム, ゲーム情報, イベント, 攻略, ガチャ, メンテナンス",
  authors: [{ name: "ゲーム情報ブログ" }],
  openGraph: {
    title: "ソーシャルゲーム情報まとめブログ",
    description:
      "最新のソーシャルゲーム情報、イベント、攻略情報をお届けするブログサイトです。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "ソーシャルゲーム情報まとめブログ",
    description:
      "最新のソーシャルゲーム情報、イベント、攻略情報をお届けするブログサイトです。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
