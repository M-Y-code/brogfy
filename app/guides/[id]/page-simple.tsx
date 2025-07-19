import { client } from "@/app/lib/microcms";
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
  category: string;
  author: string;
  publishDate: string;
  tags: string;
}

// 超簡易版攻略記事詳細ページ
export default async function GuideDetailPageSimple({
  params,
}: {
  params: { id: string };
}) {
  try {
    // 攻略記事情報を取得
    const guide = await client.get<Guide>({
      endpoint: "guides",
      contentId: params.id,
    });

    return (
      <div className="container">
        {/* 記事ヘッダー */}
        <div className="guideHeader">
          <div className="guideHeaderContent">
            <div className="guideMeta">
              <Link href={`/games/${guide.game.id}`} className="gameLink">
                {guide.game.gameName}
              </Link>
              {guide.character && (
                <Link
                  href={`/characters/${guide.character.id}`}
                  className="characterLink"
                >
                  {guide.character.characterName}
                </Link>
              )}
              <span className="guideCategory">{guide.category}</span>
            </div>
            <h1 className="guideTitle">{guide.title}</h1>
            <div className="guideInfo">
              <span className="author">執筆者: {guide.author}</span>
              <span className="publishDate">
                {new Date(guide.publishDate).toLocaleDateString("ja-JP")}
              </span>
            </div>
            <div className="guideTags">
              {guide.tags?.split(",").map((tag: string, index: number) => (
                <span key={index} className="tag">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
          {guide.thumbnail && (
            <div className="guideThumbnail">
              <Image
                src={guide.thumbnail.url}
                alt={guide.title}
                width={400}
                height={200}
                className="guideMainImage"
              />
            </div>
          )}
        </div>

        {/* 記事本文 */}
        <section className="guideContent">
          <h2 className="sectionTitle">攻略手順</h2>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />
        </section>
      </div>
    );
  } catch (error) {
    console.error("攻略記事の取得に失敗しました:", error);
    return (
      <div className="container">
        <div className="error">
          攻略記事の取得に失敗しました。しばらく時間をおいて再度お試しください。
        </div>
      </div>
    );
  }
}
