# 攻略記事（guides）スキーマ設定

## 基本フィールド

- **title** (テキストフィールド) - 記事タイトル
- **game** (コンテンツ参照フィールド) - 対象ゲーム（games）
- **character** (コンテンツ参照フィールド) - 対象キャラクター（characters、オプション）
- **content** (リッチエディタ) - 記事本文
- **thumbnail** (画像フィールド) - サムネイル画像
- **featuredImage** (画像フィールド) - メイン画像

## 記事分類

- **category** (セレクトフィールド) - カテゴリ（キャラクター攻略、イベント攻略、システム解説、初心者向け等）
- **difficulty** (セレクトフィールド) - 対象レベル（初心者、中級者、上級者）
- **guideType** (セレクトフィールド) - 攻略タイプ（キャラクター、イベント、システム、育成、パーティ編成等）
- **tags** (テキストフィールド) - タグ

## 攻略情報

- **targetLevel** (数値フィールド) - 対象レベル
- **requiredItems** (テキストエリア) - 必要なアイテム
- **estimatedTime** (テキストフィールド) - 攻略時間
- **difficultyRating** (数値フィールド) - 難易度評価（1-5）
- **successRate** (数値フィールド) - 成功率（%）

## 実用的な情報

- **quickTips** (テキストエリア) - 簡単なコツ
- **commonMistakes** (テキストエリア) - よくある間違い
- **alternativeStrategies** (テキストエリア) - 代替戦略
- **videoGuide** (URL フィールド) - 動画ガイド URL
- **relatedGuides** (コンテンツ参照フィールド) - 関連記事

## メタ情報

- **author** (テキストフィールド) - 執筆者
- **publishDate** (日時フィールド) - 公開日
- **lastUpdated** (日時フィールド) - 最終更新日
- **isFeatured** (真偽値フィールド) - おすすめ記事かどうか
- **isPremium** (真偽値フィールド) - プレミアム記事かどうか
- **viewCount** (数値フィールド) - 閲覧数
- **rating** (数値フィールド) - 評価（1-5）
- **createdAt** (自動生成)
- **updatedAt** (自動生成)
- **publishedAt** (自動生成)
- **revisedAt** (自動生成)
