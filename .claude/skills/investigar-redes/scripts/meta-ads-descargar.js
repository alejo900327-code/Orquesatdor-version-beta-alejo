// Biblioteca de Anuncios de Meta — descarga los vídeos de los anuncios indicados en UN .tar.
// Uso: en la página de resultados donde aparecen esos anuncios (misma búsqueda que en meta-ads-listar),
// cambia IDS y NOMBRE y pega el script. Progreso: window.__job. El .tar llega a ~/Downloads.
const IDS = ["1234567890"], NOMBRE = 'ads_nicho';

const th = (name, size) => { const h = new Uint8Array(512), enc = new TextEncoder();
  const w = (s, o, l) => h.set(enc.encode(s).slice(0, l), o);
  w(name, 0, 100); w('0000644\0', 100, 8); w('0000000\0', 108, 8); w('0000000\0', 116, 8);
  w(size.toString(8).padStart(11, '0') + '\0', 124, 12); w(Math.floor(Date.now() / 1000).toString(8).padStart(11, '0') + '\0', 136, 12);
  w('        ', 148, 8); w('0', 156, 1); w('ustar\0', 257, 6); w('00', 263, 2);
  let s = 0; for (const b of h) s += b; w(s.toString(8).padStart(6, '0') + '\0 ', 148, 8); return h; };
const pad = n => new Uint8Array((512 - n % 512) % 512);

window.__job = { status: 'buscando', found: {}, done: 0 };
(async () => {
  const want = new Set(IDS);
  const X = () => document.querySelectorAll('video').forEach(v => {
    let e = v, c = null;
    for (let i = 0; i < 25 && e; i++) { e = e.parentElement;
      if (e && /Identificador de la biblioteca|Library ID/.test(e.innerText || '') && (e.innerText || '').length < 4000) c = e;
      if (c && e && (e.innerText || '').length > 4000) break; }
    const t = c ? c.innerText : '';
    const id = (t.match(/(?:biblioteca|Library ID):\s*(\d+)/) || [])[1];
    if (id && want.has(id) && !__job.found[id]) __job.found[id] = { src: v.currentSrc || v.src, txt: t.slice(0, 600) };
  });
  for (let i = 0; i < 10 && Object.keys(__job.found).length < want.size; i++) { X(); scrollTo(0, document.body.scrollHeight); await new Promise(r => setTimeout(r, 2500)); }
  X();
  __job.status = 'descargando';
  const parts = [], meta = [];
  for (const [id, f] of Object.entries(__job.found)) {
    try { const b = new Uint8Array(await (await fetch(f.src)).arrayBuffer());
      parts.push(th('ad_' + id + '.mp4', b.length), b, pad(b.length)); meta.push({ id, mb: +(b.length / 1e6).toFixed(1), texto: f.txt }); __job.done++; }
    catch (e) { meta.push({ id, err: String(e) }); }
  }
  meta.push({ no_encontrados: IDS.filter(i => !__job.found[i]) });
  const m = new TextEncoder().encode(JSON.stringify(meta, null, 1));
  parts.push(th('metadata_' + NOMBRE + '.json', m.length), m, pad(m.length), new Uint8Array(1024));
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(parts)); a.download = 'meta_' + NOMBRE + '.tar';
  document.body.appendChild(a); a.click(); a.remove(); __job.status = 'descargado';
})();
'iniciado: consulta window.__job'
