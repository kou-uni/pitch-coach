const pptxgen = require("pptxgenjs");

const NAVY = "2F3C7E";
const NAVY_DK = "232C5C";
const CORAL = "F96167";
const GOLD = "F9E795";
const INK = "1E2430";
const GRAY = "6B7280";
const LIGHT = "FFFFFF";
const TINT = "F4F5FA";
const TINT_CORAL = "FEF0F0";
const FONT = "Yu Gothic";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "モラエル 5分ピッチ（サンプル）";

const shadow = () => ({ type: "outer", color: "000000", blur: 6, offset: 2, angle: 45, opacity: 0.12 });

function header(slide, num, vds, time, titleText) {
  slide.addShape(pres.shapes.OVAL, { x: 0.5, y: 0.42, w: 0.52, h: 0.52, fill: { color: CORAL } });
  slide.addText(String(num), { x: 0.5, y: 0.42, w: 0.52, h: 0.52, align: "center", valign: "middle", fontSize: 20, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.2, y: 0.5, w: 1.7, h: 0.36, rectRadius: 0.18, fill: { color: NAVY } });
  slide.addText(vds, { x: 1.2, y: 0.5, w: 1.7, h: 0.36, align: "center", valign: "middle", fontSize: 11, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.0, y: 0.5, w: 1.0, h: 0.36, rectRadius: 0.18, fill: { color: GOLD } });
  slide.addText(time, { x: 3.0, y: 0.5, w: 1.0, h: 0.36, align: "center", valign: "middle", fontSize: 11, bold: true, color: INK, fontFace: FONT, margin: 0 });
  slide.addText(titleText, { x: 0.5, y: 1.02, w: 9.0, h: 0.72, fontSize: 24, bold: true, color: INK, fontFace: FONT, margin: 0, valign: "middle" });
}

function pill(slide, x, y, w, text, fill, color) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.34, rectRadius: 0.17, fill: { color: fill } });
  slide.addText(text, { x, y, w, h: 0.34, align: "center", valign: "middle", fontSize: 10.5, bold: true, color, fontFace: FONT, margin: 0 });
}

function card(slide, x, y, w, h, fill) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, shadow: shadow() });
}

// ============ 1. タイトル（10秒） ============
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  pill(s, 0.6, 0.5, 1.0, "10秒", GOLD, INK);
  s.addText("学生が、出会えなかった\n「もらえる奨学金」に出会えるようにする", { x: 0.6, y: 1.8, w: 8.8, h: 1.5, fontSize: 32, bold: true, color: "FFFFFF", fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  s.addText("モラエル（β）", { x: 0.6, y: 3.5, w: 8.8, h: 0.5, fontSize: 20, color: CORAL, bold: true, fontFace: FONT, align: "center", margin: 0 });
  s.addText("佐藤 悠｜千葉工業大学 情報変革科学部 3年", { x: 0.6, y: 4.8, w: 8.8, h: 0.4, fontSize: 13, color: "C9D2F0", fontFace: FONT, align: "center", margin: 0 });
  s.addNotes("【話す（10秒）】\n「学生が、出会えなかった『もらえる奨学金』に出会えるようにする。モラエルの佐藤です。」\n\n※プロダクト名の説明はしない。価値文だけ言って次へ。");
}

// ============ 2. 課題設定（45秒） ============
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 2, "課題設定", "45秒", "締切の2日後、月5万円・返済不要の奨学金を知った");
  card(s, 0.5, 1.95, 5.7, 3.15, TINT);
  s.addText("2025年10月、3年の秋", { x: 0.75, y: 2.15, w: 5.2, h: 0.35, fontSize: 13, bold: true, color: NAVY, fontFace: FONT, margin: 0 });
  s.addText([
    { text: "交換留学の費用が足りず、諦めかけてバイトを週4に増やした", options: { bullet: true, breakLine: true } },
    { text: "友人から「あの財団、佐藤も対象だったのに」と聞いたのは、応募締切の2日後だった", options: { bullet: true, breakLine: true } },
    { text: "借りた奨学金はこれから15年かけて返す。もらえたはずのお金は、知らないまま消えた", options: { bullet: true, breakLine: true } },
    { text: "大学の掲示板も検索サイトも見ていた。でも「自分が対象か」は、財団ごとのPDFを全部読むしかなかった", options: { bullet: true } },
  ], { x: 0.75, y: 2.55, w: 5.25, h: 2.45, fontSize: 12.5, color: INK, fontFace: FONT, paraSpaceAfter: 8, margin: 0 });
  card(s, 6.4, 1.95, 3.1, 3.15, TINT_CORAL);
  s.addText("逃した給付型", { x: 6.6, y: 2.25, w: 2.7, h: 0.4, fontSize: 13, bold: true, color: GRAY, fontFace: FONT, align: "center", margin: 0 });
  s.addText("月5万円", { x: 6.6, y: 2.8, w: 2.7, h: 0.7, fontSize: 34, bold: true, color: CORAL, fontFace: FONT, align: "center", margin: 0 });
  s.addText("返済不要", { x: 6.6, y: 3.55, w: 2.7, h: 0.45, fontSize: 18, bold: true, color: CORAL, fontFace: FONT, align: "center", margin: 0 });
  s.addText("締切: 気づいた2日前に終了", { x: 6.6, y: 4.15, w: 2.7, h: 0.4, fontSize: 11, color: GRAY, fontFace: FONT, align: "center", margin: 0 });
  s.addNotes("【話す（45秒）】\n「去年の10月、交換留学の費用が足りなくて、諦めかけてバイトを週4に増やしました。そんなとき友人から『あの財団、佐藤も対象だったのに』と聞きました。応募締切の2日後でした。月5万円、返済不要。借りた奨学金はこれから15年かけて返すのに、もらえたはずのお金は知らないまま消えた。悔しかったのは、私は探していたんです。掲示板も検索サイトも見ていた。でも『自分が対象か』は、財団ごとのPDFを全部読むしかなかった。」\n\n※感情の起伏はこのスライドだけ。次から淡々と。");
}

