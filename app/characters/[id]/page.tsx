import { getCharacterById, getGuidesByCharacter } from "@/app/lib/microcms";
import Image from "next/image";
import Link from "next/link";

// 超簡易版キャラクター詳細ページの型定義
interface Character {
  id: string;
  characterName: string;
  game: {
    id: string;
    gameName: string;
  };
  characterImage?: {
    url: string;
    height: number;
    width: number;
  };
  rarity: string[];
  element: string[];
  weaponType: string[];
  role: string[];
  simpleUsage: string;
}

interface Guide {
  id: string;
  title: string;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
  category: string[];
  publishDate: string;
}

// 配列形式のフィールドを文字列に変換するヘルパー関数
const formatArrayField = (field: any): string => {
  if (Array.isArray(field)) {
    return field.join(", ");
  }
  return field || "";
};

// 超簡易版キャラクター詳細ページ
export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    // キャラクター情報を取得
    const character = await getCharacterById(id);

    if (!character) {
      return (
        <div className="container">
          <div className="error">キャラクターが見つかりませんでした。</div>
          <div className="navigation">
            <Link href="/" className="homeButton">
              🏠 トップページに戻る
            </Link>
          </div>
        </div>
      );
    }

    // 関連攻略記事を取得
    const guides = await getGuidesByCharacter(character.id);

    return (
      <div className="container">
        {/* ナビゲーション */}
        <div className="navigation">
          <Link href="/" className="homeButton">
            🏠 トップページに戻る
          </Link>
        </div>

        {/* キャラクターヘッダー */}
        <div className="characterHeader">
          <div className="characterHeaderContent">
            <div className="characterImage">
              {character.characterImage ? (
                <Image
                  src={character.characterImage.url}
                  alt={character.characterName}
                  width={200}
                  height={200}
                  className="characterMainImage"
                />
              ) : (
                <div className="characterImagePlaceholder">👤</div>
              )}
            </div>
            <div className="characterInfo">
              <div className="characterMeta">
                <Link href={`/games/${character.game.id}`} className="gameLink">
                  {character.game.gameName}
                </Link>
                <span
                  className={`rarity rarity${formatArrayField(
                    character.rarity
                  )}`}
                >
                  {formatArrayField(character.rarity)}
                </span>
                <span
                  className={`element element${formatArrayField(
                    character.element
                  )}`}
                >
                  {formatArrayField(character.element)}
                </span>
              </div>
              <h1 className="characterTitle">{character.characterName}</h1>
              <div className="characterDetails">
                <span className="weaponType">
                  {formatArrayField(character.weaponType)}
                </span>
                <span className="role">{formatArrayField(character.role)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 簡単な使い方 */}
        <section className="usageSection">
          <h2 className="sectionTitle">簡単な使い方</h2>
          <div className="usageCard">
            <p>{character.simpleUsage}</p>
          </div>
        </section>

        {/* 関連攻略記事 */}
        <section className="guidesSection">
          <h2 className="sectionTitle">関連攻略記事</h2>
          <div className="guidesGrid">
            {guides.contents.map((guide: Guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.id}`}
                className="guideCard"
              >
                <div className="guideImage">
                  {guide.thumbnail ? (
                    <Image
                      src={guide.thumbnail.url}
                      alt={guide.title}
                      width={250}
                      height={150}
                      className="guideThumbnail"
                    />
                  ) : (
                    <div className="guideImagePlaceholder">📖</div>
                  )}
                </div>
                <div className="guideContent">
                  <h3 className="guideTitle">{guide.title}</h3>
                  <div className="guideMeta">
                    <span className="guideCategory">
                      {formatArrayField(guide.category)}
                    </span>
                  </div>
                  <div className="guideDate">
                    <span className="publishDate">
                      {new Date(guide.publishDate).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("キャラクター詳細の取得に失敗しました:", error);
    return (
      <div className="container">
        <div className="error">
          キャラクター情報の取得に失敗しました。しばらく時間をおいて再度お試しください。
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
