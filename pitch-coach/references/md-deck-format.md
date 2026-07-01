# MDデッキ仕様（Phase 6〜7用）

スライドの一次成果物はPPTXではなく**Marp互換のMarkdownデッキ**。理由: (1) 対話で確定した文章をそのままレビューできる、(2) VS CodeのMarp拡張やmarp-cliでそのままスライドとして投影・発表できる、(3) PPTXが必要になったときの原稿として流用できる。PPTXは「任意の最終工程」に格下げする。

## ファイルと書式

`assets/slides_template.md` を作業ディレクトリに `slides.md` としてコピーし、【】を対話の確定内容で差し替える。文体・分量の基準は `assets/slides_sample_moraeru.md`。

書式ルール:
- 冒頭のYAMLフロントマター（`marp: true`、`style:` ブロック）は削除・変更しない。配色（NAVY 2F3C7E / CORAL F96167 / GOLD F9E795）はPPTX版と共通のブランド
- スライド区切りは `---`。9枚構成・順序は固定
- S1とS9は `<!-- _class: dark -->` でネイビー背景
- 各スライド末尾の `<!-- 【話す（○秒）】 ... -->` コメントが発表者ノート。Marpのプレゼンターモードで表示され、通常のMDビューでは折りたたまれず原稿として読める。受講生の一人称・対話で使った言葉で書く
- 見出しは結論文（体言止め禁止）。1枚に本文は5行以内を目安。MDで長いものはPPTXでも入らない

## 発表・変換の4ルート（受講生に選ばせる）

1. **HTMLビュー（インストール不要・一番"見えやすい"／最推奨）**: `node assets/build_slides_html.mjs slides.md slides.html` を実行し、生成された `slides.html` をブラウザで開くだけ。ブランド配色（NAVY/CORAL/GOLD）・`← →`/Space/クリックで移動・`n`=発表者ノート・`o`=一覧・`f`=全画面・数字ジャンプつき。**npm も拡張もネットも不要**（Node標準のみ）。生HTML(span/br)とMDテーブルも忠実に描画するのでレイアウトが崩れない。授業内の投影・共有・レビューはこれが最短
2. **MDのまま発表**: VS Code + Marp for VS Code拡張でプレビューをフルスクリーン投影。拡張が既に入っているなら変換ゼロ
3. **HTML/PDF化（Marp標準）**: `npx @marp-team/marp-cli slides.md -o slides.html`（PDFは `--pdf`、要Chrome系ブラウザ）。Marp標準テーマで提出したい場合
4. **PPTX化**: 学外提出や上位審査など「PowerPointファイルそのもの」が求められる場合のみ。`references/deck-spec.md` を読み、`assets/deck_template.js` に slides.md の内容を移植して生成する。marp-cliの `--pptx` は画像貼り付けPPTXになり編集不能なので、編集可能なPPTXが要る場合は必ずdeck_template.js経由で作る

> 迷ったら**ルート1（HTMLビュー）**。`build_slides_html.mjs` は `slides.md` を単一ソースに再生成するだけなので、MDを直せばHTMLも作り直すだけ。二重メンテにならない。

## Phase 6での運用

1. slides.md を1枚ずつ埋め、都度受講生のOKを取る（新情報を勝手に足さない）
2. 全枚確定したら「これがプレ完成版」。`node assets/build_slides_html.mjs slides.md slides.html` でHTMLビューを生成し、ブラウザで通し確認するよう促す（インストール不要で一番手軽）。Marp拡張があるならそれでも可
3. 通しレビューで直しが出たらMD上で修正。**PPTXを先に作らない**——修正コストが桁違いに安いのはMDの段階
4. 受講生が「これで発表する」と言えばPhase 7（PPTX化）はスキップしてPhase 8（アクションリスト）へ進んでよい

## 注意

- Marp未導入の環境でも slides.md は普通のMarkdownとして読める（発表者ノートはコメントなので邪魔しない）。導入は `npm i -g @marp-team/marp-cli` またはVS Code拡張のみ
- 表（テーブル）はMarpでの見た目が崩れやすいので、列は3列まで・セル内は短文に保つ
- デモ録画はMDに埋め込めない。発表時は「▶ デモ録画」の箇所で動画ファイルを別ウィンドウ再生する段取りをアクションリストに含める（PPTX版なら埋め込み可——これがPPTX化を選ぶ主な理由になる）
