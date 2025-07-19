import { createClient } from "microcms-js-sdk";

// 環境変数の確認用ログ
console.log("MICROCMS_SERVICE_DOMAIN:", process.env.MICROCMS_SERVICE_DOMAIN);
console.log(
  "MICROCMS_API_KEY:",
  process.env.MICROCMS_API_KEY ? "設定済み" : "未設定"
);

// microCMSクライアントの作成（環境変数が設定されていない場合はダミーデータを使用）
let client: any = null;

if (process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY) {
  client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  });
}

// ダミーデータ（固定日時でハイドレーションエラーを回避）
const dummyGames = [
  {
    id: "1",
    gameName: "サンプルゲーム1",
    description: "これはサンプルゲームです。",
    icon: {
      url: "/next.svg",
      height: 200,
      width: 200,
    },
    genre: "RPG",
    company: "サンプル会社",
    releaseDate: "2024-01-01T00:00:00.000Z",
    publishedAt: "2024-01-01T00:00:00.000Z",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    revisedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    gameName: "サンプルゲーム2",
    description: "もう一つのサンプルゲームです。",
    icon: {
      url: "/vercel.svg",
      height: 200,
      width: 200,
    },
    genre: "シミュレーション",
    company: "サンプル会社2",
    releaseDate: "2024-01-02T00:00:00.000Z",
    publishedAt: "2024-01-02T00:00:00.000Z",
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
    revisedAt: "2024-01-02T00:00:00.000Z",
  },
];

const dummyBlogs = [
  {
    id: "1",
    title: "サンプル記事1",
    body: "これはサンプル記事です。実際のmicroCMSの設定が完了すると、ここに実際の記事が表示されます。",
    publishedAt: "2024-01-01T00:00:00.000Z",
    category: {
      id: "1",
      name: "ニュース",
      slug: "news",
      createdAt: "",
      updatedAt: "",
      revisedAt: "",
      publishedAt: "",
    },
    tags: [
      {
        id: "1",
        name: "サンプル",
        slug: "sample",
        createdAt: "",
        updatedAt: "",
        revisedAt: "",
        publishedAt: "",
      },
    ],
    eyecatch: {
      url: "/globe.svg",
      height: 200,
      width: 400,
    },
    slug: "sample-1",
    gameName: "サンプルゲーム1",
    priority: "medium",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    revisedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "サンプル記事2",
    body: "もう一つのサンプル記事です。microCMSの設定が完了すると、実際のデータが表示されます。",
    publishedAt: "2024-01-02T00:00:00.000Z",
    category: {
      id: "2",
      name: "イベント",
      slug: "event",
      createdAt: "",
      updatedAt: "",
      revisedAt: "",
      publishedAt: "",
    },
    tags: [
      {
        id: "2",
        name: "イベント",
        slug: "event",
        createdAt: "",
        updatedAt: "",
        revisedAt: "",
        publishedAt: "",
      },
    ],
    eyecatch: {
      url: "/file.svg",
      height: 200,
      width: 400,
    },
    slug: "sample-2",
    gameName: "サンプルゲーム2",
    priority: "high",
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
    revisedAt: "2024-01-02T00:00:00.000Z",
  },
];

// ゲーム一覧取得
export const getGames = async () => {
  if (!client) {
    return { contents: dummyGames };
  }

  try {
    console.log("microCMS API呼び出し開始...");
    // 複数のエンドポイント名を試す
    const endpoints = ["games", "game", "Games", "game-list"];
    let result = null;
    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        console.log(`エンドポイント "${endpoint}" を試行中...`);
        result = await client.get({ endpoint });
        console.log(
          `エンドポイント "${endpoint}" で成功:`,
          JSON.stringify(result, null, 2)
        );

        // データ構造を調整
        if (result.contents) {
          result.contents = result.contents.map((game: any) => ({
            ...game,
            icon: game.icon || { url: "/next.svg", height: 200, width: 200 },
            category: game.catrgory || game.category || { name: "未分類" },
            tags: game.tag ? [{ name: game.tag, id: "1" }] : [],
          }));
        }

        break;
      } catch (error: any) {
        console.log(`エンドポイント "${endpoint}" で失敗:`, error?.status);
        lastError = error;
      }
    }

    if (!result) {
      throw lastError;
    }
    return result;
  } catch (error: any) {
    console.error("ゲーム一覧取得エラー:", error);
    console.error("エラー詳細:", {
      message: error?.message,
      status: error?.status,
      response: error?.response,
    });
    return { contents: dummyGames };
  }
};

// 記事一覧取得（ゲーム名でフィルタ）
export const getBlogsByGame = async (gameName: string) => {
  if (!client) {
    const filteredBlogs = dummyBlogs.filter(
      (blog) => blog.gameName === gameName
    );
    return { contents: filteredBlogs };
  }

  try {
    return await client.get({
      endpoint: "blog",
      queries: { filters: `gameName[equals]${gameName}` },
    });
  } catch (error) {
    console.error("記事一覧取得エラー:", error);
    return { contents: [] };
  }
};

