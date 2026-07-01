#!/usr/bin/env node
/**
 * build_slides_html — slides.md(Marp互換) から「ブラウザで開くだけ」の自己完結HTMLビューを生成。
 *   使い方: node assets/build_slides_html.mjs [slides.md] [slides.html]
 *   既定  : slides.md -> slides.html
 * 依存なし（Node標準のみ / npm install 不要）。単一ソースは slides.md、これは表示用の派生物。
 * フロントマターの style: ブロック（.tag/.time/.accent/.muted/.hook 等）をそのまま流用し、
 * 生HTML(span/br)とMDテーブル・画像も Marp と同様に描画。ローカル画像は base64 で埋め込むので
 * 図（グラフ）入りでも「単一HTMLファイル1つ」で完全ポータブル（figures/ の同梱不要）。
 * 操作: ← → / Space / クリックで移動、n=発表者ノート、f=全画面、o=一覧、数字ジャンプ。
 */
import fs from 'fs';
import path from 'path';

const SRC = process.argv[2] || 'slides.md';
const OUT = process.argv[3] || 'slides.html';
const BASE = path.dirname(path.resolve(SRC));

let raw;
try { raw = fs.readFileSync(SRC, 'utf8'); }
catch { console.error(`読めません: ${SRC}（slides.md を先に用意してください）`); process.exit(1); }
raw = raw.replace(/^﻿/, '');

// --- フロントマター抽出（style: ブロックを回収） ---
let body = raw, authorCss = '';
if (raw.startsWith('---')) {
  const end = raw.indexOf('\n---', 3);
  if (end !== -1) {
    const fm = raw.slice(3, end);
    body = raw.slice(raw.indexOf('\n', end + 1) + 1);
    const sm = fm.match(/style:\s*\|?\s*\n([\s\S]*?)$/);
    if (sm) authorCss = sm[1].replace(/^\s{0,2}/gm, '');
  }
}
authorCss = authorCss.replace(/\bsection\b/g, '.slide');

// ローカル画像を data URI に（figures同梱不要の単一HTML化）
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
let missing = 0;
function dataUri(src) {
  if (/^(https?:|data:)/.test(src)) return src;
  const p = path.resolve(BASE, src);
  try {
    const b = fs.readFileSync(p);
    const ext = path.extname(p).toLowerCase();
    return `data:${MIME[ext] || 'application/octet-stream'};base64,${b.toString('base64')}`;
  } catch { missing++; console.error(`  画像が見つかりません（参照のまま残します）: ${src}`); return src; }
}
const inlineImages = (html) => html.replace(/(<img[^>]*\ssrc=")([^"]+)(")/g, (_, a, src, c) => a + dataUri(src) + c);

// content(trusted) はHTMLを透過。![alt](src) → <img>、**bold**、`code`。
function inl(s) {
  // Marp画像記法 ![w:600 alt](src) / ![](src)
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    let style = '';
    alt = alt.replace(/\b([wh]):(\d+)(px)?/g, (_, d, v) => { style += (d === 'w' ? 'width' : 'height') + `:${v}px;`; return ''; }).replace(/\bcenter\b/g, '').trim();
    return `<img src="${src.trim()}" alt="${alt}"${style ? ` style="${style}"` : ''}>`;
  });
  return s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
}
const isRow = (l) => /^\|.*\|\s*$/.test(l);
const isSep = (l) => /^\|[\s:|-]+\|\s*$/.test(l);
const cells = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => inl(c.trim()));

