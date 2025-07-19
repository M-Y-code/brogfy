import { client } from "@/app/lib/microcms";
import Image from "next/image";
import Link from "next/link";

// 超簡易版ゲーム詳細ページの型定義
interface Game {
  id: string;
  gameName: string;
  description: string;
  genre: string;
  company: string;
  releaseDate: string;
  category: string;
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
  rarity: string;
  element: string;
  weaponType: string;
  role: string;
}

interface Guide {
  id: string;
  title: string;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
  category: string;
  publishDate: string;
}

// 超簡易版ゲーム詳細ページ
export default async function GameDetailPageSimple({
  params,
}: {
  params: { slug: string };
}) {
  try {
    // ゲーム情報を取得
    const game = await client.get<Game>({
      endpoint: "games",
      contentId: params.slug,
    });

    // 関連キャラクターを取得
    const characters = await client.getList<Character>({
      endpoint: "characters",
      queries: { filters: `game[equals]${game.id}` },
    });

    // 関連攻略記事を取得
    const guides = await client.getList<Guide>({
      endpoint: "guides",
      queries: { filters: `game[equals]${game.id}` },
    });

    return (
      <div className="container">
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
                <span className="gameGenre">{game.genre}</span>
                <span className="gameCompany">{game.company}</span>
                <span className="gameCategory">{game.category}</span>
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
          <h2 className="sectionTitle">キャラクター一覧</h2>
          <div className="charactersGrid">
            {characters.contents.map((character: Character) => (
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
                    <span className={`rarity rarity${character.rarity}`}>
                      {character.rarity}
                    </span>
                    <span className={`element element${character.element}`}>
                      {character.element}
                    </span>
                    <span className="weaponType">{character.weaponType}</span>
                  </div>
                  <div className="characterRole">
                    <span className="role">{character.role}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 攻略記事一覧 */}
        <section className="guidesSection">
          <h2 className="sectionTitle">攻略記事</h2>
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
                    <span className="guideCategory">{guide.category}</span>
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
      </div>
    );
  }
}