// ============ 3. 市場性（30秒） ============
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 3, "市場性", "30秒", "8,834制度あるのに、届いているのは6.5%");
  s.addText("これは私の不注意ではなく情報構造の問題。「探しに行ける人」しか救われない仕組みになっている。", { x: 0.5, y: 1.95, w: 9.0, h: 0.45, fontSize: 14, color: INK, fontFace: FONT, margin: 0 });
  const stats = [
    ["55%", "大学生の奨学金受給率\n（2人に1人が当事者）", "出典: JASSO 令和4年度学生生活調査"],
    ["8,834", "JASSO以外の奨学金制度数\n（財団・自治体・大学）", "出典: JASSO 令和元年度奨学事業実態調査"],
    ["6.5%", "民間の給付型を\n受け取れている学生", "出典: ガクシー 奨学金実態調査2023"],
  ];
  stats.forEach((st, i) => {
    const x = 0.5 + i * 3.1;
    card(s, x, 2.6, 2.9, 2.35, TINT);
    s.addText(st[0], { x: x + 0.15, y: 2.8, w: 2.6, h: 0.85, valign: "middle", fontSize: 36, bold: true, color: NAVY, fontFace: FONT, align: "center", margin: 0 });
    s.addText(st[1], { x: x + 0.15, y: 3.7, w: 2.6, h: 0.7, fontSize: 12, bold: true, color: INK, fontFace: FONT, align: "center", margin: 0 });
    s.addText(st[2], { x: x + 0.15, y: 4.45, w: 2.6, h: 0.4, fontSize: 8.5, color: GRAY, fontFace: FONT, align: "center", margin: 0 });
  });
  s.addNotes("【話す（30秒）】\n「これは私の不注意の話ではありません。大学生の2人に1人が奨学金の当事者です。JASSO以外に8,834の奨学金制度があるのに、民間の給付型を受け取れている学生は6.5%しかいない。8,834あって6.5%。探しに行ける人しか救われない情報構造そのものが課題です。」\n\n※数字はこの3つだけ。TAM/SAMの話はしない。聞かれたら答える。");
}

