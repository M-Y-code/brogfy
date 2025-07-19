// microCMSの共通型定義
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface MicroCMSObjectContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

// ブログ記事の型定義
export interface Blog extends MicroCMSObjectContent {
  title: string;
  body: string;
  publishedAt: string;
  category: Category;
  tags: Tag[];
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
  slug: string;
  gameName: string;
  eventName?: string;
  eventPeriod?: {
    start: string;
    end: string;
  };
  priority: "high" | "medium" | "low";
}

// カテゴリの型定義
export interface Category extends MicroCMSObjectContent {
  name: string;
  slug: string;
}

// タグの型定義
export interface Tag extends MicroCMSObjectContent {
  name: string;
  slug: string;
}

// ゲーム情報の型定義
export interface Game extends MicroCMSObjectContent {
  gameName: string;
  description: string;
  icon: {
    url: string;
    height: number;
    width: number;
  };
  officialUrl?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
  genre: "RPG" | "シミュレーション" | "パズル" | "アクション" | "その他";
  company: string;
  releaseDate: string;
}

// イベント情報の型定義
export interface Event extends MicroCMSObjectContent {
  eventName: string;
  description: string;
  startDate: string;
  endDate: string;
  game: Game;
  eventType: "ガチャ" | "イベント" | "メンテナンス" | "アップデート" | "その他";
  priority: "high" | "medium" | "low";
  image?: {
    url: string;
    height: number;
    width: number;
  };
}

// イベントの状態
export type EventStatus = "upcoming" | "ongoing" | "ended";

// フィルタ・ソート用の型定義
export interface BlogFilters {
  category?: string;
  tags?: string[];
  gameName?: string;
  priority?: "high" | "medium" | "low";
  eventStatus?: EventStatus;
}

export interface SortOptions {
  field: "publishedAt" | "priority" | "title";
  order: "asc" | "desc";
}
