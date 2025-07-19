"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="headerContent">
          <Link href="/" className="logo">
            ゲーム情報ブログ
          </Link>
          <nav className="nav">
            <Link href="/" className="navLink">
              ホーム
            </Link>
            <Link href="/blog" className="navLink">
              記事一覧
            </Link>
            <Link href="/games" className="navLink">
              ゲーム一覧
            </Link>
            <Link href="/events" className="navLink">
              イベント
            </Link>
            <Link href="/about" className="navLink">
              このサイトについて
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
