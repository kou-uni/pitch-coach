# pitch-coach — 5分ピッチ・コーチ（Claude Code スキル）

千葉工業大学 web3/AI概論の受講生が、自分で作ったプロダクトを大企業の採用担当者に「投資家目線のガチ風」で5分ピッチする——その準備を **Claude Code と対話しながら** 自律的に仕上げるためのスキル。

- N1原体験（自分が踏んだバグ）の深掘り
- VDS（バリューデザインシンタックス）に沿った9枚構成
- 「削減」でなく「できなかった→できる」の創出型ストーリー
- PPTX（および今後 Marp MD）デッキ生成 + 発表当日の準備アクション提示

## 中身
```
pitch-coach/
  SKILL.md                     … 本体（トリガー・原則・設計思想）
  references/
    coaching-phases.md         … Phase 0〜8 の質問手順・合格基準・アドオン
    deck-spec.md               … デザイン仕様・生成の落とし穴・チェック
  assets/
    deck_template.js           … デッキ生成テンプレ（プレースホルダ版）
    deck_sample_moraeru.js     … 完成サンプル「モラエル」（給付型奨学金マッチング）
```

## 使い方 A：Claude Code（受講生向け・推奨）
空のフォルダで `claude` を起動し、**配布プロンプト**を貼るだけ。プロンプトがこのリポジトリからスキルを取得して `.claude/skills/pitch-coach/` に設置し、Phase 0 から対話を始めます。手動で入れる場合：
```bash
git clone --depth 1 https://github.com/kou-uni/pitch-coach /tmp/pitch-coach-src \
  && mkdir -p .claude/skills \
  && cp -r /tmp/pitch-coach-src/pitch-coach .claude/skills/pitch-coach
# 起動して「ピッチを作りたい」と言えば開始
```

## 使い方 B：claude.ai（Web/アプリ）
`.skill`（このリポジトリを zip 化したもの）をアップロードして「カスタマイズ > スキル」から利用。

## 生成に必要なもの
- PPTX 生成時：`npm install pptxgenjs`（Phase 7 で自動案内）
- ネットワークで npm が使えるか、初回のみ要確認

---
配布物3点セット推奨：**このスキル**＋**テンプレPPTX**＋**サンプル（モラエル）**。
サンプルを先に見せてから配ると、受講生が完成イメージを持って対話に入れます。
