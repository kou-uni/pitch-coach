const pptxgen = require("pptxgenjs");

// ---- Palette: Coral Energy (youthful, Z-gen pitch) ----
const NAVY = "2F3C7E";      // dominant
const NAVY_DK = "232C5C";
const CORAL = "F96167";     // accent
const GOLD = "F9E795";      // support
const INK = "1E2430";
const GRAY = "6B7280";
const LIGHT = "FFFFFF";
const TINT = "F4F5FA";      // navy tint for cards
const TINT_CORAL = "FEF0F0";

const FONT = "Yu Gothic";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "5分ピッチテンプレ";

const shadow = () => ({ type: "outer", color: "000000", blur: 6, offset: 2, angle: 45, opacity: 0.12 });

// ---- Header for content slides ----
// numCircle + VDS pill + time pill + title(placeholder)
function header(slide, num, vds, time, titleRuns) {
  // number circle
  slide.addShape(pres.shapes.OVAL, { x: 0.5, y: 0.42, w: 0.52, h: 0.52, fill: { color: CORAL } });
  slide.addText(String(num), { x: 0.5, y: 0.42, w: 0.52, h: 0.52, align: "center", valign: "middle", fontSize: 20, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
  // VDS pill
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.2, y: 0.5, w: 1.7, h: 0.36, rectRadius: 0.18, fill: { color: NAVY } });
  slide.addText(vds, { x: 1.2, y: 0.5, w: 1.7, h: 0.36, align: "center", valign: "middle", fontSize: 11, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
  // time pill
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.0, y: 0.5, w: 1.0, h: 0.36, rectRadius: 0.18, fill: { color: GOLD } });
  slide.addText(time, { x: 3.0, y: 0.5, w: 1.0, h: 0.36, align: "center", valign: "middle", fontSize: 11, bold: true, color: INK, fontFace: FONT, margin: 0 });
  // title (placeholder, conclusion-sentence style)
  slide.addText(titleRuns, { x: 0.5, y: 1.02, w: 9.0, h: 0.72, fontSize: 24, bold: true, color: INK, fontFace: FONT, margin: 0, valign: "middle" });
}

function pill(slide, x, y, w, text, fill, color) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.34, rectRadius: 0.17, fill: { color: fill } });
  slide.addText(text, { x, y, w, h: 0.34, align: "center", valign: "middle", fontSize: 10.5, bold: true, color, fontFace: FONT, margin: 0 });
}

function card(slide, x, y, w, h, fill) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, shadow: shadow() });
}

