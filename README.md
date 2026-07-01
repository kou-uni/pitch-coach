# pitch-coach — 5分ピッチ・コーチ（Claude Code スキル）

千葉工業大学 web3/AI概論の受講生が、自分で作ったプロダクトを大企業の採用担当者に「投資家目線のガチ風」で5分ピッチする——その準備を **Claude Code と対話しながら** 自律的に仕上げるためのスキル。

- N1原体験（自分が踏んだバグ）の深掘り
- VDS（バリューデザインシンタックス）に沿った9枚構成
- 「削減」でなく「できなかった→できる」の創出型ストーリー
- **一次成果物は Marp 互換の Markdown デッキ**（レビュー原稿＝そのまま投影できるスライド）。PPTX は任意の最終工程
- 発表当日の準備アクション（デモ録画・スクショ・裏取り）まで提示

## 中身
```
pitch-coach/
  SKILL.md                       … 本体（トリガー・原則・設計思想）
  references/
    coaching-phases.md           … Phase 0〜8 の質問手順・合格基準・アドオン
    md-deck-format.md            … Marp MDデッキ仕様・発表/変換の3ルート
    deck-spec.md                 … PPTX生成の仕様・落とし穴・チェック
  assets/
    slides_template.md           … Marp MDデッキ テンプレ（一次成果物）
    slides_sample_moraeru.md     … Marp MD 完成サンプル「モラエル」
    deck_template.js             … PPTX生成テンプレ（任意）
    deck_sample_moraeru.js       … PPTX 完成サンプル（任意）
```

## ワークフロー（MD-first）
対話（Phase 0〜8）→ **Phase 6 で `slides.md`（Marp MD）を完成** → 確認 → 必要なら PPTX。
発表は3ルートから選択：
1. **MDのまま投影**（VS Code + Marp 拡張）＝授業内発表はこれで十分
2. **HTML/PDF**（`npx @marp-team/marp-cli slides.md -o slides.html`）＝配布・提出
3. **編集可能なPPTX**（`deck_template.js` 経由）＝学外提出・上位審査のみ

## 使い方 A：Claude Code（受講生向け・推奨）
空のフォルダで `claude` を起動し、**配布プロンプト**を貼るだけ。プロンプトがこのリポジトリからスキルを取得して `.claude/skills/pitch-coach/` に設置し、Phase 0 から対話を始めます。手動なら：
```bash
git clone --depth 1 https://github.com/kou-uni/pitch-coach /tmp/pitch-coach-src \
  && mkdir -p .claude/skills \
  && cp -r /tmp/pitch-coach-src/pitch-coach .claude/skills/pitch-coach
# 起動して「ピッチを作りたい」と言えば開始
```

## 使い方 B：claude.ai（Web/アプリ）
`.skill`（このリポジトリを zip 化したもの）をアップロードして「カスタマイズ > スキル」から利用。

## 必要なもの
- MD投影：VS Code + Marp for VS Code 拡張（変換ゼロ）
- HTML/PDF：`npx @marp-team/marp-cli`（PDFはChrome系）
- PPTX（任意）：`npm install pptxgenjs`（Phase 7 で自動案内）

---
配布物3点セット推奨：**このスキル**＋**MDテンプレ（slides_template.md）**＋**サンプル（モラエル）**。
サンプルを先に見せてから配ると、受講生が完成イメージを持って対話に入れます。
