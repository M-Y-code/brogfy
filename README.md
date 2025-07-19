# ソーシャルゲーム情報まとめブログ

Next.js + microCMS + CSS Modules で構築されたソーシャルゲーム情報まとめブログサイトです。

## 機能

- 📰 ブログ記事の表示・管理
- 🎮 ゲーム情報の管理・表示
- 📅 イベント情報の管理・表示
- 🔍 高度なフィルタリング機能
- 📱 レスポンシブデザイン
- ⚡ 静的生成（SSG）対応
- 🔒 SEO 対策

## 技術スタック

- **フロントエンド**: Next.js 15, React 19, TypeScript
- **スタイリング**: CSS Modules
- **CMS**: microCMS
- **デプロイ**: Vercel（推奨）

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd brogfy
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local` ファイルを作成し、以下の内容を設定してください：

```env
# microCMS設定
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# サイト設定
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=ソーシャルゲーム情報まとめブログ
```

### 4. microCMS の設定

1. [microCMS](https://microcms.io/) でアカウントを作成
2. 新しいサービスを作成
3. 以下の API スキーマを設定：

#### ブログ（blog）

- title: テキストフィールド
- body: リッチエディタ
- publishedAt: 日時
- category: リレーション（categories）
- tags: 複数選択（tags）
- eyecatch: 画像
- slug: テキストフィールド
- gameName: テキストフィールド
- eventName: テキストフィールド（任意）
- eventPeriod: オブジェクト（start, end）
- priority: セレクト（high, medium, low）

#### カテゴリ（categories）

- name: テキストフィールド
- slug: テキストフィールド

#### タグ（tags）

- name: テキストフィールド
- slug: テキストフィールド

#### ゲーム（games）

- gameName: テキストフィールド
- description: テキストエリア
- icon: 画像
- officialUrl: テキストフィールド（任意）
- appStoreUrl: テキストフィールド（任意）
- googlePlayUrl: テキストフィールド（任意）
- genre: セレクト（RPG, シミュレーション, パズル, アクション, その他）
- company: テキストフィールド
- releaseDate: 日時

#### イベント（events）

- eventName: テキストフィールド
- description: テキストエリア
- startDate: 日時
- endDate: 日時
- game: リレーション（games）
- eventType: セレクト（ガチャ, イベント, メンテナンス, アップデート, その他）
- priority: セレクト（high, medium, low）
- image: 画像（任意）

### 5. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

## プロジェクト構造

```
app/
├── components/          # 再利用可能なコンポーネント
│   ├── Header.tsx      # ヘッダーコンポーネント
│   ├── Footer.tsx      # フッターコンポーネント
│   ├── BlogCard.tsx    # ブログ記事カード
│   └── BlogFilter.tsx  # フィルターコンポーネント
├── lib/                # ユーティリティ・API
│   └── microcms.ts     # microCMS APIクライアント
├── types/              # TypeScript型定義
│   └── index.ts        # 共通型定義
├── styles/             # CSS Modules
│   └── globals.module.css
├── blog/               # ブログ関連ページ
├── games/              # ゲーム関連ページ
├── events/             # イベント関連ページ
├── layout.tsx          # ルートレイアウト
└── page.tsx            # ホームページ
```

## 主要機能

### ホームページ

- 最新記事の表示
- 進行中イベントの表示
- 人気ゲームの表示

### ブログ機能

- 記事一覧・詳細表示
- カテゴリ・タグ・ゲーム名でのフィルタリング
- 重要度でのソート
- イベント期間でのフィルタリング

### ゲーム機能

- ゲーム一覧・詳細表示
- ゲーム別記事表示
- ゲーム別イベント表示

### イベント機能

- イベント一覧・詳細表示
- イベントカレンダー
- 進行中・予定・終了済みの分類表示

## デプロイ

### Vercel（推奨）

1. [Vercel](https://vercel.com/) でアカウントを作成
2. GitHub リポジトリと連携
3. 環境変数を設定
4. デプロイ

### その他のプラットフォーム

- Netlify
- AWS Amplify
- その他の静的ホスティングサービス

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。

## サポート

問題が発生した場合は、GitHub のイシューで報告してください。
