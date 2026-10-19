// Instagram — mide TODOS los reels visibles de una cuenta y descarga los extremos en UN .tar.
// Uso: en Chrome con la sesión del usuario, abrir https://www.instagram.com/<CUENTA>/reels/,
// ajustar la línea de parámetros y pegar el script. Progreso: window.__job. El .tar llega a ~/Downloads.
// TOP/BOTTOM = cuántos vídeos bajar de los más y menos vistos (0 y 0 = solo métricas).
const CUENTA = 'cuenta', TOP = 8, BOTTOM = 4, SALTAR = [], SCROLLS = 25;

const AL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const mid = c => { let n = 0n; for (const ch of c.slice(0, 11)) n = n * 64n + BigInt(AL.indexOf(ch)); return n.toString(); };
const info = async c => {
  const r = await fetch('/api/v1/media/' + mid(c) + '/info/', { credentials: 'include', headers: { 'X-IG-App-ID': '936619743392459' } });
  const j = await r.json().catch(() => null); const it = j && j.items && j.items[0];
  if (!it) return { c, status: r.status };
  const vv = (it.video_versions || []).sort((a, b) => b.width - a.width)[0];
  return { c, cuenta: CUENTA, dur: it.video_duration, w: vv && vv.width, h: vv && vv.height,
    plays: it.play_count || it.ig_play_count, likes: it.like_count, comments: it.comment_count, fecha: it.taken_at,
    caption: (it.caption && it.caption.text) || '', tags: ((it.usertags && it.usertags.in) || []).map(u => u.user.username),
    coau: (it.coauthor_producers || []).map(u => u.username), url: vv && vv.url };
};
const th = (name, size) => { const h = new Uint8Array(512), enc = new TextEncoder();
  const w = (s, o, l) => h.set(enc.encode(s).slice(0, l), o);
  w(name, 0, 100); w('0000644\0', 100, 8); w('0000000\0', 108, 8); w('0000000\0', 116, 8);
  w(size.toString(8).padStart(11, '0') + '\0', 124, 12); w(Math.floor(Date.now() / 1000).toString(8).padStart(11, '0') + '\0', 136, 12);
  w('        ', 148, 8); w('0', 156, 1); w('ustar\0', 257, 6); w('00', 263, 2);
  let s = 0; for (const b of h) s += b; w(s.toString(8).padStart(6, '0') + '\0 ', 148, 8); return h; };
const pad = n => new Uint8Array((512 - n % 512) % 512);

window.__job = { cuenta: CUENTA, status: 'rejilla', reels: 0, medidos: 0, videos: 0 };
(async () => {
  await new Promise(r => setTimeout(r, 2500));
  const codes = new Set();
  for (let i = 0; i < SCROLLS; i++) {
    document.querySelectorAll('a[href*="/reel/"]').forEach(a => { const m = a.getAttribute('href').match(/\/reel\/([^/]+)/); if (m) codes.add(m[1]); });
    scrollBy(0, 3000); await new Promise(r => setTimeout(r, 1400));
  }
  __job.reels = codes.size; __job.status = 'metricas';
  const all = [];
  for (const c of codes) { try { all.push(await info(c)); } catch (e) {} __job.medidos++; await new Promise(r => setTimeout(r, 500)); }
  const ok = all.filter(x => x.url).sort((a, b) => (b.plays || 0) - (a.plays || 0));
  const pick = [...ok.slice(0, TOP), ...(BOTTOM > 0 ? ok.slice(-BOTTOM) : [])].filter(x => !SALTAR.includes(x.c));
  __job.status = 'videos';
  const parts = [];
  for (const x of pick) {
    try { const b = new Uint8Array(await (await fetch(x.url)).arrayBuffer()); parts.push(th(CUENTA + '_' + x.c + '.mp4', b.length), b, pad(b.length)); __job.videos++; } catch (e) {}
  }
  const m = new TextEncoder().encode(JSON.stringify(all.map(({ url, ...r }) => r), null, 1));
  parts.push(th('metadata_' + CUENTA + '.json', m.length), m, pad(m.length), new Uint8Array(1024));
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(parts)); a.download = 'ig_' + CUENTA + '.tar';
  document.body.appendChild(a); a.click(); a.remove(); __job.status = 'descargado';
})();
'iniciado: consulta window.__job'
