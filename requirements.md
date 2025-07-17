# ブログサイト要件（microCMS + Next.js + CSS Modules）

## 1. 記事管理（microCMS側）
- microCMSで「ブログ」サービスを作成
- 各記事のフィールド例
  - タイトル（title）
  - 本文（body、リッチエディタ可）
  - 公開日（publishedAt）
  - カテゴリ（category、リレーション型）
  - タグ（tags、複数選択可）
  - アイキャッチ画像（eyecatch、画像型）
  - スラッグ（slug、URL用）
- カテゴリ・タグもmicroCMSで管理

## 2. フロントエンド（Next.js）
- 記事一覧ページ
  - 記事タイトル、アイキャッチ、カテゴリ、タグ、公開日を表示
  - タグ・カテゴリでフィルタ可能
- 記事詳細ページ
  - 記事本文をリッチに表示
  - 関連記事やタグ・カテゴリ表示
- カテゴリ・タグ一覧ページ（任意）
- レスポンシブ対応（スマホ・PC両対応）

## 3. デザイン
- CSS Modulesでスタイリング
- UIフレームワーク（Tailwind, shadcn/ui等）は使わない
- シンプルで見やすいデザイン

## 4. データ取得・表示
- microCMSのAPIから記事・カテゴリ・タグを取得
- `getStaticProps`や`getStaticPaths`で静的生成（SSG）を活用
- `.env.local`でAPIキー等の管理

## 5. その他
- 無料枠で運用（microCMSの無料プラン、Vercel等でデプロイ）
- SEO対策（title, description, OGP対応など）
- サイトタイトルやプロフィールなどの基本情報ページ

## 6. ファイル構成・分割
- 機能ごとにファイルを分割する
  - 例: APIクライアントは`lib/`配下、UI部品は`app/components/`配下など 