// =====================================================
// Slide 0: 使い方（テンプレの説明・割り切りルール）
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addText("5分ピッチ テンプレート", { x: 0.6, y: 0.5, w: 8.8, h: 0.7, fontSize: 32, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
  s.addText("AI・AIエージェント活用 × 新規プロダクト｜聴衆: 採用担当者（投資家目線の\"ガチ風\"で語る）", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 14, color: "C9D2F0", fontFace: FONT, margin: 0 });

  // Left: 3幕構成
  card(s, 0.6, 1.85, 4.3, 3.2, NAVY_DK);
  s.addText("ストーリーの背骨（3幕）", { x: 0.85, y: 2.05, w: 3.8, h: 0.4, fontSize: 15, bold: true, color: GOLD, fontFace: FONT, margin: 0 });
  const acts = [
    ["第1幕", "個人のバグ発見", "スライド2–3"],
    ["第2幕", "動くもので証明", "スライド4–6"],
    ["第3幕", "プロセスの再現性", "スライド7–9"],
  ];
  acts.forEach((a, i) => {
    const y = 2.55 + i * 0.82;
    s.addShape(pres.shapes.OVAL, { x: 0.9, y: y + 0.05, w: 0.45, h: 0.45, fill: { color: CORAL } });
    s.addText(String(i + 1), { x: 0.9, y: y + 0.05, w: 0.45, h: 0.45, align: "center", valign: "middle", fontSize: 16, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
    s.addText([
      { text: a[1], options: { fontSize: 15, bold: true, color: "FFFFFF", breakLine: true } },
      { text: a[0] + "｜" + a[2], options: { fontSize: 10.5, color: "C9D2F0" } },
    ], { x: 1.5, y: y - 0.05, w: 3.2, h: 0.72, fontFace: FONT, margin: 0, valign: "middle" });
  });

  // Right: 割り切りルール
  card(s, 5.1, 1.85, 4.3, 3.2, NAVY_DK);
  s.addText("割り切りルール（過度化防止）", { x: 5.35, y: 2.05, w: 3.8, h: 0.4, fontSize: 15, bold: true, color: GOLD, fontFace: FONT, margin: 0 });
  s.addText([
    { text: "数字は全体で7個まで（枚数配分: 3枚目に3個・5枚目に2個・8枚目に2個）", options: { bullet: true, breakLine: true } },
    { text: "競合比較マトリクスは作らない（6枚目は文章2行）", options: { bullet: true, breakLine: true } },
    { text: "1スライド1メッセージ。見出しは結論文で書く（体言止め禁止）", options: { bullet: true, breakLine: true } },
    { text: "デモは録画（ライブデモの失敗は5分では回収不能）", options: { bullet: true } },
  ], { x: 5.35, y: 2.5, w: 3.85, h: 2.45, fontSize: 12.5, color: "FFFFFF", fontFace: FONT, paraSpaceAfter: 8, margin: 0 });

  s.addText("価値は「削減・効率化」ではなく「できなかったことが、できるようになった」で語る。各スライドのノート欄にAI壁打ちプロンプトあり。", { x: 0.6, y: 5.15, w: 8.8, h: 0.4, fontSize: 11.5, italic: true, color: GOLD, fontFace: FONT, margin: 0 });
  s.addNotes("このスライドは発表では使わない（テンプレの説明用）。発表用は次の9枚。合計時間の目安: 300秒中260秒を使い、40秒をデモのバッファまたは質疑繰り越しに残す。\n\n【聴衆戦略】実際に来るのは採用担当者。ただし語り口は投資家向けの\"ガチ風\"を貫く。採用担当者は『この学生に新規事業・新サービスを任せられるか』という投資家的目線で見るため、事業として本気で詰めた形式そのものが人材評価の材料になる。");
}

// =====================================================
// Slide 1: タイトル + 一言価値提案（10秒）
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  pill(s, 0.6, 0.5, 1.0, "10秒", GOLD, INK);
  s.addText("【誰】が、できなかった【○○】を、できるようにする", { x: 0.6, y: 1.9, w: 8.8, h: 1.3, fontSize: 34, bold: true, color: "FFFFFF", fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  s.addText("プロダクト名【○○○○】", { x: 0.6, y: 3.3, w: 8.8, h: 0.5, fontSize: 18, color: CORAL, bold: true, fontFace: FONT, align: "center", margin: 0 });
  s.addText("氏名【○○ ○○】｜千葉工業大学【学部・学年】", { x: 0.6, y: 4.8, w: 8.8, h: 0.4, fontSize: 13, color: "C9D2F0", fontFace: FONT, align: "center", margin: 0 });
  s.addNotes("時間: 10秒。プロダクト名より価値文を大きく。読み上げるのは価値文の1文のみ。\n\n【AI壁打ちプロンプト】\n「この価値提案文、初見の人が10秒で理解できるか。専門用語・曖昧語を指摘して」");
}

// =====================================================
// Slide 2: 私が踏んだバグ（課題設定・45秒）
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 2, "課題設定", "45秒", "【私は○○のとき、○○できなくて○○だった】");
  // Left: episode area
  card(s, 0.5, 1.95, 5.7, 3.15, TINT);
  s.addText("エピソード（1つだけ・具体に）", { x: 0.75, y: 2.15, w: 5.2, h: 0.35, fontSize: 13, bold: true, color: NAVY, fontFace: FONT, margin: 0 });
  s.addText([
    { text: "いつ: 【20XX年X月、○○の場面で】", options: { bullet: true, breakLine: true } },
    { text: "何が起きた: 【具体的な出来事】", options: { bullet: true, breakLine: true } },
    { text: "どう感じた: 【そのときの感情・損失】", options: { bullet: true, breakLine: true } },
    { text: "既存手段はなぜダメだった: 【○○を試したが△△】", options: { bullet: true } },
  ], { x: 0.75, y: 2.55, w: 5.25, h: 2.4, fontSize: 13.5, color: INK, fontFace: FONT, paraSpaceAfter: 10, margin: 0 });
  // Right: photo/evidence placeholder
  card(s, 6.4, 1.95, 3.1, 3.15, TINT_CORAL);
  s.addText("【現場写真・スクショ】", { x: 6.6, y: 3.1, w: 2.7, h: 0.5, fontSize: 14, bold: true, color: CORAL, fontFace: FONT, align: "center", margin: 0 });
  s.addText("実物の証拠が1枚あると\n「等身大」が伝わる", { x: 6.6, y: 3.65, w: 2.7, h: 0.7, fontSize: 11, color: GRAY, fontFace: FONT, align: "center", margin: 0 });
  s.addNotes("時間: 45秒。Z世代の等身大＝N1顧客としての自分。日時・場面・感情まで落とす。一般論から始めない。\n\n【AI壁打ちプロンプト】\n「この原体験、聞き手が『あるある』と思う要素と『それはお前だけ』と思う要素を分けて」");
}

// =====================================================
// Slide 3: バグは私だけか？（市場性・30秒）
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 3, "市場性", "30秒", "【同じバグを踏む○○は、国内○万人いる】");
  s.addText("N1 → 一般化の一文: 【私と同じく○○な人は、○○という共通条件を持つ】", { x: 0.5, y: 1.95, w: 9.0, h: 0.45, fontSize: 14, color: INK, fontFace: FONT, margin: 0 });
  // 3 stat callouts (数字はここで3個)
  const stats = [
    ["【○万人】", "対象人数", "出典: 【統計名】"],
    ["【週○回】", "課題の発生頻度", "出典: 【調査・自分の検証】"],
    ["【○%】", "既存手段への不満率", "出典: 【アンケートn=○】"],
  ];
  stats.forEach((st, i) => {
    const x = 0.5 + i * 3.1;
    card(s, x, 2.6, 2.9, 2.35, TINT);
    s.addText(st[0], { x: x + 0.15, y: 2.85, w: 2.6, h: 0.95, valign: "middle", fontSize: 24, bold: true, color: NAVY, fontFace: FONT, align: "center", margin: 0 });
    s.addText(st[1], { x: x + 0.15, y: 3.85, w: 2.6, h: 0.4, fontSize: 13.5, bold: true, color: INK, fontFace: FONT, align: "center", margin: 0 });
    s.addText(st[2], { x: x + 0.15, y: 4.3, w: 2.6, h: 0.35, fontSize: 10, color: GRAY, fontFace: FONT, align: "center", margin: 0 });
  });
  s.addText("※ TAM/SAM/SOMの精緻化は不要。数字はこの3個で打ち止め。", { x: 0.5, y: 5.1, w: 9.0, h: 0.3, fontSize: 10.5, italic: true, color: GRAY, fontFace: FONT, margin: 0 });
  s.addNotes("時間: 30秒。N1から同じペインを持つ層への一般化。数字は3つまで、必ず出典を持つ。\n\n【AI壁打ちプロンプト】\n「このN1を一般化するとき、飛躍している論理を指摘して」");
}