// ============ 4. 顧客価値: 解決策+デモ（60秒） ============
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 4, "顧客価値", "60秒", "応募できる給付型が、向こうから届くようにした");
  const steps = ["学生はプロフィールを一度だけ入力（学部・学年・居住地・家計区分）", "エージェントが財団サイトと大学掲示PDFを毎晩巡回し、応募要件を構造化", "対象の給付型と締切が、通知で届く"];
  steps.forEach((t, i) => {
    const y = 2.05 + i * 1.0;
    s.addShape(pres.shapes.OVAL, { x: 0.55, y: y + 0.1, w: 0.5, h: 0.5, fill: { color: NAVY } });
    s.addText(String(i + 1), { x: 0.55, y: y + 0.1, w: 0.5, h: 0.5, align: "center", valign: "middle", fontSize: 16, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
    s.addText(t, { x: 1.2, y, w: 2.95, h: 0.85, fontSize: 12, color: INK, fontFace: FONT, valign: "middle", margin: 0 });
    if (i < 2) s.addShape(pres.shapes.LINE, { x: 0.8, y: y + 0.62, w: 0, h: 0.36, line: { color: CORAL, width: 2 } });
  });
  card(s, 4.4, 1.95, 5.1, 3.2, NAVY_DK);
  s.addShape(pres.shapes.OVAL, { x: 6.55, y: 2.7, w: 0.8, h: 0.8, fill: { color: CORAL } });
  s.addText("▶", { x: 6.55, y: 2.7, w: 0.8, h: 0.8, align: "center", valign: "middle", fontSize: 24, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
  s.addText("デモ録画（28秒）", { x: 4.65, y: 3.65, w: 4.6, h: 0.4, fontSize: 14, bold: true, color: "FFFFFF", fontFace: FONT, align: "center", margin: 0 });
  s.addText("プロフィール入力 → 対象の給付型一覧 → 締切リマインド設定", { x: 4.65, y: 4.1, w: 4.6, h: 0.35, fontSize: 11, color: "C9D2F0", fontFace: FONT, align: "center", margin: 0 });
  s.addNotes("【話す（60秒・うちデモ28秒）】\n「作ったのがモラエルです。学生がやることは一つだけ、プロフィールを一度入力する。あとはエージェントが財団サイトと大学の掲示PDFを毎晩巡回して、応募要件を構造化し、あなたが対象の給付型だけを締切つきで届けます。実物をご覧ください。」\n（デモ再生28秒: 入力→一覧→リマインド設定）\n「探すのではなく、届く。これが機能のすべてです。」\n\n※機能一覧は語らない。1本線だけ。");
}

// ============ 5. 顧客価値: できなかった→できる（30秒） ============
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 5, "顧客価値", "30秒", "探せなかった学生が、もらえる奨学金に出会える");
  card(s, 0.5, 2.0, 4.2, 2.9, TINT);
  s.addText("今までの世界", { x: 0.75, y: 2.2, w: 3.7, h: 0.4, fontSize: 14, bold: true, color: GRAY, fontFace: FONT, margin: 0 });
  s.addText("数千のPDFを全部読むのは\n人間には不可能だった", { x: 0.75, y: 2.75, w: 3.7, h: 1.1, fontSize: 18, bold: true, color: GRAY, fontFace: FONT, margin: 0 });
  s.addText("知らないお金は、無いのと同じ。諦めが「選択」にすらならなかった。", { x: 0.75, y: 4.0, w: 3.7, h: 0.7, fontSize: 12, color: GRAY, fontFace: FONT, margin: 0 });
  s.addText("→", { x: 4.65, y: 3.1, w: 0.7, h: 0.7, fontSize: 32, bold: true, color: CORAL, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  card(s, 5.3, 2.0, 4.2, 2.9, TINT_CORAL);
  s.addText("これからの世界", { x: 5.55, y: 2.2, w: 3.7, h: 0.4, fontSize: 14, bold: true, color: CORAL, fontFace: FONT, margin: 0 });
  s.addText("「探す」をやめても、\n出会える", { x: 5.55, y: 2.75, w: 3.7, h: 1.1, fontSize: 18, bold: true, color: CORAL, fontFace: FONT, margin: 0 });
  s.addText("締切から逆算して応募準備を始める、という新しい行動が生まれた。留学や進学を、お金の前に置ける。", { x: 5.55, y: 4.0, w: 3.7, h: 0.8, fontSize: 12, color: INK, fontFace: FONT, margin: 0 });
  s.addText("β検証: 友人42人が利用。1人平均8件の「知らなかった給付型」がヒット。", { x: 0.5, y: 5.05, w: 9.0, h: 0.3, fontSize: 11, italic: true, color: CORAL, fontFace: FONT, margin: 0 });
  s.addNotes("【話す（30秒）】\n「これは時短ツールではありません。数千のPDFを全部読むのは、そもそも人間には不可能でした。知らないお金は無いのと同じで、諦めが選択にすらならなかった。モラエルの後では、探すのをやめても出会えます。友人42人のβ検証では、1人平均8件の『知らなかった給付型』が見つかりました。42人の中には、それで留学の応募を決めた友人がいます。」");
}

// ============ 6. 競争優位性（30秒） ============
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 6, "競争優位性", "30秒", "借りている当事者は私で、週1で作り直せるのも私だ");
  card(s, 0.5, 2.1, 4.2, 2.5, TINT);
  s.addText("N1当事者性", { x: 0.75, y: 2.3, w: 3.7, h: 0.5, fontSize: 18, bold: true, color: NAVY, fontFace: FONT, margin: 0 });
  s.addText("私自身が貸与奨学金の利用者。家計基準の読み違え、学校推薦枠の壁、締切前の書類集めのつまずき——要件のどこで学生が脱落するかを体で知っている。", { x: 0.75, y: 2.85, w: 3.7, h: 1.6, fontSize: 12, color: INK, fontFace: FONT, margin: 0 });
  s.addText("×", { x: 4.65, y: 3.0, w: 0.7, h: 0.7, fontSize: 30, bold: true, color: CORAL, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  card(s, 5.3, 2.1, 4.2, 2.5, TINT);
  s.addText("検証速度", { x: 5.55, y: 2.3, w: 3.7, h: 0.5, fontSize: 18, bold: true, color: NAVY, fontFace: FONT, margin: 0 });
  s.addText("エージェント構成での開発により週次リリース。「通知が多すぎる」という友人の声を、その週のうちに締切逆算型に作り直した。このループを6週間回し続けた。", { x: 5.55, y: 2.85, w: 3.7, h: 1.6, fontSize: 12, color: INK, fontFace: FONT, margin: 0 });
  s.addText("検索サイトは既にある。でも「探しに行ける人」しか救えない。届ける側に立つのが本プロダクト。", { x: 0.5, y: 4.85, w: 9.0, h: 0.35, fontSize: 11, italic: true, color: GRAY, fontFace: FONT, margin: 0 });
  s.addNotes("【話す（30秒）】\n「奨学金の検索サイトは既にあります。でも検索サイトは『探しに行ける人』しか救えません。私の強みは2つの掛け算です。私自身が貸与奨学金の利用者で、学生が要件のどこで脱落するかを体で知っていること。そして、エージェント開発で週次リリースできること。『通知が多すぎる』という友人の声を、その週のうちに締切逆算型に作り直しました。このループを6週間回し続けています。」\n\n※競合の名前は出さない。聞かれたら「検索型との構造の違い」で答える。");
}

// ============ 7. 実現可能性（45秒） ============
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 7, "実現可能性", "45秒", "エージェント4体を使い、6週間で作った");
  card(s, 0.5, 1.95, 5.4, 3.15, TINT);
  s.addText("エージェント構成（設計は自分・実装はAI）", { x: 0.75, y: 2.15, w: 4.9, h: 0.4, fontSize: 13, bold: true, color: NAVY, fontFace: FONT, margin: 0 });
  const agents = [["収集", "財団サイト・掲示\nPDFを毎晩巡回"], ["抽出", "PDF→応募要件を\n構造化"], ["突合", "要件×学生プロ\nフィール照合"], ["通知", "締切から逆算し\nリマインド"]];
  agents.forEach((a, i) => {
    const x = 0.72 + i * 1.24;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.75, w: 1.05, h: 0.62, rectRadius: 0.08, fill: { color: NAVY } });
    s.addText(a[0], { x, y: 2.75, w: 1.05, h: 0.62, align: "center", valign: "middle", fontSize: 13, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
    s.addText(a[1], { x: x - 0.06, y: 3.45, w: 1.18, h: 0.75, align: "center", fontSize: 8.5, color: GRAY, fontFace: FONT, margin: 0 });
    if (i < 3) s.addText("→", { x: x + 1.02, y: 2.82, w: 0.26, h: 0.48, fontSize: 13, bold: true, color: CORAL, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  });
  s.addText("抽出精度は毎週、人手のサンプル照合で検証。誤マッチは通知前に止める設計。", { x: 0.75, y: 4.35, w: 4.9, h: 0.6, fontSize: 10.5, color: GRAY, fontFace: FONT, margin: 0 });
  const pstats = [["開発期間", "6週間"], ["イテレーション", "11回"], ["自分で書いたコード比率", "15%（設計・レビューは100%自分）"]];
  pstats.forEach((p, i) => {
    const y = 1.95 + i * 1.08;
    card(s, 6.1, y, 3.4, 0.92, TINT_CORAL);
    s.addText(p[0], { x: 6.3, y: y + 0.1, w: 3.0, h: 0.32, fontSize: 11, bold: true, color: GRAY, fontFace: FONT, margin: 0 });
    s.addText(p[1], { x: 6.3, y: y + 0.42, w: 3.0, h: 0.42, fontSize: i === 2 ? 12 : 19, bold: true, color: CORAL, fontFace: FONT, valign: "middle", margin: 0 });
  });
  s.addNotes("【話す（45秒）】\n「どう作ったか。エージェント4体の構成です。収集が財団サイトと掲示PDFを毎晩巡回し、抽出が要件を構造化、突合がプロフィールと照合して、通知が締切から逆算して届ける。開発期間は6週間、11回作り直しました。コードの85%はAIが書いています。ただし、この構成の設計と、誤マッチを通知前に止める品質ゲートの判断は、すべて私がやりました。AIに書かせることと、何を作るか決めることは別の仕事です。」\n\n※採用担当者に一番刺さるスライド。「設計は自分」を必ず言う。");
}

// ============ 8. 収益性（20秒） ============
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  header(s, 8, "収益性", "20秒", "学生は無料。大学が、学生支援の成果のために払う");
  card(s, 1.4, 2.3, 7.2, 1.7, TINT);
  s.addText([
    { text: "年30万円", options: { color: NAVY, bold: true } },
    { text: "  ×  ", options: { color: CORAL, bold: true } },
    { text: "まず10大学", options: { color: NAVY, bold: true } },
    { text: "  =  ", options: { color: CORAL, bold: true } },
    { text: "年商300万円", options: { color: CORAL, bold: true } },
  ], { x: 1.6, y: 2.55, w: 6.8, h: 0.9, fontSize: 22, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  s.addText("根拠: 経済的理由の休学・中退は大学の収入減に直結。給付型の周知は学生支援課の既存業務で、その成果を可視化して納品する。", { x: 1.6, y: 3.5, w: 6.8, h: 0.4, fontSize: 11.5, color: GRAY, fontFace: FONT, align: "center", margin: 0 });
  s.addNotes("【話す（20秒）】\n「お金の流れです。学生からは取りません。お金がない学生から取るプロダクトではないので。払うのは大学です。経済的理由の休学・中退は大学の収入減に直結し、給付型の周知はもともと学生支援課の業務です。年30万円でまず10大学、年商300万円から始めます。」\n\n※3カ年計画は出さない。聞かれたら「まず10大学での継続率が先」と答える。");
}

// ============ 9. 挑戦は続く（30秒） ============
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  pill(s, 0.6, 0.5, 1.0, "30秒", GOLD, INK);
  s.addText("「お金で諦める」がない世界まで、挑戦を続ける", { x: 0.6, y: 1.0, w: 8.8, h: 0.7, fontSize: 26, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
  const steps9 = [
    ["次の8週間", "千葉工大の学生支援課と実証。掲示PDF構造化の精度を実運用で検証する"],
    ["次の1年", "他大学へ広げる。高校生の「進学前マッチ」——進路を決める前に、もらえるお金を知れる状態へ"],
    ["その先", "新しい「できなかった」を見つけて、また作る"],
  ];
  steps9.forEach((p, i) => {
    const x = 0.6 + i * 3.0;
    card(s, x, 2.0, 2.8, 2.6, NAVY_DK);
    s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: 2.25, w: 0.45, h: 0.45, fill: { color: CORAL } });
    s.addText(String(i + 1), { x: x + 0.25, y: 2.25, w: 0.45, h: 0.45, align: "center", valign: "middle", fontSize: 15, bold: true, color: "FFFFFF", fontFace: FONT, margin: 0 });
    s.addText(p[0], { x: x + 0.85, y: 2.28, w: 1.85, h: 0.42, fontSize: 14, bold: true, color: GOLD, fontFace: FONT, valign: "middle", margin: 0 });
    s.addText(p[1], { x: x + 0.25, y: 2.95, w: 2.35, h: 1.5, fontSize: 11.5, color: "FFFFFF", fontFace: FONT, margin: 0 });
    if (i < 2) s.addText("→", { x: x + 2.72, y: 3.05, w: 0.36, h: 0.5, fontSize: 18, bold: true, color: CORAL, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  });
  s.addText("連絡先: sato.yu@example.ac.jp ／ github.com/sato-yu/moraeru", { x: 0.6, y: 5.0, w: 8.8, h: 0.35, fontSize: 12, color: "C9D2F0", fontFace: FONT, margin: 0 });
  s.addNotes("【話す（30秒）】\n「私が作りたいのは『お金で諦める』がない世界です。次の8週間で、千葉工大の学生支援課と実証を回して、掲示PDF構造化の精度を実運用で検証します。1年で他大学へ、そして高校生が進路を決める前にもらえるお金を知れる状態まで持っていきたい。そしてその先も、新しい『できなかった』を見つけて、また作ります。ありがとうございました。」\n\n※お願い・依頼はしない。連絡先が画面に出ていれば十分。");
}

pres.writeFile({ fileName: "モラエル_ピッチサンプル.pptx" }).then(() => console.log("done"));