// 全記事一覧取得
export const getAllBlogs = async () => {
  if (!client) {
    console.log("クライアントが未設定のため、ダミーデータを返します");
    return { contents: dummyBlogs };
  }

  try {
    console.log("Blog API呼び出し開始...");
    // 複数のエンドポイント名を試す
    const endpoints = ["blog", "blogs", "Blog", "article", "articles"];
    let result = null;
    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        console.log(`Blogエンドポイント "${endpoint}" を試行中...`);
        result = await client.get({ endpoint });
        console.log(
          `Blogエンドポイント "${endpoint}" で成功:`,
          JSON.stringify(result, null, 2)
        );

        // データ構造を調整
        if (result.contents) {
          result.contents = result.contents.map((blog: any) => ({
            ...blog,
            // フィールド名の調整
            body: blog.text || blog.body || "内容がありません",
            eyecatch: blog.Thumbnail ||
              blog.featured ||
              blog.eyecatch || {
                url: "/globe.svg",
                height: 200,
                width: 400,
              },
            category:
              typeof blog.category === "string"
                ? { name: blog.category }
                : blog.category || { name: "未分類" },
            tags: blog.tag ? [{ name: blog.tag, id: "1" }] : blog.tags || [],
            gameName: blog.gameName || "未分類ゲーム",
            publishedAt: blog.dateandtime || blog.publishedAt,
            slug: blog.slug || blog.id,
          }));
        }

        break;
      } catch (error: any) {
        console.log(`Blogエンドポイント "${endpoint}" で失敗:`, error?.status);
        lastError = error;
      }
    }

    if (!result) {
      throw lastError;
    }

    return result;
  } catch (error: any) {
    console.error("全記事一覧取得エラー:", error);
    console.error("Blogエラー詳細:", {
      message: error?.message,
      status: error?.status,
      response: error?.response,
    });
    console.log("ダミーデータを返します");
    return { contents: dummyBlogs };
  }
};

// 超簡易版API関数

// キャラクター一覧取得
export const getCharacters = async () => {
  if (!client) {
    return { contents: [] };
  }

  try {
    console.log("キャラクター一覧取得開始...");
    const result = await client.get({ endpoint: "characters" });
    console.log("キャラクター一覧取得成功:", JSON.stringify(result, null, 2));
    return result;
  } catch (error: any) {
    console.error("キャラクター一覧取得エラー:", error);
    return { contents: [] };
  }
};

// 攻略記事一覧取得
export const getGuides = async () => {
  if (!client) {
    return { contents: [] };
  }

  try {
    console.log("攻略記事一覧取得開始...");
    const result = await client.get({ endpoint: "guides" });
    console.log("攻略記事一覧取得成功:", JSON.stringify(result, null, 2));
    return result;
  } catch (error: any) {
    console.error("攻略記事一覧取得エラー:", error);
    return { contents: [] };
  }
};

// 個別データ取得関数
export const getGameById = async (id: string) => {
  if (!client) {
    return null;
  }

  try {
    const result = await client.get({ endpoint: "games", contentId: id });
    return result;
  } catch (error: any) {
    console.error("ゲーム詳細取得エラー:", error);
    return null;
  }
};

export const getCharacterById = async (id: string) => {
  if (!client) {
    return null;
  }

  try {
    const result = await client.get({ endpoint: "characters", contentId: id });
    return result;
  } catch (error: any) {
    console.error("キャラクター詳細取得エラー:", error);
    return null;
  }
};

export const getGuideById = async (id: string) => {
  if (!client) {
    return null;
  }

  try {
    const result = await client.get({ endpoint: "guides", contentId: id });
    return result;
  } catch (error: any) {
    console.error("攻略記事詳細取得エラー:", error);
    return null;
  }
};

// 関連データ取得関数
export const getCharactersByGame = async (gameId: string) => {
  if (!client) {
    return { contents: [] };
  }

  try {
    console.log(`ゲーム別キャラクター取得開始: gameId=${gameId}`);
    const result = await client.get({
      endpoint: "characters",
      queries: { filters: `game[equals]${gameId}` },
    });
    console.log(
      `ゲーム別キャラクター取得成功:`,
      JSON.stringify(result, null, 2)
    );
    return result;
  } catch (error: any) {
    console.error("ゲーム別キャラクター取得エラー:", error);
    console.error("エラー詳細:", {
      message: error?.message,
      status: error?.status,
      response: error?.response,
    });
    return { contents: [] };
  }
};

export const getGuidesByGame = async (gameId: string) => {
  if (!client) {
    return { contents: [] };
  }

  try {
    console.log(`ゲーム別攻略記事取得開始: gameId=${gameId}`);
    const result = await client.get({
      endpoint: "guides",
      queries: { filters: `game[equals]${gameId}` },
    });
    console.log(`ゲーム別攻略記事取得成功:`, JSON.stringify(result, null, 2));
    return result;
  } catch (error: any) {
    console.error("ゲーム別攻略記事取得エラー:", error);
    console.error("エラー詳細:", {
      message: error?.message,
      status: error?.status,
      response: error?.response,
    });
    return { contents: [] };
  }
};

export const getGuidesByCharacter = async (characterId: string) => {
  if (!client) {
    return { contents: [] };
  }

  try {
    const result = await client.get({
      endpoint: "guides",
      queries: { filters: `character[equals]${characterId}` },
    });
    return result;
  } catch (error: any) {
    console.error("キャラクター別攻略記事取得エラー:", error);
    return { contents: [] };
  }
};
