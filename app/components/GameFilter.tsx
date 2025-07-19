"use client";

import { useState } from "react";
import type { Game } from "../types/index";
import Link from "next/link";

interface GameFilterProps {
  games: Game[];
  guides: any[];
}

export default function GameFilter({ games, guides }: GameFilterProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // 選択されたゲームに基づいて記事をフィルタ
  const filteredGuides = selectedGame
    ? guides.filter((guide) => guide.game?.gameName === selectedGame)
    : guides;

  return (
    <section style={{ marginBottom: "3rem" }}>
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "1.5rem",
          color: "#333",
        }}
      >
        ゲーム別記事一覧
      </h2>

      {/* ゲーム選択ボタン */}
      <div style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            marginBottom: "1rem",
            color: "#555",
          }}
        >
          ゲームを選択してください
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <button
            className={`button ${
              !selectedGame ? "buttonPrimary" : "buttonSecondary"
            }`}
            onClick={() => setSelectedGame(null)}
            style={{
              position: "relative",
              fontWeight: !selectedGame ? "600" : "400",
              transform: !selectedGame ? "scale(1.05)" : "scale(1)",
              boxShadow: !selectedGame
                ? "0 4px 12px rgba(0,0,0,0.2)"
                : "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {!selectedGame && "✓ "}すべての記事
          </button>
          {games.map((game) => (
            <button
              key={game.id}
              className={`button ${
                selectedGame === game.gameName
                  ? "buttonPrimary"
                  : "buttonSecondary"
              }`}
              style={{
                marginBottom: "0.5rem",
                position: "relative",
                fontWeight: selectedGame === game.gameName ? "600" : "400",
                transform:
                  selectedGame === game.gameName ? "scale(1.05)" : "scale(1)",
                boxShadow:
                  selectedGame === game.gameName
                    ? "0 4px 12px rgba(0,0,0,0.2)"
                    : "0 2px 4px rgba(0,0,0,0.1)",
              }}
              onClick={() => setSelectedGame(game.gameName)}
            >
              {selectedGame === game.gameName && "✓ "}
              {game.gameName}
            </button>
          ))}
        </div>
      </div>

      {/* 記事一覧 */}
      <div>
        <h3
          style={{
            fontSize: "1.25rem",
            marginBottom: "1rem",
            color: "#555",
          }}
        >
          {selectedGame ? `${selectedGame}の記事` : "記事一覧"}
          <span
            style={{ fontSize: "1rem", color: "#666", marginLeft: "0.5rem" }}
          >
            ({filteredGuides.length}件)
          </span>
        </h3>
        {filteredGuides.length > 0 ? (
          <div className="guidesGrid">
            {filteredGuides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.id}`}
                className="guideCard"
              >
                <div className="guideImage">
                  {guide.thumbnail ? (
                    <img
                      src={guide.thumbnail.url}
                      alt={guide.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "var(--radius-md)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        background: "var(--surface-ground)",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem",
                        border: "1px solid var(--surface-border)",
                      }}
                    >
                      📖
                    </div>
                  )}
                </div>
                <div className="guideContent">
                  <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>
                    {guide.title}
                  </h4>
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>
                    {guide.game?.gameName && (
                      <span style={{ marginRight: "1rem" }}>
                        🎮 {guide.game.gameName}
                      </span>
                    )}
                    <span>
                      📅{" "}
                      {new Date(guide.publishDate).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  {guide.category && (
                    <div style={{ marginTop: "0.5rem" }}>
                      {Array.isArray(guide.category) ? (
                        guide.category.map((cat: string, index: number) => (
                          <span
                            key={index}
                            style={{
                              display: "inline-block",
                              padding: "0.25rem 0.5rem",
                              background: "var(--primary-color)",
                              color: "white",
                              borderRadius: "var(--radius-sm)",
                              fontSize: "0.8rem",
                              marginRight: "0.5rem",
                              marginBottom: "0.25rem",
                            }}
                          >
                            {cat}
                          </span>
                        ))
                      ) : (
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.25rem 0.5rem",
                            background: "var(--primary-color)",
                            color: "white",
                            borderRadius: "var(--radius-sm)",
                            fontSize: "0.8rem",
                          }}
                        >
                          {guide.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              background: "var(--surface-ground)",
              borderRadius: "var(--radius-lg)",
              color: "#666",
            }}
          >
            {selectedGame
              ? `${selectedGame}の記事はありません`
              : "記事を読み込み中..."}
          </div>
        )}
      </div>
    </section>
  );
}
