import { getGuideById } from "@/app/lib/microcms";
import Image from "next/image";
import Link from "next/link";

// 超簡易版攻略記事詳細ページの型定義
interface Guide {
  id: string;
  title: string;
  game: {
    id: string;
    gameName: string;
  };
  character?: {
    id: string;
    characterName: string;
  };
  content: string;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
  category: string[];
  publishDate: string;
  tags: string;
}

// 配列形式のフィールドを文字列に変換するヘルパー関数
const formatArrayField = (field: any): string => {
  if (Array.isArray(field)) {
    return field.join(", ");
  }
  return field || "";
};

// 超簡易版攻略記事詳細ページ
export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    // 攻略記事情報を取得
    const guide = await getGuideById(id);

    if (!guide) {
      return (
        <div className="container">
          <div className="error">攻略記事が見つかりませんでした。</div>
          <div className="navigation">
            <Link href="/" className="homeButton">
              🏠 トップページに戻る
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        {/* ナビゲーション */}
        <div className="navigation">
          <Link href="/" className="homeButton">
            🏠 トップページに戻る
          </Link>
        </div>

        {/* 記事ヘッダー */}
        <div className="guideHeader">
          <div className="guideHeaderContent">
            <div className="guideImage">
              {guide.thumbnail ? (
                <Image
                  src={guide.thumbnail.url}
                  alt={guide.title}
                  width={400}
                  height={250}
                  className="guideThumbnail"
                />
              ) : (
                <div className="guideImagePlaceholder">📖</div>
              )}
            </div>
            <div className="guideInfo">
              <h1 className="guideTitle">{guide.title}</h1>
              <div className="guideMeta">
                <span className="guideCategory">
                  {formatArrayField(guide.category)}
                </span>
                <span className="guideDate">
                  {new Date(guide.publishDate).toLocaleDateString("ja-JP")}
                </span>
              </div>
              {guide.tags && (
                <div className="guideTags">
                  <span className="tag">{guide.tags}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 記事内容 */}
        <section className="guideContent">
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />
        </section>
      </div>
    );
  } catch (error) {
    console.error("攻略記事詳細の取得に失敗しました:", error);
    return (
      <div className="container">
        <div className="error">
          攻略記事の取得に失敗しました。しばらく時間をおいて再度お試しください。
        </div>
        <div className="navigation">
          <Link href="/" className="homeButton">
            🏠 トップページに戻る
          </Link>
        </div>
      </div>
    );
  }
}