function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let inList = false;
  const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/\s+$/, '');
    if (!line.trim()) { closeList(); continue; }
    if (isRow(line)) {
      closeList();
      const block = [];
      while (i < lines.length && isRow(lines[i])) block.push(lines[i++]);
      i--;
      const sepAt = block.findIndex(isSep);
      const head = sepAt > 0 ? block.slice(0, sepAt) : [];
      const bodyRows = block.filter((l, idx) => !isSep(l) && !(sepAt > 0 && idx < sepAt));
      out.push('<table>');
      if (head.length) out.push('<thead>' + head.map((r) => '<tr>' + cells(r).map((c) => `<th>${c}</th>`).join('') + '</tr>').join('') + '</thead>');
      out.push('<tbody>' + bodyRows.map((r) => '<tr>' + cells(r).map((c) => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody>');
      out.push('</table>');
      continue;
    }
    let m;
    if ((m = line.match(/^###\s+(.*)/))) { closeList(); out.push(`<h3>${inl(m[1])}</h3>`); }
    else if ((m = line.match(/^##\s+(.*)/))) { closeList(); out.push(`<h2>${inl(m[1])}</h2>`); }
    else if ((m = line.match(/^#\s+(.*)/))) { closeList(); out.push(`<h1>${inl(m[1])}</h1>`); }
    else if ((m = line.match(/^>\s?(.*)/))) { closeList(); out.push(`<blockquote>${inl(m[1])}</blockquote>`); }
    else if ((m = line.match(/^[-*]\s+(.*)/))) { if (!inList) { out.push('<ul>'); inList = true; } out.push(`<li>${inl(m[1])}</li>`); }
    else { closeList(); out.push(`<p>${inl(line)}</p>`); }
  }
  closeList();
  return out.join('\n');
}

const slides = body.split(/\n---\s*\n/).map((chunk) => {
  const dark = /<!--\s*_class:\s*dark\s*-->/.test(chunk);
  const notes = [];
  const cleaned = chunk.replace(/<!--([\s\S]*?)-->/g, (_, c) => {
    if (/_class|_backgroundColor|_color|_paginate|_header|_footer/.test(c)) return '';
    notes.push(c.trim()); return '';
  });
  return { html: inlineImages(mdToHtml(cleaned).trim()), note: notes.join('\n\n'), dark };
}).filter((s) => s.html);

const data = JSON.stringify(slides);

const page = `<!DOCTYPE html>
<html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>5分プレゼン スライド</title>
<style>
  *{margin:0;box-sizing:border-box}
  html,body{height:100%}
  body{font-family:"Yu Gothic","Hiragino Sans",sans-serif;background:#0b0d1a;overflow:hidden}
  #stage{position:fixed;inset:0;display:grid;place-items:center;padding:3vmin}
  .slide{display:none;width:min(1180px,95vw);aspect-ratio:16/9;background:#fff;color:#1E2430;
    border-radius:16px;box-shadow:0 24px 80px rgba(0,0,0,.5);padding:5.5vmin 6vmin;overflow:auto;
    position:relative;font-size:clamp(16px,2.15vw,26px);line-height:1.55}
  .slide.on{display:block}
  .slide::before{content:"";position:absolute;left:0;top:0;bottom:0;width:8px;background:linear-gradient(#F96167,#F9E795);border-radius:16px 0 0 16px}
  .slide h1{font-size:1.7em;font-weight:800;letter-spacing:-.01em;line-height:1.18;margin:.1em 0 .5em}
  .slide h2{font-size:1.25em;font-weight:800;line-height:1.25;margin:.3em 0 .4em}
  .slide h3{font-size:1.05em;font-weight:700;margin:.5em 0 .25em}
  .slide p{margin:.35em 0}
  .slide ul{margin:.35em 0 .35em 1.1em}
  .slide li{margin:.15em 0}
  .slide strong{color:#F96167}
  .slide code{background:rgba(0,0,0,.06);padding:.1em .4em;border-radius:6px;font-size:.9em}
  .slide img{max-width:100%;max-height:58vh;display:block;margin:.4em auto;object-fit:contain}
  .slide table{border-collapse:collapse;width:100%;margin:.5em 0;font-size:.92em}
  .slide th,.slide td{border:1px solid #dfe1ea;padding:.4em .7em;text-align:left;vertical-align:top}
  .slide thead th{background:#2F3C7E;color:#fff;text-align:center;font-size:1.15em}
  .slide blockquote{border-left:4px solid #F9E795;padding-left:.8em;margin:.5em 0;color:#555}
  ${authorCss}
  #hud{position:fixed;left:0;right:0;bottom:12px;display:flex;justify-content:center;gap:16px;color:#aab;font-size:12px;letter-spacing:.05em;pointer-events:none}
  #hud b{color:#fff}
  .nav{position:fixed;top:0;bottom:0;width:20%;cursor:pointer} #prev{left:0} #next{right:0}
  #notes{position:fixed;left:0;right:0;bottom:0;max-height:40vh;overflow:auto;background:rgba(10,12,26,.97);color:#eef;border-top:2px solid #F9E795;padding:16px 22px;font-size:15px;line-height:1.7;transform:translateY(100%);transition:transform .25s;white-space:pre-wrap}
  #notes.on{transform:none} #notes h4{color:#F9E795;font-size:12px;letter-spacing:.1em;margin-bottom:6px}
  #ov{position:fixed;inset:0;background:#0b0d1a;display:none;grid-template-columns:repeat(3,1fr);gap:12px;padding:16px;overflow:auto}
  #ov.on{display:grid}
  #ov .thumb{background:#fff;border-radius:8px;padding:12px;font-size:9px;cursor:pointer;aspect-ratio:16/9;overflow:hidden;position:relative}
  #help{position:fixed;top:10px;right:14px;color:#889;font-size:11px;pointer-events:none}
</style></head><body>
<div id="stage"></div>
<div class="nav" id="prev"></div><div class="nav" id="next"></div>
<div id="ov"></div>
<div id="notes"><h4>発表者ノート</h4><div id="notebody"></div></div>
<div id="hud"><span><b id="cur">1</b> / <span id="tot">1</span></span><span>← →:移動　n:ノート　f:全画面　o:一覧</span></div>
<div id="help">n:ノート ・ f:全画面 ・ o:一覧</div>
<script>
const SLIDES=${data};
const stage=document.getElementById('stage');
SLIDES.forEach((s,i)=>{const d=document.createElement('div');d.className='slide'+(s.dark?' dark':'');d.innerHTML=s.html;stage.appendChild(d);});
const slides=[...document.querySelectorAll('#stage .slide')];
document.getElementById('tot').textContent=SLIDES.length;
let cur=0;
function show(n){cur=Math.max(0,Math.min(SLIDES.length-1,n));slides.forEach((el,i)=>el.classList.toggle('on',i===cur));
  document.getElementById('cur').textContent=cur+1;
  document.getElementById('notebody').textContent=SLIDES[cur].note||'（ノートなし）';}
document.getElementById('next').onclick=()=>show(cur+1);
document.getElementById('prev').onclick=()=>show(cur-1);
const ov=document.getElementById('ov');
SLIDES.forEach((s,i)=>{const t=document.createElement('div');t.className='slide thumb'+(s.dark?' dark':'');t.innerHTML=s.html;t.onclick=()=>{ov.classList.remove('on');show(i);};ov.appendChild(t);});
addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){show(cur+1);e.preventDefault();}
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){show(cur-1);}
  else if(e.key==='n'){document.getElementById('notes').classList.toggle('on');}
  else if(e.key==='o'){ov.classList.toggle('on');}
  else if(e.key==='f'){if(!document.fullscreenElement)document.documentElement.requestFullscreen();else document.exitFullscreen();}
  else if(/^[1-9]$/.test(e.key)){show(parseInt(e.key,10)-1);}
});
show(0);
</script></body></html>`;

fs.writeFileSync(OUT, page);
console.log(`wrote: ${OUT}（${slides.length}枚${missing ? ` / 画像未検出 ${missing}件` : ''}）— ブラウザで開いてください`);
