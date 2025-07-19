# キャラクター（characters）スキーマ設定

## 基本フィールド

- **characterName** (テキストフィールド) - キャラクター名
- **game** (コンテンツ参照フィールド) - 所属ゲーム（games）
- **characterImage** (画像フィールド) - キャラクター画像
- **rarity** (セレクトフィールド) - レアリティ（N、R、SR、SSR、UR 等）
- **element** (セレクトフィールド) - 属性（火、水、風、雷、氷、岩、草等）
- **weaponType** (セレクトフィールド) - 武器タイプ（剣、弓、槍、法書、大剣等）
- **role** (セレクトフィールド) - 役割（DPS、サポート、タンク、ヒーラー等）

## ステータス情報

- **baseHP** (数値フィールド) - 基礎 HP
- **baseATK** (数値フィールド) - 基礎攻撃力
- **baseDEF** (数値フィールド) - 基礎防御力
- **maxHP** (数値フィールド) - 最大 HP
- **maxATK** (数値フィールド) - 最大攻撃力
- **maxDEF** (数値フィールド) - 最大防御力

## スキル情報

- **normalAttack** (テキストエリア) - 通常攻撃の説明
- **skill1** (テキストエリア) - スキル 1 の説明
- **skill2** (テキストエリア) - スキル 2 の説明
- **ultimateSkill** (テキストエリア) - 必殺技の説明
- **passiveSkill** (テキストエリア) - パッシブスキルの説明

## 攻略情報

- **strengths** (テキストエリア) - キャラクターの強み
- **weaknesses** (テキストエリア) - キャラクターの弱点
- **recommendedWeapons** (テキストエリア) - おすすめ武器
- **recommendedArtifacts** (テキストエリア) - おすすめ聖遺物/装備
- **teamCompositions** (テキストエリア) - おすすめパーティ編成
- **usageTips** (テキストエリア) - 使い方のコツ
- **combatTips** (テキストエリア) - 戦闘での使い方

## 育成情報

- **ascensionMaterials** (テキストエリア) - 突破素材
- **talentMaterials** (テキストエリア) - 天賦素材
- **priorityLevel** (セレクトフィールド) - 育成優先度（高、中、低）
- **difficulty** (セレクトフィールド) - 使いこなし難易度（簡単、普通、難しい）

## メタ情報

- **isReleased** (真偽値フィールド) - 実装済みかどうか
- **releaseDate** (日時フィールド) - 実装日
- **tags** (テキストフィールド) - タグ
- **createdAt** (自動生成)
- **updatedAt** (自動生成)
- **publishedAt** (自動生成)
- **revisedAt** (自動生成)
