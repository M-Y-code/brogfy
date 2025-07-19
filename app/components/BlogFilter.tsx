"use client";

import { useState } from "react";
import type { Category, Tag, BlogFilters } from "../types";

interface BlogFilterProps {
  categories: Category[];
  tags: Tag[];
  games: string[];
  onFilterChange: (filters: BlogFilters) => void;
  currentFilters: BlogFilters;
}

export default function BlogFilter({
  categories,
  tags,
  games,
  onFilterChange,
  currentFilters,
}: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    currentFilters.category || ""
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    currentFilters.tags || []
  );
  const [selectedGame, setSelectedGame] = useState(
    currentFilters.gameName || ""
  );
  const [selectedPriority, setSelectedPriority] = useState(
    currentFilters.priority || ""
  );
  const [selectedEventStatus, setSelectedEventStatus] = useState(
    currentFilters.eventStatus || ""
  );

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? "" : category;
    setSelectedCategory(newCategory);
    onFilterChange({
      ...currentFilters,
      category: newCategory,
    });
  };

  const handleTagChange = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFilterChange({
      ...currentFilters,
      tags: newTags,
    });
  };

  const handleGameChange = (game: string) => {
    const newGame = selectedGame === game ? "" : game;
    setSelectedGame(newGame);
    onFilterChange({
      ...currentFilters,
      gameName: newGame,
    });
  };

  const handlePriorityChange = (priority: string) => {
    const newPriority = selectedPriority === priority ? "" : priority;
    setSelectedPriority(newPriority);
    onFilterChange({
      ...currentFilters,
      priority: newPriority as "high" | "medium" | "low",
    });
  };

  const handleEventStatusChange = (status: string) => {
    const newStatus = selectedEventStatus === status ? "" : status;
    setSelectedEventStatus(newStatus);
    onFilterChange({
      ...currentFilters,
      eventStatus: newStatus as "upcoming" | "ongoing" | "ended",
    });
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedTags([]);
    setSelectedGame("");
    setSelectedPriority("");
    setSelectedEventStatus("");
    onFilterChange({});
  };

  return (
    <div className="filterSection">
      <h3 className="filterTitle">フィルター</h3>

      {/* カテゴリフィルター */}
      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>カテゴリ</h4>
        <div className="filterGroup">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filterButton ${
                selectedCategory === category.slug ? "filterButtonActive" : ""
              }`}
              onClick={() => handleCategoryChange(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* ゲームフィルター */}
      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>ゲーム</h4>
        <div className="filterGroup">
          {games.map((game) => (
            <button
              key={game}
              className={`filterButton ${
                selectedGame === game ? "filterButtonActive" : ""
              }`}
              onClick={() => handleGameChange(game)}
            >
              {game}
            </button>
          ))}
        </div>
      </div>

      {/* 重要度フィルター */}
      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>重要度</h4>
        <div className="filterGroup">
          {[
            { value: "high", label: "重要" },
            { value: "medium", label: "普通" },
            { value: "low", label: "低" },
          ].map((priority) => (
            <button
              key={priority.value}
              className={`filterButton ${
                selectedPriority === priority.value ? "filterButtonActive" : ""
              }`}
              onClick={() => handlePriorityChange(priority.value)}
            >
              {priority.label}
            </button>
          ))}
        </div>
      </div>

      {/* イベント状態フィルター */}
      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>
          イベント状態
        </h4>
        <div className="filterGroup">
          {[
            { value: "upcoming", label: "予定" },
            { value: "ongoing", label: "進行中" },
            { value: "ended", label: "終了" },
          ].map((status) => (
            <button
              key={status.value}
              className={`filterButton ${
                selectedEventStatus === status.value ? "filterButtonActive" : ""
              }`}
              onClick={() => handleEventStatusChange(status.value)}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* タグフィルター */}
      <div>
        <h4 style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>タグ</h4>
        <div className="filterGroup">
          {tags.map((tag) => (
            <button
              key={tag.id}
              className={`filterButton ${
                selectedTags.includes(tag.slug) ? "filterButtonActive" : ""
              }`}
              onClick={() => handleTagChange(tag.slug)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* フィルタークリア */}
      <button
        className="button buttonSecondary"
        onClick={clearFilters}
        style={{ marginTop: "1rem" }}
      >
        フィルターをクリア
      </button>
    </div>
  );
}
