import Header from "./components/Header";
import Footer from "./components/Footer";
import GameFilter from "./components/GameFilter";
import { getGames, getGuides } from "./lib/microcms";
import type { Game } from "./types/index";

export default async function Home() {
  // データ取得
  let games: Game[] = [];
  let guides: any[] = [];

  try {
    // ゲーム一覧を取得
    const gamesResponse = await getGames();
    games = gamesResponse.contents;

    // 攻略記事一覧を取得
    const guidesResponse = await getGuides();
    guides = guidesResponse.contents;

    console.log("取得したデータ:", {
      games: games.length,
      guides: guides.length,
    });
  } catch (error) {
    console.error("データ取得エラー:", error);
  }

  return (
    <div>
      <Header />

      <main className="main">
        <div className="container">
          {/* ヒーローセクション */}
          <section
            style={{
              background: "var(--gradient-rainbow)",
              color: "white",
              padding: "4rem 2rem",
              borderRadius: "var(--radius-2xl)",
              marginBottom: "3rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            {/* 装飾的な背景要素 */}
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background:
                  'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
                animation: "float 20s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h1
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  fontWeight: "800",
                  textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                  background: "linear-gradient(45deg, #fff, #f0f0f0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                🎮 ソーシャルゲーム情報まとめブログ
              </h1>
              <p
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "1.5rem",
                  opacity: 0.95,
                  fontWeight: "500",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                ✨ 最新のゲーム情報、イベント、攻略情報をお届けします ✨
              </p>

              {/* データ統計表示 */}
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {games.length}
                  </div>
                  <div style={{ fontSize: "1rem", opacity: 0.9 }}>ゲーム</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {guides.length}
                  </div>
                  <div style={{ fontSize: "1rem", opacity: 0.9 }}>攻略記事</div>
                </div>
              </div>
            </div>
          </section>

          {/* ゲーム別記事一覧 */}
          <GameFilter games={games} guides={guides} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