// =====================================================
// Slide 4: 解決策 + デモ（顧客価値・60秒）
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 4, "顧客価値", "60秒", "【○○が、○○するだけで○○できるようにした】");
  // Left: how it works (3 steps)
  const steps = ["【ユーザーが○○する】", "【AIエージェントが○○する】", "【○○が手に入る】"];
  steps.forEach((t, i) => {
    const y = 2.05 + i * 1.0;
    s.addShape(pres.shapes.OVAL, { x: 0.55, y: y + 0.1, w: 0.5, h: 0.5, fill: { color: NAVY } });
    s.addText(String(i + 1), { x: 0.55, y: y + 0.1, w: 0.5, h: 0.5, align: "center", valign: "middle", fontSize: 16, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
    s.addText(t, { x: 1.2, y, w: 2.9, h: 0.7, fontSize: 13.5, color: INK, fontFace: FONT, valign: "middle", margin: 0 });
    if (i < 2) s.addShape(pres.shapes.LINE, { x: 0.8, y: y + 0.62, w: 0, h: 0.36, line: { color: CORAL, width: 2 } });
  });
  // Right: demo placeholder
  card(s, 4.4, 1.95, 5.1, 3.2, NAVY_DK);
  s.addShape(pres.shapes.OVAL, { x: 6.55, y: 2.75, w: 0.8, h: 0.8, fill: { color: CORAL } });
  s.addText("▶", { x: 6.55, y: 2.75, w: 0.8, h: 0.8, align: "center", valign: "middle", fontSize: 24, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
  s.addText("【デモ録画を埋め込む（30秒以内）】", { x: 4.65, y: 3.7, w: 4.6, h: 0.4, fontSize: 14, bold: true, color: "FFFFFF", fontFace: FONT, align: "center", margin: 0 });
  s.addText("「作った」の証明が学生ピッチ最大の信頼獲得手段", { x: 4.65, y: 4.15, w: 4.6, h: 0.35, fontSize: 11, color: "C9D2F0", fontFace: FONT, align: "center", margin: 0 });
  s.addNotes("時間: 60秒（うちデモ録画30秒以内）。機能一覧を語らない。バグ→解消の1本線だけ見せる。\n\n【AI壁打ちプロンプト】\n「このデモ構成、30秒で『何ができるか』が伝わるか。削るべきシーンを指摘して」");
}

// =====================================================
// Slide 5: できなかったこと → できること（顧客価値・30秒）
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 5, "顧客価値", "30秒", "【今まで○○できなかった人が、○○できるようになる】");
  // 今までの世界
  card(s, 0.5, 2.0, 4.2, 2.9, TINT);
  s.addText("今までの世界", { x: 0.75, y: 2.2, w: 3.7, h: 0.4, fontSize: 14, bold: true, color: GRAY, fontFace: FONT, margin: 0 });
  s.addText("【○○は不可能だった／\n諦めるしかなかった】", { x: 0.75, y: 2.75, w: 3.7, h: 1.1, fontSize: 20, bold: true, color: GRAY, fontFace: FONT, margin: 0 });
  s.addText("【選択肢すら無かった理由を一文で】", { x: 0.75, y: 4.0, w: 3.7, h: 0.7, fontSize: 12.5, color: GRAY, fontFace: FONT, margin: 0 });
  // Arrow
  s.addText("→", { x: 4.65, y: 3.1, w: 0.7, h: 0.7, fontSize: 32, bold: true, color: CORAL, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  // これからの世界
  card(s, 5.3, 2.0, 4.2, 2.9, TINT_CORAL);
  s.addText("これからの世界", { x: 5.55, y: 2.2, w: 3.7, h: 0.4, fontSize: 14, bold: true, color: CORAL, fontFace: FONT, margin: 0 });
  s.addText("【○○が、誰でも\nできるようになる】", { x: 5.55, y: 2.75, w: 3.7, h: 1.1, fontSize: 20, bold: true, color: CORAL, fontFace: FONT, margin: 0 });
  s.addText("【新しく生まれる行動・体験を一文で】", { x: 5.55, y: 4.0, w: 3.7, h: 0.7, fontSize: 12.5, color: INK, fontFace: FONT, margin: 0 });
  s.addText("※「削減・効率化」で語らない。数字を使うなら「新しくできたことの回数・人数」で2個まで。", { x: 0.5, y: 5.05, w: 9.0, h: 0.3, fontSize: 10.5, italic: true, color: GRAY, fontFace: FONT, margin: 0 });
  s.addNotes("時間: 30秒。コスト削減で語るとジリ貧の話に聞こえる。ゼロ→イチの創出で語る: 諦めていた人・そもそも参加できなかった人が、新しい行動を取れるようになった事実を示す。実測（自分や初期ユーザーの記録）が理想。\\n\\n【AI壁打ちプロンプト】\\n「この価値、時短・コスト削減の言い換えになっていないか。このプロダクトでゼロから生まれた行動・体験は何か、厳しめに指摘して」");
}

// =====================================================
// Slide 6: なぜ他ではなく私たちか（競争優位性・30秒）
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 6, "競争優位性", "30秒", "【○○の当事者は私で、○日で○回作り直せるのも私だ】");
  // formula: 当事者性 × 検証速度
  card(s, 0.5, 2.1, 4.2, 2.5, TINT);
  s.addText("N1当事者性", { x: 0.75, y: 2.3, w: 3.7, h: 0.5, fontSize: 18, bold: true, color: NAVY, fontFace: FONT, margin: 0 });
  s.addText("【私自身が毎日この課題の中にいるので、解像度で大企業に負けない、という根拠を2行で】", { x: 0.75, y: 2.85, w: 3.7, h: 1.5, fontSize: 12.5, color: INK, fontFace: FONT, margin: 0 });
  s.addText("×", { x: 4.65, y: 3.0, w: 0.7, h: 0.7, fontSize: 30, bold: true, color: CORAL, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  card(s, 5.3, 2.1, 4.2, 2.5, TINT);
  s.addText("検証速度", { x: 5.55, y: 2.3, w: 3.7, h: 0.5, fontSize: 18, bold: true, color: NAVY, fontFace: FONT, margin: 0 });
  s.addText("【AIエージェントで○日ごとに作り直せる。ユーザーの声→改修のループの速さを2行で】", { x: 5.55, y: 2.85, w: 3.7, h: 1.5, fontSize: 12.5, color: INK, fontFace: FONT, margin: 0 });
  s.addText("※ 機能の差で語らない。競合比較マトリクスは作らない。", { x: 0.5, y: 4.85, w: 9.0, h: 0.3, fontSize: 10.5, italic: true, color: GRAY, fontFace: FONT, margin: 0 });
  s.addNotes("時間: 30秒。学生に技術的護城河はないと割り切る。真似されにくさ＝当事者の解像度×イテレーション速度。\n\n【AI壁打ちプロンプト】\n「大企業が明日同じものを作ったら、それでも私が勝てる理由を反証込みで」");
}

// =====================================================
// Slide 7: どう作ったか（実現可能性・45秒）
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 7, "実現可能性", "45秒", "【エージェント○体を使い、○週間で作った】");
  // Left: architecture diagram placeholder
  card(s, 0.5, 1.95, 5.4, 3.15, TINT);
  s.addText("【AIエージェント活用の設計図（図1枚）】", { x: 0.75, y: 3.1, w: 4.9, h: 0.5, fontSize: 14, bold: true, color: NAVY, fontFace: FONT, align: "center", margin: 0 });
  s.addText("例: 要件整理 → コード生成 → テスト → デプロイ\nどの工程を・どのエージェントに・どう任せたか", { x: 0.75, y: 3.65, w: 4.9, h: 0.75, fontSize: 11, color: GRAY, fontFace: FONT, align: "center", margin: 0 });
  // Right: 3 process stats (数字カウント外: プロセス指標として扱う)
  const pstats = [
    ["開発期間", "【○週間】"],
    ["イテレーション", "【○回】"],
    ["自分で書いたコード比率", "【○%】"],
  ];
  pstats.forEach((p, i) => {
    const y = 1.95 + i * 1.08;
    card(s, 6.1, y, 3.4, 0.92, TINT_CORAL);
    s.addText(p[0], { x: 6.3, y: y + 0.1, w: 3.0, h: 0.32, fontSize: 11, bold: true, color: GRAY, fontFace: FONT, margin: 0 });
    s.addText(p[1], { x: 6.3, y: y + 0.4, w: 3.0, h: 0.45, fontSize: 19, bold: true, color: CORAL, fontFace: FONT, margin: 0 });
  });
  s.addNotes("時間: 45秒。採用担当者に最も刺さるスライド。「入社後も同じ生産性を再現できる」と読ませる。人に任せず設計を自分でやったことを示す。\n\n【AI壁打ちプロンプト】\n「この開発プロセス図、採用担当者が『再現性がある』と感じる要素と、運任せに見える要素を分けて」");
}

// =====================================================
// Slide 8: お金の流れ（収益性・20秒）
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 8, "収益性", "20秒", "【○○が、○○のために、月○円払う】");
  // formula box
  card(s, 1.4, 2.3, 7.2, 1.7, TINT);
  s.addText([
    { text: "【単価 ○円】", options: { color: NAVY, bold: true } },
    { text: "  ×  ", options: { color: CORAL, bold: true } },
    { text: "【想定件数 ○件】", options: { color: NAVY, bold: true } },
    { text: "  =  ", options: { color: CORAL, bold: true } },
    { text: "【月商 ○円】", options: { color: CORAL, bold: true } },
  ], { x: 1.6, y: 2.55, w: 6.8, h: 0.9, fontSize: 19, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  s.addText("根拠: 【新しくできるようになる○○に、顧客が感じる価値】", { x: 1.6, y: 3.5, w: 6.8, h: 0.4, fontSize: 12.5, color: GRAY, fontFace: FONT, align: "center", margin: 0 });
  s.addText("※ 3カ年の事業計画表は不要。この1式のみ。数字はここで2個。", { x: 0.5, y: 4.5, w: 9.0, h: 0.3, fontSize: 10.5, italic: true, color: GRAY, fontFace: FONT, margin: 0 });
  s.addNotes("時間: 20秒。「誰が・いくら・何に払うか」を1文＋概算1式で言い切る。\n\n【AI壁打ちプロンプト】\n「この価格設定で顧客が払わない理由を3つ挙げて」");
}

// =====================================================
// Slide 9: 挑戦は続く（30秒）
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  pill(s, 0.6, 0.5, 1.0, "30秒", GOLD, INK);
  s.addText("【○○が当たり前になる世界まで、挑戦を続ける】", { x: 0.6, y: 1.0, w: 8.8, h: 0.7, fontSize: 26, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
  // 3-step roadmap
  const steps9 = [
    ["次の○週間", "【○○という仮説を、○○の方法で検証する】"],
    ["次の1年", "【○○人に届ける／○○の領域へ広げる】"],
    ["その先", "新しい「できなかった」を見つけて、また作る"],
  ];
  steps9.forEach((p, i) => {
    const x = 0.6 + i * 3.0;
    card(s, x, 2.0, 2.8, 2.6, NAVY_DK);
    s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: 2.25, w: 0.45, h: 0.45, fill: { color: CORAL } });
    s.addText(String(i + 1), { x: x + 0.25, y: 2.25, w: 0.45, h: 0.45, align: "center", valign: "middle", fontSize: 15, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
    s.addText(p[0], { x: x + 0.85, y: 2.28, w: 1.85, h: 0.42, fontSize: 14, bold: true, color: GOLD, fontFace: FONT, valign: "middle", margin: 0 });
    s.addText(p[1], { x: x + 0.25, y: 2.95, w: 2.35, h: 1.5, fontSize: 12.5, color: "FFFFFF", fontFace: FONT, margin: 0 });
    if (i < 2) s.addText("→", { x: x + 2.72, y: 3.05, w: 0.36, h: 0.5, fontSize: 18, bold: true, color: CORAL, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  });
  s.addText("連絡先: 【メール / GitHub / ポートフォリオURL】", { x: 0.6, y: 5.0, w: 8.8, h: 0.35, fontSize: 12, color: "C9D2F0", fontFace: FONT, margin: 0 });
  s.addNotes("時間: 30秒。聞き手への直接の依頼はしない。挑戦の継続宣言で締めることで、投資家目線の聞き手には『次の検証計画がある＝事業の継続性』、採用担当者には『入社後も同じループを回し続ける人材』と読ませる。3つ目のカード（新しい『できなかった』を見つけて、また作る）は固定文言＝スライド2のバグ発見に戻る円環構造。連絡先を明示しておけばAskなしでも接点は成立する。\\n\\n【AI壁打ちプロンプト】\\n「この将来ビジョン、大言壮語に聞こえる箇所と、根拠のある野心に聞こえる箇所を分けて」");
}

pres.writeFile({ fileName: "5分ピッチテンプレ.pptx" }).then(() => console.log("done"));
