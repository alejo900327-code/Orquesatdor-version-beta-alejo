// Biblioteca de Anuncios de Meta — lista los anuncios en vídeo de la página de resultados abierta.
// Uso: abrir la URL de búsqueda (ver SKILL.md §2a) y pegar este script en javascript_tool.
// Devuelve [id, página, días al aire, nº de versiones, texto] ordenado por días al aire.
const MIN_DIAS = 21, SCROLLS = 6;

const X = () => { const o = [], s = new Set();
  document.querySelectorAll('video').forEach(v => {
    let e = v, c = null;
    for (let i = 0; i < 25 && e; i++) { e = e.parentElement;
      if (e && /Identificador de la biblioteca|Library ID/.test(e.innerText || '') && (e.innerText || '').length < 4000) c = e;
      if (c && e && (e.innerText || '').length > 4000) break; }
    const t = c ? c.innerText : '';
    const id = (t.match(/(?:biblioteca|Library ID):\s*(\d+)/) || [])[1];
    if (!id || s.has(id)) return; s.add(id);
    const L = t.split('\n').map(z => z.trim()).filter(Boolean);
    const p = L.findIndex(l => /^(Publicidad|Sponsored)$/.test(l));
    const f = L.find(l => /\d{4}/.test(l) && /(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic|jan|apr|aug|dec)/i.test(l) && !/Identificador|Library/.test(l)) || '';
    o.push({ id, f, pg: p > 0 ? L[p - 1] : '', tx: (p > 0 ? L.slice(p + 1).join(' ') : '').slice(0, 200) });
  });
  return o; };
const M = { ene:0, jan:0, feb:1, mar:2, abr:3, apr:3, may:4, jun:5, jul:6, ago:7, aug:7, sep:8, oct:9, nov:10, dic:11, dec:11 };
const pd = s => { const m = s.match(/(\d{1,2}) (\w{3})\w* (\d{4})/); return m ? new Date(+m[3], M[m[2].toLowerCase()], +m[1]) : null; };
const D = x => { const ps = x.f.replace(/(En circulación desde el|Started running on) /, '').split(' - ');
  const a = pd(ps[0]), b = ps[1] ? pd(ps[1]) : new Date(); return a && b ? Math.round((b - a) / 864e5) : 0; };

await new Promise(r => setTimeout(r, 3000));
const A = {};
for (let i = 0; i < SCROLLS; i++) { X().forEach(x => A[x.id] = x); scrollTo(0, document.body.scrollHeight); await new Promise(r => setTimeout(r, 2500)); }
X().forEach(x => A[x.id] = x);
const g = {};
Object.values(A).forEach(x => { const k = x.pg + x.tx.slice(0, 40); (g[k] = g[k] || []).push(x); });
Object.values(g).map(l => { l.sort((a, b) => D(b) - D(a)); return [l[0].id, l[0].pg, D(l[0]), l.length, l[0].tx.slice(0, 90)]; })
  .filter(x => x[2] >= MIN_DIAS).sort((a, b) => b[2] - a[2]).slice(0, 25)
