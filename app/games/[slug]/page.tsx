import {
  getGameById,
  getCharactersByGame,
  getGuidesByGame,
} from "@/app/lib/microcms";
import Image from "next/image";
import Link from "next/link";

// 超簡易版ゲーム詳細ページの型定義
interface Game {
  id: string;
  gameName: string;
  description: string;
  genre: string[];
  company: string;
  releaseDate: string;
  category: string[];
  tags: string;
  gameIcon?: {
    url: string;
    height: number;
    width: number;
  };
}

interface Character {
  id: string;
  characterName: string;
  characterImage?: {
    url: string;
    height: number;
    width: number;
  };
  rarity: string[];
  element: string[];
  weaponType: string[];
  role: string[];
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
  tags: string;
  game?: {
    id: string;
    gameName: string;
  };
}

// 配列形式のフィールドを文字列に変換するヘルパー関数
const formatArrayField = (field: any): string => {
  if (Array.isArray(field)) {
    return field.join(", ");
  }
  return field || "";
};

// 超簡易版ゲーム詳細ページ
export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    // ゲーム情報を取得
    const game = await getGameById(slug);

    if (!game) {
      return (
        <div className="container">
          <div className="error">ゲームが見つかりませんでした。</div>
          <div className="navigation">
            <Link href="/" className="homeButton">
              🏠 トップページに戻る
            </Link>
          </div>
        </div>
      );
    }

    // 関連キャラクターを取得
    const characters = await getCharactersByGame(game.id);

    // 関連攻略記事を取得
    const guides = await getGuidesByGame(game.id);

    // デバッグ用ログ
    console.log("ゲーム詳細ページ - 取得したデータ:", {
      game: game?.gameName,
      charactersCount: characters?.contents?.length || 0,
      guidesCount: guides?.contents?.length || 0,
      guides: guides?.contents,
    });

    return (
      <div className="container">
        {/* ナビゲーション */}
        <div className="navigation">
          <Link href="/" className="homeButton">
            🏠 トップページに戻る
          </Link>
        </div>

        {/* ゲームヘッダー */}
        <div className="gameHeader">
          <div className="gameHeaderContent">
            <div className="gameIcon">
              {game.gameIcon ? (
                <Image
                  src={game.gameIcon.url}
                  alt={game.gameName}
                  width={100}
                  height={100}
                  className="gameIconImage"
                />
              ) : (
                <div className="gameIconPlaceholder">🎮</div>
              )}
            </div>
            <div className="gameInfo">
              <h1 className="gameTitle">{game.gameName}</h1>
              <p className="gameDescription">{game.description}</p>
              <div className="gameMeta">
                <span className="gameGenre">
                  {formatArrayField(game.genre)}
                </span>
                <span className="gameCompany">{game.company}</span>
                <span className="gameCategory">
                  {formatArrayField(game.category)}
                </span>
              </div>
              <div className="gameTags">
                {game.tags?.split(",").map((tag: string, index: number) => (
                  <span key={index} className="tag">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* キャラクター一覧 */}
        <section className="charactersSection">
          <h2 className="sectionTitle">
            キャラクター一覧 ({characters?.contents?.length || 0}件)
          </h2>
          <div className="charactersGrid">
            {characters?.contents?.map((character: Character) => (
              <Link
                key={character.id}
                href={`/characters/${character.id}`}
                className="characterCard"
              >
                <div className="characterImage">
                  {character.characterImage ? (
                    <Image
                      src={character.characterImage.url}
                      alt={character.characterName}
                      width={150}
                      height={150}
                      className="characterImage"
                    />
                  ) : (
                    <div className="characterImagePlaceholder">👤</div>
                  )}
                </div>
                <div className="characterInfo">
                  <h3 className="characterName">{character.characterName}</h3>
                  <div className="characterMeta">
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
                    <span className="weaponType">
                      {formatArrayField(character.weaponType)}
                    </span>
                  </div>
                  <div className="characterRole">
                    <span className="role">
                      {formatArrayField(character.role)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 攻略記事一覧 */}
        <section className="guidesSection">
          <h2 className="sectionTitle">
            攻略記事 ({guides?.contents?.length || 0}件)
          </h2>
          <div className="guidesGrid">
            {guides?.contents?.map((guide: Guide) => (
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
    console.error("ゲーム詳細の取得に失敗しました:", error);
    return (
      <div className="container">
        <div className="error">
          ゲーム情報の取得に失敗しました。しばらく時間をおいて再度お試しください。
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
